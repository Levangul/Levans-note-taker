const express = require("express");
const path = require("path"); // Import the 'path' module
const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Use routes
app.use(htmlRoutes);
app.use(apiRoutes);

// Catch-all route for non-existent routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
);