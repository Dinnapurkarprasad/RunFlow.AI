import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
