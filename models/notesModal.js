const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const noteSchema = new mongoose.Schema(
  {
    subject: {
      type: "String",
      required: true,
      trim: true,
    },
    note: {
      type: "String",
      required: true,
      trim: true,
    },
    noteby: {
      type: ObjectId,
      ref: "User",
    },
    imp_note: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
