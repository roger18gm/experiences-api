import CertificationSchema from '../models/Certification.js';
import mongoose from 'mongoose';

export const getAllCertifications = async (req, res) => {
    try {
        const certifications = await CertificationSchema.find();
        res.status(200).json(certifications);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getCertificationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Certification ID" });
    }

    try {
        const certification = await CertificationSchema.findById(id);
        if (!certification) {
            return res.status(404).json({ message: "Certification not found" });
        }
        res.status(200).json(certification);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createNewCertification = async (req, res) => {
    try {
        const certification = new CertificationSchema(req.body);
        await certification.save();
        res.status(201).json({ message: "Certification created", certificationId: certification._id });
    } catch (err) {
        res.status(400).json({ message: "Validation error", error: err.message });
    }
};

export const updateCertificationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Certification ID" });
    }

    try {
        const result = await CertificationSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({ message: "Certification not found" });
        }
        res.status(204).json({ message: "Certification updated", certification: result });
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
    }
};

export const deleteCertificationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid certification ID" });
    }

    try {
        const result = await CertificationSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Certification not found" });
        }
        res.status(200).json({ message: "Certification deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};