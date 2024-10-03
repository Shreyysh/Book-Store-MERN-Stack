import { dbURL, PORT } from './config.js';
import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';
import router from './routes/booksRoute.js';

const app = express();

app.use(express.json()); //for parsing json

app.get('/', (req, res) => {
    return res.status(200).send("Link is Working!");
});

app.use('/book', router);

mongoose
    .connect(dbURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is Listening to Port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    }); 
