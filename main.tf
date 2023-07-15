# 1 - Add Terraform AWS provider.
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.45.0"
    }
  }
}

# 2 - provide the AWS configuration credentials to allow Terraform to connect to AWS
provider "aws" {
  region  = "us-east-1" #The region where the environment 
  #is going to be deployed # Use your own region here
  AKIA2OPTEDEYD3XO6Q7W%CHDjqNYOPPzk4GT+Pr21oBS2KwoJKF1qaE7M4UmE
  access_key = "" # Enter AWS IAM 
  secret_key = "" # Enter AWS IAM 
}

# 3 - create an ECR - elastic container registry using Terraform as follows
resource "aws_ecr_repository" "app_ecr_repo" {
  name = "app-repo"
}
# 4  Run CMD - terraform init
# 5  Run CMD - terraform plan
# 6  Run CMD - terraform apply
# 7  Run CMD - aws ecr get-login-password --region REGION | docker login \ --username AWS --password-stdin ID.dkr.ecr.REGION.amazonaws.com
# 7  Run CMD - docker build -t app-repo .
# 8  Run CMD - docker tag app-repo:latest ID.dkr.REGION.amazonaws.com/app-repo:latest
# 9  Run CMD - docker push ID.dkr.REGION.amazonaws.com/app-repo:latest

# 10 - Creating an ECS Cluster  EC2 and Fargate. 
#Port mappings
#Application image
#CPU and RAM resources
#Container launch types such as EC2 or Fargate
resource "aws_ecs_cluster" "my_cluster" {
  name = "app-cluster" # Name your cluster here
}
# 11 Run CMD - terraform apply

# 12 - Configuring AWS ECS Task Definitions
resource "aws_ecs_task_definition" "app_task" {
  family                   = "app-first-task" # Name your task
  container_definitions    = <<DEFINITION
  [
    {
      "name": "app-first-task",
      "image": "${aws_ecr_repository.app_ecr_repo.repository_url}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = ["FARGATE"] # use Fargate as the launch type
  network_mode             = "awsvpc"    # add the AWS VPN network mode as this is required for Fargate
  memory                   = 512         # Specify the memory the container requires
  cpu                      = 256         # Specify the CPU the container requires
  execution_role_arn       = "${aws_iam_role.ecsTaskExecutionRole.arn}"
}

# 13 - create a resource to execute this role as follows:
resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = "${aws_iam_role.ecsTaskExecutionRole.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
# 14 Run CMD - terraform apply

# 15 - create a Virtual Private Cloud Module (VPC) and subnet to launch your cluster into. VPC and subnet allow you to connect to the internet, communicate with ECS, and expose the application to available zones.
# Provide a reference to your default VPC
resource "aws_default_vpc" "default_vpc" {
}

# Provide references to your default subnets
resource "aws_default_subnet" "default_subnet_a" {
  # Use your own region here but reference to subnet 1a
  availability_zone = "us-east-1a"
}

resource "aws_default_subnet" "default_subnet_b" {
  # Use your own region here but reference to subnet 1b
  availability_zone = "us-east-1b"
}
# Run CMD - terraform apply

# 16 - Implement a Load Balancer , create a security group that will route the HTTP traffic using a load balancer. Go ahead and implement a load balancer as follows:
resource "aws_alb" "application_load_balancer" {
  name               = "load-balancer-dev" #load balancer name
  load_balancer_type = "application"
  subnets = [ # Referencing the default subnets
    "${aws_default_subnet.default_subnet_a.id}",
    "${aws_default_subnet.default_subnet_b.id}"
  ]
  # security group
  security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
}
# Run CMD - terraform apply

# 17 - allowing HTTP traffic to access the ECS cluster is to create a security group. This will be crucial for accessing the application later in this guide
# Create a security group for the load balancer:
resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic in from all sources
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
# Run CMD - terraform apply

# 18 - Configure the load balancer with the VPC networking we created earlier. This will distribute the balancer traffic to the available zone:
resource "aws_lb_target_group" "target_group" {
  name        = "target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = "${aws_default_vpc.default_vpc.id}" # default VPC
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = "${aws_alb.application_load_balancer.arn}" #  load balancer
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.target_group.arn}" # target group
  }
}
# Run CMD - terraform apply

# 19 - last step is to create an ECS Service and its details to maintain task definition in an Amazon ECS cluster. The service will run the cluster, task, and Fargate behind the created load balancer to distribute traffic across the containers that are associated with the service
resource "aws_ecs_service" "app_service" {
  name            = "app-first-service"     # Name the service
  cluster         = "${aws_ecs_cluster.my_cluster.id}"   # Reference the created Cluster
  task_definition = "${aws_ecs_task_definition.app_task.arn}" # Reference the task that the service will spin up
  launch_type     = "FARGATE"
  desired_count   = 3 # Set up the number of containers to 3

  load_balancer {
    target_group_arn = "${aws_lb_target_group.target_group.arn}" # Reference the target group
    container_name   = "${aws_ecs_task_definition.app_task.family}"
    container_port   = 5000 # Specify the container port
  }

  network_configuration {
    subnets          = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}"]
    assign_public_ip = true     # Provide the containers with public IPs
    security_groups  = ["${aws_security_group.service_security_group.id}"] # Set up the security group
  }
}
# Run CMD - terraform apply

# 20 - To access the ECS service over HTTP while ensuring the VPC is more secure, create security groups that will only allow the traffic from the created load balancer. To do so, create a aws_security_group.service_security_group resource
resource "aws_security_group" "service_security_group" {
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Only allowing traffic in from the load balancer security group
    security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
# Run CMD - terraform apply

# 21 - Additionally, add an output config that will extract the load balancer URL value from the state file and log it onto the terminal
#Log the load balancer app URL
output "app_url" {
  value = aws_alb.application_load_balancer.dns_name
}
# Run CMD - terraform apply

#To destroy this dev infrastructure and avoid AWS additional costs, run the following command:
# Run CMD - terraform destroy
