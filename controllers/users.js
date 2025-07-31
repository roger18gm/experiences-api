import { getUsers } from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}