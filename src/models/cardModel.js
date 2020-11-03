const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  image: String,
  createdBy: String,
});

module.exports = mongoose.model("Card", CardSchema);
