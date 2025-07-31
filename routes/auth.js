import express from 'express';
import passport from 'passport';
import { login, register } from '../controllers/authentication.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/api-docs')
});

router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) { return next(error) }
        res.redirect('/')
    });
})

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, (req, res) => {
    res.json(req.user);
});
export default router;