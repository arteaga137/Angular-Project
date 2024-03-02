const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function login(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({ msg: "Credentials Not Valid" });
    } else {
      const resultCompare = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );
      if (!resultCompare) {
        return res.status(400).json({ msg: "Credentials Not Valid" });
      } else {
        const token = jwt.sign({ userId: foundUser._id }, "dddasdfdas", {
          expiresIn: "1h",
        });
        return res.status(200).json({ msg: "ok", token: token });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error: Cannot Access" });
  }
}

async function signup(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hash,
      role: "user",
      name: req.body.name,
    });
    await newUser.save();
    return res.json({ msg: "Registry Succesful" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Registry Error" });
  }
}

module.exports = { login, signup };
