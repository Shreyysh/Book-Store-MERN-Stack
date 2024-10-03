import express from 'express';
import { Book } from '../models/bookmodels.js';

const router = express.Router();

//Route to creating a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.published_year
        ) {
            return res.status(400).send({ message : 'Send all required fields: title, author, published year'});
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            published_year: req.body.published_year
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : error.message });
    }
});

//Route to get all books
router.get('/', async (req, res) => {
    try {
        
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message : error.message});
    }
});

//Route to get a book
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (book == null) {
            return res.status(204).send({message: 'book not found'});
        }
        
        return res.status(200).json(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

//Route to update a book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.published_year
        ) {
            return res.status(400).send({message: "send all required fields: title, author, published year"});
        }

        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if (!book) {
            return res.status(404).send({message: 'book not found'});
        }

        return res.status(200).json({
            message: 'new book: ',
            newBook: book
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

//Route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        return res.status(200).json({message: 'book deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

export default router;