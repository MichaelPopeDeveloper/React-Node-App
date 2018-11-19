import * as express from 'express';
// import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { user } from '../models/User';
import * as encryptor from '../helper/Encryptor';
import * as tokenHelper from '../helper/JWT';
const router = express.Router();

export const userRoute = router
  .get('/', (req, res) => {
    res.send('User Home Page');
  })
  .post('/notes', (req, res) => {
    const { token } = req.body;
    console.log(`token: ${token}`);
    const decodedToken = tokenHelper.decodeToken(token);
    if (decodedToken.exp > Date.now() / 1000) {
      console.log('not expired');
      console.log(decodedToken);
      const { email } = decodedToken;
      user.findOne({ email })
        .then((user) => {
          if (!user) {
            res.send('There is no user with those credentials').status(501);
          } else {
            const { name, email, notes }: any = user;
            const token = tokenHelper.signToken({ name, email, notes });
            res.send({ token });
          }
        });
    } else {
      console.log('expired token');
      res.send('nothing buddy');
    }
  })
  .post('/signUp', (req, res) => {
    const { name, email, password } = req.body;
    const encryptedPassword = encryptor.encryptPassword(password);
    const newUser = new user({
      name,
      email,
      password: encryptedPassword,
      notes: [],
    });
    newUser.save()
      .then((result) => {
        if (!result) {
          res.send('A user with that email already exists....');
        } else {
          const { name, email, notes }: any = result;
          const token = tokenHelper.signToken({ name, email, notes });
          res.send(token);
        }
        console.log(result);
        res.send(result);
      })
      .catch(error => console.log(error));
  })
  .post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    const dbUser: any = await user.findOne({ email }).catch(err => res.send(err));
    if (!dbUser) {
      res.send('No user with that username exists...').status(403);
    }
    const { notes } = dbUser;
    if (encryptor.comparePassword(password, dbUser.password)) {
      const token = tokenHelper.signToken({ email, notes });
      res.send({ token, authenticated: true });
    } else {
      res.send({ msg: 'invalid credentials', authenticated: false }).status(403);
    }
  })
  .post('/createNote', async (req, res) => {
    const { token } = req.body;
    const decodedToken: any = tokenHelper.decodeToken(token);
    const { email, title, note } = decodedToken;
    if (decodedToken.exp < Date.now() / 1000) {
      res.send('Token is expired').status(403);
    } else {
      const dbUser: any = await user.findOne({ email }).catch(err => res.send(err));
      if (!dbUser) {
        res.send('No user with that email exists...').status(403);
      } else {
        // Give note an id for retrieval
        note.id = crypto.randomBytes(64).toString('hex');
        user.findOneAndUpdate({ email }, { $push: { notes: note } })
          .then(result => res.send(result))
          .catch(err => res.send(err));
      }
      // const { notes } = dbUser;
    }
  })
  .post('/checkToken', async (req, res) => {
    const { token } = req.body;
    const decodedToken: any = tokenHelper.decodeToken(token);
    if (decodedToken.exp < Date.now() / 1000) {
      res.send({ msg: 'Token is expired', authenticated: false });
    } else {
      res.send({ msg: 'token is not expired', authenticated: true });
    }
  })
  .delete('/deleteNote', async (req, res) => {
    const { token } = req.body;
    const decodedToken: any = tokenHelper.decodeToken(token);
    const { email, note } = decodedToken;
    if (decodedToken.exp < Date.now() / 1000) {
      res.send('Token is expired').status(403);
    } else {
      const dbUser: any = await user.findOne({ email }).catch(err => res.send(err));
      if (!dbUser) {
        res.send('No user with that email exists...').status(403);
      } else {
        user.findOneAndUpdate({ email }, { $push: { notes: note } })
          .then(result => res.send(result))
          .catch(err => res.send(err));
      }
      // const { notes } = dbUser;
    }
  });
