const mongose = require("mongoose");
const userSchema = mongose.Schema({
  userName: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true },
});

module.exports = mongose.model("User", userSchema);
