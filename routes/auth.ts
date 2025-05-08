import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router: Router = express.Router(); // Use express.Router()
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/login", async (req: Request, res: Response) => {
  // Explicitly type req and res
  const { username, password, entityId } = req.body;

  if (!entityId) {
    return res.status(400).json({ error: "Entity is required" });
  }

  // Find user with username and matching entityId
  const user = await prisma.user.findFirst({
    where: {
      username,
      entityId,
    },
    include: {
      entity: true,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json({ error: "Invalid username, password, or entity" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      entityId: user.entityId,
      entity: user.entity?.name || null,
    },
  });
});

export default router; // Export the router
