import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  sampleUsers,
  sampleFoods,
  sampleFoodOptions,
  sampleTables,
} from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  for (const user of sampleUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        userId: user.userid,
        username: user.username,
        password: hashedPassword,
        role: user.role,
        entityId: user.entityId,
        createdAt: new Date(),
      },
    });
  }

  // Seed foods
  for (const food of sampleFoods) {
    await prisma.food.upsert({
      where: {
        name_entityId: {
          // Use the compound unique key of name and entityId
          name: food.name,
          entityId: food.entityId,
        },
      },
      update: {
        price: food.price,
        available: food.available || true, // Default to true if unavailable is not provided
        entityId: food.entityId,
        createdAt: new Date(),
      },
      create: {
        name: food.name,
        price: food.price,
        available: food.available || true, // Default to true if unavailable is not provided
        entityId: food.entityId,
        createdAt: new Date(),
      },
    });
  }

  for (const foodOption of sampleFoodOptions) {
    await prisma.foodOption.upsert({
      where: {
        name_foodId: {
          // Use the compound unique key of name and foodId
          name: foodOption.name,
          foodId: foodOption.foodId,
        },
      },
      update: {
        available: foodOption.available || true, // D
        foodId: foodOption.foodId,
        extraPrice: foodOption.extraPrice,
      },
      create: {
        name: foodOption.name,
        available: foodOption.available || true, // D
        foodId: foodOption.foodId,
        extraPrice: foodOption.extraPrice,
      },
    });
  }

  for (const diningTable of sampleTables) {
    await prisma.diningTable.upsert({
      where: {
        number_entityId: {
          // Use the compound unique key of name and foodId
          number: diningTable.number,
          entityId: diningTable.entityId,
        },
      },
      update: {},
      create: {
        number: diningTable.number,
        entityId: diningTable.entityId,
        createdAt: new Date(),
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
