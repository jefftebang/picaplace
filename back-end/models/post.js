const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: {
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", PostSchema);
