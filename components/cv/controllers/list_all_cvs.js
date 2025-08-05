const CV = require("../models/cv_model");
const Vacancy = require("../../jobs_available/models/job_model")

const listAllCVs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 

    const search = req.query.search || "";
    const status = req.query.status || "";

    const searchQuery = {
      ...(search && { fullname: { $regex: search, $options: "i" } }),
      ...(status && { status })
    };

    const CVs = await CV.find(searchQuery)
      .sort({ createdAt: sortOrder }) 
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCVs = await CV.countDocuments(searchQuery)

    return res.status(200).json({
      message: "CVs fetched successfully",
      CVs,
      pagination: {
        currentPage: page,
        totalCVs,
        totalPages: Math.ceil(totalCVs / limit),
        CVsPerPage: limit,
      },
    });

  } catch (error) {
    console.error("List CVs Error:", error);
    return res.status(500).json({ message: "Failed to fetch CVs" });
  }
};

module.exports = { listAllCVs };
