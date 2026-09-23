
const express = require("express");
const { createUser, loginUser, getCurrentUser, updateProfile } = require("../controllers/userController");
const protect = require('../middleware/authMiddleware')

const router = express.Router();

router.post("/", createUser);
router.post('/login',loginUser)
router.get('/me',protect,getCurrentUser)
router.patch("/me", protect, updateProfile);



module.exports = router;






















// const express = require("express");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/", async (req, res) => {
//     try {
//         const user = await User.create(req.body);

//         res.status(201).json({
//             success: true,
//             user
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// module.exports = router;