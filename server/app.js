const express = require("express");
const app = express();
const PORT = 3000;
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(router);
app.get("/", (req, res) => {
  res.status(200).json("Server is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} port number`);
});
