const mongose = require("mongoose");
const notificationSchema = mongose.Schema(
  {
    sender: {
      type: mongose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongose.model("Notification", notificationSchema);
