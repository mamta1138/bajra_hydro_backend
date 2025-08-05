const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    vacancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
    position: {
      type: String,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    cv_url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
