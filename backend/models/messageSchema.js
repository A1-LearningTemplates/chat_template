const mongose = require("mongoose");
const messageSchema = mongose.Schema(
  {
    message: { type: String },
    conversation_id: {
      type: mongose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  { timestamps: true }
);

module.exports = mongose.model("Message", messageSchema);