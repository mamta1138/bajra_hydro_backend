const CV = require("../models/cv_model");
const Vacancy = require("../../jobs_available/models/job_model"); 
const cvValidation = require("../helper/cv_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const addCV = async (req, res) => {
  try {
    const { error, value } = cvValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const vacancy = await Vacancy.findById(value.vacancy);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    const newCV = new CV({
      vacancy: value.vacancy,
      position: vacancy.title,
      fullname: value.fullname,
      email: value.email,
      cv_url: req.file.path,
      status: value.status
    });

    await newCV.save();

    return res.status(201).json({
      message: "Application Submitted Successfully",
      cv: newCV,
    });
  } catch (err) {
    console.error("Add CV Error:", err);
    return res.status(500).json({ message: "Server error while submitting application" });
  }
};

module.exports = { addCV, upload };
