const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Título é obrigatório'],
    validate: {
      validator: function (val) {
        return val.length >= 3
      },
      message: () => `O título tem que ter no mínimo 3 caracteres`
    },
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Descrição é obrigatório'],
    validate: {
      validator: function (val) {
        return val.length >= 3
      },
      message: () => `A descrição tem que ter no mínimo 3 caracteres`
    },
  },
  image: String,
  createdBy: String,
});

module.exports = mongoose.model("Card", CardSchema);
