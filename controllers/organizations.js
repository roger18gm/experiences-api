import OrganizationSchema from '../models/Organization.js';
import mongoose from 'mongoose';

export const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationSchema.find();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getOrganizationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid organization ID" });
    }

    try {
        const organization = await OrganizationSchema.findById(id);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.status(200).json(organization);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createNewOrganization = async (req, res) => {
    try {
        const organization = new OrganizationSchema(req.body);
        await organization.save();
        res.status(201).json({ message: "Organization created", organizationId: organization._id });
    } catch (err) {
        res.status(400).json({ message: "Validation error", error: err.message });
    }
};

export const updateOrganizationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid organization ID" });
    }

    try {
        const result = await OrganizationSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.status(204).json({ message: "Organization updated", organization: result });
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
    }
};

export const deleteOrganizationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid organization ID" });
    }

    try {
        const result = await OrganizationSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.status(200).json({ message: "Organization deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};