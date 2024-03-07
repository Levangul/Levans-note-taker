const fs = require("fs");
const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Load the initial data from db.json
let db = require("../db/db.json");

router.get("/api/notes", (req, res) => {
    res.json(db);
});

router.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    db.push(newNote);

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), (err) => {
        if (err) throw err;
        res.json(db);
    });
});

router.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;

    const noteIndex = db.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
        db.splice(noteIndex, 1);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), (err) => {
            if (err) throw err;
            res.json(db);
        });
    } else {
        res.status(404).json({ message: "Note not found" });
    }
});

module.exports = router;