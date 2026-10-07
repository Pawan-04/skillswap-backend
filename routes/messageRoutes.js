const express = require('express')
const messageModel = require('../models/message')
const protect = require('../middleware/authMiddleware')
const {loadMessages,sendMessage} = require('../controllers/messageController')


const messageRouter = express.Router()

messageRouter.get('/:userId',protect,loadMessages)
messageRouter.post('/:userId',protect,sendMessage)

module.exports = messageRouter;