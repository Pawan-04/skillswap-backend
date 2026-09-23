const Resource = require("../models/Resource");

const createResource = async (req, res) => {
    try {
        console.log('hello')
        const { title, description, url, category, tags } = req.body;

        const resource = await Resource.create({
            title,
            description,
            url,
            category,
            tags,
            uploadedBy: req.user.userId
        });

        res.status(201).json({
            success: true,
            resource
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getResources = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        const resources = await Resource.find(filter)
            .populate("uploadedBy", "name email avatar");

        res.status(200).json({
            success: true,
            resources
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            });
        }

        if (resource.uploadedBy.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this resource"
            });
        }

        await Resource.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Resource deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createResource,
    getResources,
    deleteResource
};