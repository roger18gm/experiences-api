import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expireDate: { type: Date, required: false },
    verificationUrl: { type: String, required: false },
    details: { type: String, required: true },
});

const CertificationSchema = mongoose.model('certifications', certificationSchema);

export default CertificationSchema;