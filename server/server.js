const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
  })
);

// Load data from the data.json file
const companiesData = require("./data.json");

// Endpoint to get all companies
app.get("/companies", (req, res) => {
  res.json(companiesData);
});

// Endpoint to get a single company by UUID
app.get("/companies/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  const company = companiesData.find((c) => c.uuid === uuid);

  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Endpoint to filter companies by industry
app.get("/companies/industry/:industryId", (req, res) => {
  const industryId = req.params.industryId;
  const filteredCompanies = companiesData.filter((c) =>
    c.industries.some((i) => i.id === parseInt(industryId))
  );

  res.json(filteredCompanies);
});

// Endpoint to filter companies by income stream
app.get("/companies/income/:streamId", (req, res) => {
  const streamId = req.params.streamId;
  const filteredCompanies = companiesData.filter((c) =>
    c.income_streams.some((s) => s.id === parseInt(streamId))
  );

  res.json(filteredCompanies);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
