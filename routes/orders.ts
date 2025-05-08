import express from "express";
import { PrismaClient, OrderStatus } from "@prisma/client";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const {
      diningTableId,
      waiterId,
      entityId,
      remark,
      items, // Expecting array of { foodId, quantity, options: [{ optionId, quantity }] }
    } = req.body;

    if (!diningTableId || !waiterId || !entityId || !Array.isArray(items)) {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }

    // Step 1: Enrich items with pricing from DB
    const enrichedItems = [];

    for (const item of items) {
      const food = await prisma.food.findUnique({
        where: { id: item.foodId },
        select: { price: true },
      });

      if (!food)
        return res
          .status(400)
          .json({ error: `Invalid foodId: ${item.foodId}` });

      const itemUnitPrice = food.price;
      let itemOptionsTotal = 0;

      const enrichedOptions = [];

      for (const opt of item.options || []) {
        const option = await prisma.foodOption.findUnique({
          where: { id: opt.optionId },
          select: { extraPrice: true },
        });

        if (!option)
          return res
            .status(400)
            .json({ error: `Invalid optionId: ${opt.optionId}` });

        const optTotal = option.extraPrice * opt.quantity;
        itemOptionsTotal += optTotal;

        enrichedOptions.push({
          optionId: opt.optionId,
          quantity: opt.quantity,
          unitPrice: option.extraPrice,
          totalPrice: optTotal,
        });
      }

      const itemTotal = itemUnitPrice * item.quantity + itemOptionsTotal;

      enrichedItems.push({
        foodId: item.foodId,
        quantity: item.quantity,
        unitPrice: itemUnitPrice,
        totalPrice: itemTotal,
        options: {
          create: enrichedOptions,
        },
      });
    }

    // Step 2: Calculate order subtotal and total
    const subtotal = enrichedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    const total = subtotal; // In future, add tax/discount here

    // Step 3: Create order with all values
    const order = await prisma.order.create({
      data: {
        diningTableId,
        waiterId,
        entityId,
        remark,
        status: OrderStatus.PENDING,
        subtotal,
        total,
        items: {
          create: enrichedItems,
        },
      },
      include: {
        items: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
