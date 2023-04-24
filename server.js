// Bringing in dependencies I need.
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Assigning global variables.
const app = express();
let db = JSON.parse(fs.readFileSync("db/db.json"));
const PORT = process.env.PORT || 3000;

// App use to create routes for files in public and create and handle data for post requests.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to the index.html page.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route to the notes.html page.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Route for getting all notes.
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Function to add new Note to the JSON file.
app.post("/api/notes", (req, res) => {
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  db.push(userNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db));
  res.json(db);
});

// Function to delete a Note from the JSON file.
app.delete("/api/notes/:id", (req, res) => {
  let deleteNote = db.filter((note) => note.id !== req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNote));
  res.send(deleteNote);
});

// Server start function.
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
