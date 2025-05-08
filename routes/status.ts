import express from "express";
import prisma from "../lib/prisma";
import { Order } from "@prisma/client";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/status", authenticateToken, async (req, res) => {
  try {
    const { entityId } = req.query;

    // If entityId is not provided, return an error response
    if (!entityId) {
      return res.status(400).json({ error: "Entity ID is required" });
    }
    const orders: Order[] = await prisma.order.findMany({
      where: {
        entityId: entityId as string,
        status: {
          in: ["PENDING", "PREPARED", "SERVED"], // adjust if needed
        },
      },
      include: {
        diningTable: true,
        waiter: true,
        items: {
          include: {
            food: true,
            options: {
              // Modify this include
              include: {
                option: true, // Include the FoodOption relation
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
