const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Book Management Backend is Running Successfully!");
});

// Book Routes
app.use("/api/books", bookRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
