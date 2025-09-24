// IMPORTS
//third party imports
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//first party imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const verifyJWT = require("./middleware/verifyJWT");

//port definition
const PORT = process.env.PORT || 3500;
const app = express();

//app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(errorHandler);
//routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir/subdir"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//beskyttet
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 JSON not found" });
  } else res.accepts("txt");
  {
    res.type({ error: "404, text not found" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
