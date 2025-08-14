const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacancySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Entry-Level",
        "Mid-Level",
        "Senior-Level",
        "Manager",
        "Executive",
      ],
    },
    no_of_vacancy: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    job_type: {
      type: String,
      required: true,
      trim: true,
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
    },

    salary: {
      type: String,
      trim: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    application_deadline: {
      type: Date,
    },
    posted_date: {
      type: Date,
      default: Date.now,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Vacancy = mongoose.model("Vacancy", vacancySchema);

module.exports = Vacancy;
