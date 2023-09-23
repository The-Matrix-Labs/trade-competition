const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://arupadhyay25:0t4ud6LnLifB10TY@cluster0.e4rd7li.mongodb.net/aman?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a MongoDB model for the "positions" collection
const Position = mongoose.model("Position", {
  chain: Number,
  profit: String,
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Define a route for handling GET requests
app.get("/positions", async (req, res) => {
  try {
    const { chain, limit } = req.query;

    // Use the "chain" parameter to filter data
    const filter = chain ? { chain } : {};

    // Fetch data from the "positions" collection
    const positions = await Position.find(filter)
      .limit(parseInt(limit) || 10)
      .sort({ profit: -1 });

    res.json(positions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
