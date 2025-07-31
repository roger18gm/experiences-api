import pkg from 'lodash';
const { get, merge, identity } = pkg;
import { getUserBySessionToken } from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['sessionToken']
        if (!sessionToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        merge(req, { identity: user });
        return next();
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
