const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const initRoutes = require("./routes");
const connectDB = require("./config");
require("dotenv").config();

connectDB();

//app
const app = express();

app.use(
  cors({
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  })
);

//middeware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//route
app.use("/api", initRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🌍🌍🌍`);
});
