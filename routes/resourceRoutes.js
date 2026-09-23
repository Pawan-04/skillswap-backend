const express = require("express");
const {createResource, getResources, deleteResource} = require("../controllers/resourceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createResource);
router.get("/", getResources);
router.delete("/:id", protect, deleteResource);

module.exports = router;