const express = require("express");
const cors = require("cors");

const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:8081" // Adjust as necessary for your client-side application
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Import and configure Sequelize
const db = require("./app/models");

// Sync database without dropping tables
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.error("Failed to sync db: " + err.message);
  });

// Uncomment the following block to drop and re-sync the database (use only in development)
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.error("Failed to drop and re-sync db: " + err.message);
  });

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Import and use routes
require("./app/routes/turorial.routes")(app);

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
