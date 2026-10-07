const messageModel = require('../models/message')
const connectionModel = require('../models/Connection')
const userModel = require('../models/User')

const loadMessages = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const receiverId = req.params.userId
        const isConnection = await connectionModel.find({
            status: 'accepted', $or: [{
                sender: senderId,
                receiver: receiverId
            }, {
                sender: receiverId,
                receiver: senderId
            }]
        })
        if (isConnection) {
            const receiverUser = await userModel.findById(receiverId).select("name");
            const messages = await messageModel.find({
                $or: [{
                    sender: senderId,
                    receiver: receiverId
                }, {
                    sender: receiverId,
                    receiver: senderId
                }]
            })

            res.status(200).json({messages,receiverName:receiverUser},
            )
        }
    }
    catch (err) {
        res.send(err)
    }
}

const sendMessage = async (req, res) => {
    const senderId = req.user.userId;
    const receiverId = req.params.userId
    const {message} = req.body;
    const isConnection = await connectionModel.findOne({
        status: 'accepted', $or: [{
            sender: senderId,
            receiver: receiverId
        }, {
            sender: receiverId,
            receiver: senderId
        }]
    })
    if (isConnection) {
        const { message } = req.body;
        const createMessage = await messageModel.create({
            sender: senderId,
            receiver: receiverId,
            message
        })
        res.status(201).json({createMessage})
    }

}

module.exports = { loadMessages, sendMessage }