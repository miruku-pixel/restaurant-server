import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Order of deletion matters due to foreign key constraints
  await prisma.orderItemOption.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.diningTable.deleteMany();
  await prisma.foodOption.deleteMany();
  await prisma.food.deleteMany();
  await prisma.user.deleteMany();
  await prisma.entity.deleteMany();
}

main()
  .then(() => {
    console.log("All records deleted.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
