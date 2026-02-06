import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    videoUrl: { type: String, required: false },
    sourceUrl: { type: String, required: true },
    siteUrl: { type: String, required: false },
    type: { type: String, required: true },
    details: { type: [String], required: true },
    stack: { type: [String], required: true }
});

const ProjectSchema = mongoose.model('projects', projectSchema);

export default ProjectSchema;
