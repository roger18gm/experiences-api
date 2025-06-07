import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    joinDate: { type: Date, required: true },
    leaveDate: { type: Date, required: false },
    type: { type: String, required: true },
    details: { type: String, required: true },
});

const OrganizationSchema = mongoose.model('organizations', organizationSchema);

export default OrganizationSchema;