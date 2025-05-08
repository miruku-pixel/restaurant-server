import { Role } from "@prisma/client";

export const sampleUsers = [
  {
    userid: "E00001",
    username: "waiter1",
    password: "password123", // will be hashed in seed.ts
    role: Role.WAITER,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    userid: "E00002",
    username: "chef1",
    password: "password123",
    role: Role.CHEF,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    userid: "E00003",
    username: "cashier1",
    password: "password123",
    role: Role.CASHIER,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    userid: "E00004",
    username: "waiter2",
    password: "password123", // will be hashed in seed.ts
    role: Role.WAITER,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    userid: "E00005",
    username: "chef2",
    password: "password123",
    role: Role.CHEF,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    userid: "E00006",
    username: "cashier2",
    password: "password123",
    role: Role.CASHIER,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
];

export const sampleFoods = [
  {
    name: "Fried Chicken",
    price: 25000,
    available: true,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
    createdAt: new Date(),
  },
  {
    name: "Nasi Goreng",
    price: 15000,
    available: true,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
    createdAt: new Date(),
  },
  {
    name: "Mie Goreng",
    price: 15000,
    available: true,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
    createdAt: new Date(),
  },
  {
    name: "Tahu Tempe",
    price: 10000,
    available: true,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
    createdAt: new Date(),
  },
  {
    name: "Fried Chicken",
    price: 25000,
    available: true,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
    createdAt: new Date(),
  },
  {
    name: "Nasi Goreng",
    price: 15000,
    available: true,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
    createdAt: new Date(),
  },
];

export const sampleFoodOptions = [
  {
    name: "Paha",
    available: true,
    foodId: "362734af-0d44-464b-8c40-8d3cabda3d28",
    extraPrice: 0,
  },
  {
    name: "Dada",
    available: true,
    foodId: "362734af-0d44-464b-8c40-8d3cabda3d28",
    extraPrice: 0,
  },
  {
    name: "Sayap",
    available: true,
    foodId: "362734af-0d44-464b-8c40-8d3cabda3d28",
    extraPrice: 0,
  },
  {
    name: "Extra Tahu",
    available: true,
    foodId: "471ebcb5-7e3f-4cc9-8b05-7186edb81b07",
    extraPrice: 3000,
  },
  {
    name: "Extra Tempe",
    available: true,
    foodId: "471ebcb5-7e3f-4cc9-8b05-7186edb81b07",
    extraPrice: 2000,
  },
];

export const sampleTables = [
  {
    number: 1,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 2,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 3,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 4,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 5,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 6,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 7,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 8,
    entityId: "007c0a5b-d6ec-4896-ad7c-a4f991c9c70f",
  },
  {
    number: 1,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 2,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 3,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 4,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 5,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 6,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 7,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
  {
    number: 8,
    entityId: "2ab99066-e6c9-4503-b926-4d467789816e",
  },
];
