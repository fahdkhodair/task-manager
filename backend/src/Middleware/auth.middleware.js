import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};

export default authMiddleware;