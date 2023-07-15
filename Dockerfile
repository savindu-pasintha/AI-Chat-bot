# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables if needed
# ENV PORT=3000

# Expose the port on which your Node.js application is listening
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "start"]
