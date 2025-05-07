import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import SDRoute from "./routes/routes_index.js";
import SCRoute from "./routes/routes_index.js";
import cors from 'cors';

const app = express();
const PORT = 8989;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("C:/ProgramData/MySQL/MySQL Server 8.0/Uploads"));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Users API....");
});

app.use('/api', SDRoute, SCRoute);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on: http://localhost:${PORT}`);
});
