const express = require("express");
const {sendConnectionRequest, getConnectionRequests, updateConnectionRequest, getMyConnections} = require("../controllers/connectionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:userId", protect, sendConnectionRequest);
router.get("/requests", protect, getConnectionRequests);
router.patch("/:id", protect, updateConnectionRequest);
router.get("/", protect, getMyConnections);

module.exports = router;