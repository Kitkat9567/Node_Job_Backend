const AuthRepository = require("../repository/authRepository");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await AuthRepository.findUserbyEmail(email);

    if (!user) {
      return res.status(404).json({ message: "wrong credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const companyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const comp = await AuthRepository.findCompbyEmail(email);
    if (!comp) {
      return res.status(404).json({ message: "Wrong Credentials" });
    }

    const isMatch = await bcrypt.compare(password, comp.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect Credentials" });
    }

    const token = await jwt.sign({ id: comp._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

module.exports = {
  userLogin,
  companyLogin
};
