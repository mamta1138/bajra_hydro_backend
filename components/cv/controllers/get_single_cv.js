const CV = require("../models/cv_model");

const getSingleCV = async (req, res) => {
  try {
    const { id } = req.params;
    const cv = await CV.findById(id);

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    return res.status(200).json({ cv });
  } catch (err) {
    console.error("Get Single CV Error:", err);
    return res.status(500).json({ message: "Server error while fetching CV" });
  }
};

module.exports = { getSingleCV };
