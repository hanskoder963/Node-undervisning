// IMPORTS

const path = require("path");
const express = require("express");
const cors = require("cors");

const { logger } = require("/middleware/logEvents");

//port definition
const PORT = process.env.PORT || 3500;
const app = express();

app.use(logger);

const whitelist = [
  "https://www.thissiteisallowed.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/new-page.(html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "new-page.html"));
});

app.get("/old-page.(html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
