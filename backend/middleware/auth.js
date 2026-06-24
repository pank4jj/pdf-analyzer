
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not logged in. No token provided." });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
