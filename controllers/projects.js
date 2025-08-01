import ProjectSchema from '../models/Project.js';
import mongoose from 'mongoose';

export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectSchema.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getProjectById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
    }

    try {
        const project = await ProjectSchema.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createNewProject = async (req, res) => {
    try {
        const project = new ProjectSchema(req.body);
        await project.save();
        res.status(201).json({ message: "Project created", projectId: project._id });
    } catch (err) {
        res.status(400).json({ message: "Validation error", error: err.message });
    }
};

export const updateProjectById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
    }

    try {
        const result = await ProjectSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project updated", project: result });
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
    }
};

export const deleteProjectById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
    }

    try {
        const result = await ProjectSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
