const mongoose = require("mongoose");
require("dotenv").config();

connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connection successfully 😍🥰.");
  } catch (err) {
    console.log("😥😣 Error in DB connection: " + err.message);
    process.exit(1); //restart
  }
};

module.exports = connectDB;
