import mongodb from '../db/mongoConnect.js';
import { ObjectId } from 'mongodb';

export const getAllProjects = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection("projects").find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
    })
};

export const getProjectById = async (req, res, next) => {
    const projectId = req.params.id;
    try {
        const result = await mongodb.getDb().db().collection("projects").findOne({ _id: new ObjectId(projectId) });
        if (!result) {
            res.status(404).json({ message: "Couldn't find that project." });
        } else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(result);
        }

    } catch (err) {
        res.status(500).json({ message: "Possible server error. ", error: err.message });
    }
};

export const createNewProject = async (req, res, next) => {
    const newProject = req.body;

    if (
        !newProject.name ||
        !newProject.startDate ||
        !newProject.endDate ||
        !newProject.url ||
        !newProject.type ||
        !newProject.details ||
        !newProject.stack
    ) {
        return res.status(400).json({
            message: "Missing required fields. Please include all fields."
        });
    }

    try {
        const result = await mongodb.getDb().db().collection("projects").insertOne(newProject);

        res.status(201).json({
            message: "New project created successfully.",
            projectId: result.insertedId
        });
    } catch (err) {
        console.error("Database insert failed:", err);
        res.status(500).json({
            message: "Failed to create project due to server error.",
            error: err.message
        });
    }
};


export const updateProjectById = async (req, res, next) => {
    const projectId = req.params.id;
    const updatedProject = req.body;

    try {
        const result = await mongodb.getDb().db().collection("projects")
            .updateOne({ _id: new ObjectId(projectId) }, { $set: updatedProject });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(204).json({ message: "Project updated successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteProjectById = async (req, res, next) => {
    const projectId = req.params.id
    try {
        const result = await mongodb.getDb().db().collection("projects").deleteOne({ _id: new ObjectId(projectId) })
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json({ message: "Project deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};