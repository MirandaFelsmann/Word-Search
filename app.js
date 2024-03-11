import express from 'express';
import routes from './routes/routes.js';
import dotenv from 'dotenv'; 
dotenv.config({ path: 'process.env' });
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import configurePassport from './config/passport.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';


const app = express();


// Set up view engine

// Set up routes
app.use('/', routes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');
// Start server


configurePassport(passport); // Configuring passport


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
