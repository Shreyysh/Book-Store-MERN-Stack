import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        published_year: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);