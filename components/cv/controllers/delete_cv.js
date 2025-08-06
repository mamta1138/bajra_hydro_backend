const CV = require("../models/cv_model");

// Delete a submitted Application by ID
const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CV.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "CV application not found" });
    }

    return res.status(200).json({
      message: "CV application deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete CV application Error:", error);
    return res.status(500).json({ message: "Failed to delete CV application" });
  }
};

module.exports = deleteCV;
