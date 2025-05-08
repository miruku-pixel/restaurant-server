import express from "express";
import prisma from "../lib/prisma";
import { DiningTable } from "@prisma/client";
import { authenticateToken } from "../middleware/authMiddleware"; // 👈 Import your auth middleware

const router = express.Router();

// GET /api/foods (protected)
router.get("/tables", authenticateToken, async (req, res) => {
  try {
    // Extract entityId from query parameters
    const { entityId } = req.query;

    // If entityId is not provided, return an error response
    if (!entityId) {
      return res.status(400).json({ error: "Entity ID is required" });
    }

    const tables: DiningTable[] = await prisma.diningTable.findMany({
      where: { entityId: entityId as string },
      orderBy: { createdAt: "asc" },
    });

    res.json(tables);
  } catch (error) {
    console.error("Error fetching table list:", error);
    res.status(500).json({ error: "Failed to fetch table list" });
  }
});

export default router;
