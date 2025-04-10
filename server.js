const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();


const PORT = process.env.PORT || 5000;
const VERSION = process.env.VERSION || "/api/v1";

app.use(cors());
app.use(express.json());

const authRoutes = require("./config/routes");
app.use(VERSION, authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API base path: ${VERSION}`)
});
