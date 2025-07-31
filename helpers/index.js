import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SESSION_SECRET

export const random = () => {
    return crypto.randomBytes(128).toString('base64');
}
export const authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}