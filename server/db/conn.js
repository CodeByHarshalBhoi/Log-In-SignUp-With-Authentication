const mongoose = require("mongoose");

const DB =
  "mongodb://127.0.0.1:27017/Authusers";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Databse Connect");
  })
  .catch((err) => {
    console.log("Error:-",err);
  });
