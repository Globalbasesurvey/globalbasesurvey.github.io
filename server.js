const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Handle form submission
app.post("/submit", upload.single("file"), (req, res) => {
  const id = req.body.id;

  if (id) {
    console.log("ID received:", id);

    // Save ID to a text file
    fs.appendFileSync("data.txt", `ID: ${id}\n`, "utf8");
  }

  if (req.file) {
    console.log("File received:", req.file);

    // Also log file name into data.txt
    fs.appendFileSync("data.txt", `File: ${req.file.filename}\n`, "utf8");
  }

  res.send("✅ Submission received! Thank you.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
