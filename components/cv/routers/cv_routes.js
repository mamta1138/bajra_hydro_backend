const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { addCV, upload } = require("../controllers/add_cv");
const { listAllCVs } = require("../controllers/list_all_cvs");
const {getSingleCV} = require("../controllers/get_single_cv");
const deleteCV = require("../controllers/delete_cv");
const updateCV = require("../controllers/update_cv");

router.post("/", upload.single("cv"), addCV);
router.get("/", verifyToken, checkRole("admin", "editor"),listAllCVs);
router.get("/:id",verifyToken, checkRole("admin", "editor"), getSingleCV);
router.delete("/:id",verifyToken, checkRole("admin"), deleteCV);
router.put("/:id", verifyToken, checkRole("admin"), updateCV);

module.exports = router;
