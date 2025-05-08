import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import foodRoutes from "./routes/foods";
import entityRoutes from "./routes/entity";
import tableRoutes from "./routes/diningTable";
import ordersRouter from "./routes/orders";
import statusRouter from "./routes/status";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.BASE_URL;

app.use(cors());
app.use(express.json());

app.use("/api", entityRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", foodRoutes);
app.use("/api", tableRoutes);
app.use("/api", ordersRouter);
app.use("/api", statusRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${URL}:${PORT}`);
});
