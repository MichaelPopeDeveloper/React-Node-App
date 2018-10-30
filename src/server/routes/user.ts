import * as express from 'express';
// import * as jwt from 'jsonwebtoken';
import { user } from '../models/User';
import * as encryptor from '../helper/Encryptor';
import * as tokenHelper from '../helper/JWT';
const router = express.Router();

export const userRoute = router
  .get('/', (req, res) => {
    res.send('User Home Page');
  })
  .get('/profile', (req, res) => { // Should route be called notes?
    // User profile that shoes notes
    res.send('profile');
  })
  .post('/create', (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = encryptor.encryptPassword(password);
    const newUser = new user({
      username,
      password: encryptedPassword,
      notes: [],
    });
    newUser.save()
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch(error => console.log(error));
  })
  .post('/login', async (req, res) => {
    const { username, password } = req.body;
    const dbUser: any = await user.findOne({ username }).catch(err => res.send(err));
    if (!dbUser) {
      res.send('No user with that username exists...').status(403);
    }
    const { notes } = dbUser;
    if (encryptor.comparePassword(password, dbUser.password)) {
      const token = tokenHelper.signToken({ username, notes });
      res.send(token);
    } else {
      res.sendStatus(403);
    }
  })
  .post('/createNote', async (req, res) => {
    const { token } = req.body;
    const decodedToken: any = tokenHelper.decodeToken(token);
    const { username, note } = decodedToken;
    if (decodedToken.exp < Date.now() / 1000) {
      res.send('Token is expired').status(403);
    } else {
      const dbUser: any = await user.findOne({ username }).catch(err => res.send(err));
      if (!dbUser) {
        res.send('No user with that username exists...').status(403);
      } else {
        user.findOneAndUpdate({ username }, { $push: { notes: note } }) // validate that update happened
          .then(result => res.send(result))
          .catch(err => res.send(err));
      }
      // const { notes } = dbUser;
    }
  });
