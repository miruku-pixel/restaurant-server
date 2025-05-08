import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET /api/entities
router.get("/entities", async (req, res) => {
  try {
    const entities = await prisma.entity.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.json(entities);
  } catch (error) {
    console.error("Error fetching entities:", error);
    res.status(500).json({ error: "Failed to fetch entities" });
  }
});

export default router;
