import mongodb from '../db/mongoConnect.js';
import { ObjectId } from 'mongodb';

export const getAllJobs = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection("jobs").find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
    })
};

export const getJobById = async (req, res, next) => {
    const jobId = req.params.id;
    try {
        const result = await mongodb.getDb().db().collection("jobs").findOne({ _id: new ObjectId(jobId) });
        if (!result) {
            res.status(404).json({ message: "Couldn't find that job." });
        } else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(result);
        }

    } catch (err) {
        res.status(500).json({ message: "Possible server error. ", error: err.message });
    }
};

export const createNewJob = async (req, res, next) => {
    const newJob = req.body;

    if (
        !newJob.title ||
        !newJob.startDate ||
        !newJob.endDate ||
        !newJob.company ||
        !newJob.details
    ) {
        return res.status(400).json({
            message: "Missing required fields. Please include all fields."
        });
    }

    try {
        const result = await mongodb.getDb().db().collection("jobs").insertOne(newJob);

        res.status(201).json({
            message: "New job created successfully.",
            jobId: result.insertedId
        });
    } catch (err) {
        console.error("Database insert failed:", err);
        res.status(500).json({
            message: "Failed to create job due to server error.",
            error: err.message
        });
    }
};


export const updateJobById = async (req, res, next) => {
    const jobId = req.params.id;
    const updatedJob = req.body;

    try {
        const result = await mongodb.getDb().db().collection("jobs")
            .updateOne({ _id: new ObjectId(jobId) }, { $set: updatedJob });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(204).json({ message: "Job updated successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteJobById = async (req, res, next) => {
    const jobId = req.params.id
    try {
        const result = await mongodb.getDb().db().collection("jobs").deleteOne({ _id: new ObjectId(jobId) })
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json({ message: "Job deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};