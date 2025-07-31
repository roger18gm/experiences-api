import express from 'express';
import { getUserByEmail, createUser } from '../models/User.js';
import { random, authentication } from '../helpers/index.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email.' });
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);
        const newUser = await createUser({
            username,
            email,
            authentication: {
                password: hashedPassword,
                salt,
                sessionToken: random(),
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const hashedPassword = authentication(user.authentication.salt, password);
        if (hashedPassword !== user.authentication.password) {
            console.log("hashedPassword", hashedPassword);
            console.log("user.authentication.password", user.authentication.password);
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie('sessionToken', user.authentication.sessionToken, {
            httpOnly: true,
            secure: process.env.MODE === 'prod', // only set true in production
            sameSite: 'lax',
        });

        // res.status(200).json({ message: 'Login successful', sessionToken: user.authentication.sessionToken });
        res.status(200).json(user).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}