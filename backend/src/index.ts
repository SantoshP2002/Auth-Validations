import express from "express";
import connectDB from "./config/db";
import router from "./routes/userRoutes";
import cors from "cors"

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;

connectDB(); // connect DB

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
