import express from "express";
import prisma from "../lib/prisma";
import { Food } from "@prisma/client";
import { authenticateToken } from "../middleware/authMiddleware"; // 👈 Import your auth middleware

const router = express.Router();

// GET /api/foods (protected)
router.get("/foods", authenticateToken, async (req, res) => {
  try {
    // Extract entityId from query parameters
    const { entityId } = req.query;

    // If entityId is not provided, return an error response
    if (!entityId) {
      return res.status(400).json({ error: "Entity ID is required" });
    }

    const foods: Food[] = await prisma.food.findMany({
      where: { available: true, entityId: entityId as string },
      orderBy: { createdAt: "asc" },
      include: {
        options: true, // Include the related FoodOptions for each food item
      },
    });

    res.json(foods);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

export default router;
