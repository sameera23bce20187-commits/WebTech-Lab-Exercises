require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
    .catch((err) => console.error('❌ Error connecting to MongoDB:', err));


app.post('/api/books', async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = new Book({ title, author, year });
        
        
        const savedBook = await newBook.save();
        
        
        res.status(201).json({ message: 'Book created successfully', data: savedBook });
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error: error.message });
    }
});


app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: 'Books retrieved successfully', data: books });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
});


app.put('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
       
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully', data: updatedBook });
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error: error.message });
    }
});


app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', data: deletedBook });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting book', error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});