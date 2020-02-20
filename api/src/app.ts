import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { MONGODB_URI } from './util/secrets';
import * as userController from './controllers/user';
import * as passportConfig from './config/passport';
import passport from 'passport';
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    );
    // process.exit();
  });

app.use(compression());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());

app.post('/login', userController.postLogin);
app.post('/signup', userController.postSignup);
app.get('/good', passport.authenticate('jwt'{session: false}), async (req, res, next) => {
  res.json({ ok: 'ok' });
});
export default app;
