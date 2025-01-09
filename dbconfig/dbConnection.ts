import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
    throw new Error('Wrong DB Connection');
}

mongoose
    .connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
    });

mongoose.set('debug', true);

export default mongoose;
