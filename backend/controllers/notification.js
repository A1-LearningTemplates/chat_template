notificationModel = require("../models/notificationSchema");

const createNotification = async (req, res) => {
  const { sender, receiver } = req.body;
  const newNotificationModel = notificationModel({ sender, receiver });
  try {
    const exist = await notificationModel.exists({
      $or: [{ receiver: receiver }, { receiver: sender }],
      $or: [{ sender: receiver }, { sender: sender }],
    });
    if (exist) {
      return res.status(409).json({
        success: true,
        message: "Conflict user already notified",
      });
    }
    const newNotification = await newNotificationModel.save();
    // newNotification.populate('my-path').execPopulate()
    if (newNotification) {
      return res.status(201).json({
        success: true,
        message: "new Notification created",
        data: req.body,
      });
    }
    throw Error("something went wrong");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};

const getNotificationById = async (req, res) => {
  const { user_id } = req.query;
  try {
    const data = await notificationModel
      .find({ receiver: user_id }, "-receiver")
      .populate("sender", "image userName");

    if (data) {
      return res.status(200).json({
        success: true,
        message: " the notification",
        notification: data,
      });
    }
    throw Error("something went wrong");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
const getRequestedNotificationById = async (req, res) => {
  const { user_id } = req.query;
  try {
    const data = await notificationModel
      .find({ sender: user_id })
      .populate("receiver", "image userName");

    if (data) {
      return res.status(200).json({
        success: true,
        message: " the Requested notification",
        notification: data,
      });
    }
    throw Error("something went wrong");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
module.exports = {
  createNotification,
  getNotificationById,
  getRequestedNotificationById,
};
