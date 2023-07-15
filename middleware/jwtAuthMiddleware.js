import jwt from "jsonwebtoken";

export const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    var token = "";
    if (
      typeof req.headers["token"] !== "undefined" &&
      req.headers["token"] !== null &&
      req.headers["token"] != ""
    ) {
      token = req.headers["token"];
    } else if (authHeader) {
      token = authHeader.split(" ")[1];//check Bearer header.payload.signature
    }
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          res.status(403).json({ message: "Invalid token", token: token });
        }
        req.user = user; // Attach the decoded user object to the request
        next();
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error, msg: "Inernal Server Error" });
  }
};
