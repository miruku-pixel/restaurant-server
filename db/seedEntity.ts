// prisma/seed.ts or db/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleEntities = [
  {
    name: "Poddo-Bengkong",
    location: "Batam-Bengkong",
    createdAt: new Date(),
  },
  {
    name: "Podomoro-Manado",
    location: "Manado",
    createdAt: new Date(),
  },
];

async function main() {
  for (const entity of sampleEntities) {
    await prisma.entity.upsert({
      where: { name: entity.name },
      update: {},
      create: entity,
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seed complete");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
