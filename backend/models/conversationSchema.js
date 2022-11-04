const mongose = require("mongoose");
const conversationSchema = mongose.Schema({
  user_id: {
    type: mongose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  persons: [
    {
      _id: false,
      person: {
        type: mongose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});
module.exports = mongose.model("Conversation", conversationSchema);
