const Job = require("../models/jobModel");  
const jobValidation = require("../helper/jobValidator"); 

const createJob = async (req, res) => {
  try {

    const { error, value } = jobValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newJob = new Job({
      ...value,  
      status: value.status || 'pending',  
    });

    await newJob.save();

    return res.status(201).json({
      message: "Job created successfully",
      newJob,
    });

  } catch (error) {

    console.error("Create Job Error:", error);
    return res.status(500).json({ message: "Server error while creating job" });
  }
};

module.exports = createJob;
