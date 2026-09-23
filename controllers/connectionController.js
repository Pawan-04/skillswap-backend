const Connection = require("../models/Connection");
const User = require("../models/User");

const sendConnectionRequest = async (req, res) => {
try{
        const senderId = req.user.userId;
    const receiverId = req.params.userId;

    if (senderId === receiverId) {
    return res.status(400).json({
        success: false,
        message: "You cannot send a connection request to yourself"
    });
}

    const receiver = await User.findById(receiverId);


if (!receiver) {
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
    }

//     const existingConnection = await Connection.findOne({
//     sender: senderId,
//     receiver: receiverId
// });
 const existingConnection = await Connection.findOne({
    $or: [
        {
            sender: senderId,
            receiver: receiverId
        },
        {
            sender: receiverId,
            receiver: senderId
        }
    ]
});

if (existingConnection) {
    return res.status(400).json({
        success: false,
        message: "Connection request already exists"
    });
}

const connection = await Connection.create({
    sender: senderId,
    receiver: receiverId
});

res.status(201).json({
    success: true,
    message: "Connection request sent",
    connection
});
}

catch(err){
    return res.status(500).json({
        success:false,
        message:"Bad request"
    })
}

};


const getConnectionRequests = async (req, res) => {
    try {
        const requests = await Connection.find({
            receiver: req.user.userId,
            status: "pending"
        }).populate("sender", "name email avatar");

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateConnectionRequest = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const connection = await Connection.findById(req.params.id);

        if (!connection) {
            return res.status(404).json({
                success: false,
                message: "Connection request not found"
            });
        }

        // Only receiver can accept/reject
        if (connection.receiver.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this request"
            });
        }

        if (connection.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Request is already processed"
            });
        }

        connection.status = status;

        await connection.save();

        res.status(200).json({
            success: true,
            message: `Connection request ${status}`,
            connection
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getMyConnections = async (req, res) => {
    try {
        const userId = req.user.userId;

        const connections = await Connection.find({
            $or: [
                { sender: userId, status: "accepted" },
                { receiver: userId, status: "accepted" }
            ]
        })
            .populate("sender", "name email avatar")
            .populate("receiver", "name email avatar");

        res.status(200).json({
            success: true,
            connections
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    sendConnectionRequest,
    getConnectionRequests,
    updateConnectionRequest,
    getMyConnections
};