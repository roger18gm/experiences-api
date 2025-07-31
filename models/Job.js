import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    company: { type: String, required: true },
    details: { type: [String], required: true },
    location: { type: String, required: true },
});

const JobSchema = mongoose.model('jobs', jobSchema);

export default JobSchema;
