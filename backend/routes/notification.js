const express = require("express");

const notificationRouter = express.Router();
const {
  createNotification,
  getNotificationById,
  getRequestedNotificationById,
  deleteNotification,
} = require("../controllers/notification");

notificationRouter.get("/received", getNotificationById);
notificationRouter.get("/sended", getRequestedNotificationById);
notificationRouter.post("/", createNotification);
notificationRouter.delete("/", deleteNotification);

module.exports = notificationRouter;
