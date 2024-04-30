const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

// Define routes
app.get("/match", (req, res) => {
  res.sendFile(__dirname + "/public" + "/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public" + "/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public" + "/register.html");
});
app.get("/me", (req, res) => {
  res.sendFile(__dirname + "/public" + "/me.html");
});
app.get("/matches", (req, res) => {
  res.sendFile(__dirname + "/public" + "/matches.html");
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
