import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const app = express();

let connectionString;

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PROD_DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
} else {
  connectionString = process.env.DEV_DATABASE_URL;
}

mongoose.connect(connectionString, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('We are connected!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to People REST API' }));
app.use('/', routes);

export default app;
