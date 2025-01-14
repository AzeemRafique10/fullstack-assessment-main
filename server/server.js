const express = require("express");
const cors = require("cors");
const data = require("./time.json"); // Import the JSON file

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to serve companies' data
app.get("/api/companies", (req, res) => {
  if (data.items && Array.isArray(data.items)) {
    res.json(data.items); // Return the `items` array
  } else {
    res.status(500).json({ error: "Invalid data format" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
