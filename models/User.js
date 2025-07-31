import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    createdAt: { type: Date, default: Date.now, required: false },
});

const UserSchema = mongoose.model('users', userSchema);

export const getUsers = () => UserSchema.find();
export const getUserByEmail = (email) => UserSchema.findOne({ email });
export const getUserBySessionToken = (sessionToken) => UserSchema.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id) => UserSchema.findById(id);
export const createUser = (userData) => new UserSchema(userData).save().then((user) => user.toObject());
export const deleteUserById = (id) => UserSchema.findByIdAndDelete(id);
export const updateUserById = (id, updateData) => UserSchema.findByIdAndUpdate(id, updateData, { new: true }).then((user) => user.toObject());

export default UserSchema;
