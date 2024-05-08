const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { fname, email, password, cpassword } = req.body;
  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "Fill All Details" });
  }

  try {
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This email is alresy exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "password and confirm password does not match" });
    } else {
      const finalUser = new User({ fname, email, password, cpassword });
      //here password hashing process
      const storeData = await finalUser.save();
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("Catch block error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Please fill all details" });
  }
  try {
    const userValid = await User.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({ error: "inavlid details" });
      } else {
        //token generate
        const token = await userValid.generateAuthtoken();

        //cookie generate
        res.cookie("userCookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validUserone = await User.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, validUserone });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((current) => {
      return current.token !== req.token;
    });
    res.clearCookie("userCookie", { path: "/" });
    req.rootUser.save();
    res.status(201).json({status:201});
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
