import express from 'express';
import routes from './routes/routes.js';
import dotenv from 'dotenv'; 
dotenv.config({ path: 'process.env' });
import bcrypt from 'bcrypt';
import session from 'express-session';
const app = express();


// Set up view engine
app.set('view engine', 'ejs');

// Set up routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
