import express, { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express with Prisma!")
});

// Example protected route
router.get("/protected", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.json({ message: "This is a protected route!", decoded });
  });
});


export default router
