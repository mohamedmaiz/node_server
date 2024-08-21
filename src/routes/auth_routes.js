import { login, authentication, getUser } from "../controllers/auth_controller.js"
import passport from "passport";
import googleStrategy from "passport-google-oauth20"
import { Router } from "express"
import config from "../../config.js"
const router = Router()



passport.use(new googleStrategy.Strategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.CALLBACK_URL
}, (accesToken, tokenSecret, profil, done) => {
  console.log(accesToken);
  console.log(tokenSecret);
  console.log(profil);

}));


router.route('/login').post(login);

router.post("/getUser", authentication, getUser);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);
export default router;
