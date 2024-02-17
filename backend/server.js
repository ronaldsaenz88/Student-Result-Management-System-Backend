const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json()); // Body parser

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));


// Define routes here...

// This route serves the React app
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "../build", "index.html")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
