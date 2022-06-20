const userModle = require("../models/userSchema");
const login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const data = await userModle.findOne({ userName: userName });
    if (data && password === data.password) {
      return res.status(200).json({
        success: true,
        message: "login successfuly",
        data: { userName: data.userName, id: data.id },
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
const addUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const newUser = userModle({
      userName,
      password,
    });
    const data = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "user created",
      data: { userName: data.userName, id: data.id },
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: "server error",
      error,
    });
  }
};

module.exports = { login, addUser };
