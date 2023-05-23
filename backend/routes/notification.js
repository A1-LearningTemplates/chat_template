const express = require("express");

const notificationRouter = express.Router();
const {
  createNotification,
  getNotificationById,
  getRequestedNotificationById,
} = require("../controllers/notification");

notificationRouter.get("/received", getNotificationById);
notificationRouter.get("/sended", getRequestedNotificationById);
notificationRouter.post("/", createNotification);

module.exports = notificationRouter;
