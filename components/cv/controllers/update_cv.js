const mongoose = require("mongoose");
const CV = require("../models/cv_model");

const updateCV = async (req, res) => {
  const { id } = req.params;
  const status = req.body?.status;


  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid CV ID format" });
    }

    const validStatuses = ["pending", "approved"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid or missing status value. Must be 'pending' or 'approved'.",
      });
    }

    const updatedCV = await CV.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedCV) {
      return res.status(404).json({ message: "CV not found" });
    }

    return res.status(200).json({
      message: "CV status updated successfully",
      item: updatedCV,
    });
  } catch (error) {
    console.error("Update CV Error:", error.message);
    return res.status(500).json({ message: "Failed to update CV status" });
  }
};

module.exports = updateCV;
