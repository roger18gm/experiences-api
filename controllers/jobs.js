import JobSchema from '../models/Job.js';
import mongoose from 'mongoose';

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobSchema.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getJobById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const job = await JobSchema.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createNewJob = async (req, res) => {
    try {
        const job = new JobSchema(req.body);
        await job.save();
        res.status(201).json({ message: "Job created", jobId: job._id });
    } catch (err) {
        res.status(400).json({ message: "Validation error", error: err.message });
    }
};

export const updateJobById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const result = await JobSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job updated", job: result });
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
    }
};

export const deleteJobById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const result = await JobSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
