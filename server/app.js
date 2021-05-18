const express = require("express");
const mongoose = require("mongoose");
const initRoutes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("MongoDB connection successfully 🌍🌍🌍");
    } catch (err) {
        console.log("😥😣 Error in DB connection: " + err.message);
        process.exit(1); //restart
    }
};
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
    console.log(`Server is running on port ${port}`);
});
