import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String, required: false },
    createdAt: { type: Date, default: Date.now, required: false },
});

const UserSchema = mongoose.model('user', userSchema);

export default UserSchema;
