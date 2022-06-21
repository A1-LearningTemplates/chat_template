const mongose = require("mongoose");
const conversationSchema = mongose.Schema({
  person_one: { type: mongose.Schema.Types.ObjectId, ref: "User" },
  person_two: { type: mongose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongose.model("Conversation", conversationSchema);
