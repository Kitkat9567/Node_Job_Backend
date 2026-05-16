const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const compRouter = require("./routes/compRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      // "http://localhost:5173", // local Vite dev
      "https://career-sync-gules.vercel.app/", // your Vercel URL
    ],
    credentials: true, // if you're using cookies / auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.use("/", jobRoutes);
app.use("/user", userRoutes);
app.use("/comp", compRouter);
app.use("/login", authRoutes);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
