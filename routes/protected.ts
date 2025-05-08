/// <reference path="../types/express.d.ts" />
import express, { Request, Response } from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const getProtectedData = (req: Request, res: Response) => {
  if (req.user) {
    res.json({ message: "Access granted", user: req.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const router = express.Router();

router.get("/protected", authenticateToken, getProtectedData);

export default router;
