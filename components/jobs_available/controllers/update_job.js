const Job = require("../models/job_model");
const jobValidation = require("../helper/job_validator");

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = jobValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingJob = await Job.findOne({ title: value.title.trim(), _id: { $ne: id } });
    if (existingJob) {
      return res.status(409).json({ message: "Another job with this title already exists" });
    }

    const updatedSlug = slugify(value.title, { lower: true });

    job.set({
      ...value,
      slug: updatedSlug,
    });

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate title or slug" });
    }

    console.error("Update Job Error:", error);
    return res.status(500).json({ message: "Error updating job" });
  }
};

module.exports = updateJob;
