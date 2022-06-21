const mongose = require("mongoose");
const messageSchema = mongose.Schema({
  message: { type: String, required: true, unique: true },
  conversation_id: { type: mongose.Schema.Types.ObjectId, ref: "Conversation" },
});

module.exports = mongose.model("Message", messageSchema);
