const userModle = require("../models/userSchema");

const login = async (req, res) => {
  try {
    const { userName, image } = req.body;

    const newUser = userModle({
      userName,
      image,
    });
    const data = await newUser.save();
    res.status(201).json({
      success: true,
      message: "user created",
      data,
    });
  } catch (error) {
    if (error.keyPattern.userName) {
      res.status(404).json({
        success: false,
        message: "userName already exist",
        error,
      });
    }
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};

module.exports = { login };
