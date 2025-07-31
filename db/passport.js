import GoogleStrategy from 'passport-google-oauth20';
import UserSchema from '../models/GoogleUser.js';

const passportConfig = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }
            try {
                let user = await UserSchema.findOne({ googleId: profile.id })
                if (user) {
                    done(null, user);
                } else {
                    user = await UserSchema.create(newUser);
                    done(null, user);
                }
            } catch (err) {
                console.error(err);
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        done(null, await UserSchema.findById(id))
    })
}

export default passportConfig;