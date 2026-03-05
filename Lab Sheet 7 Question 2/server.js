const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "book_finder_db";
const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "5", 10);

let books;

async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  books = client.db(DB_NAME).collection("books");
  console.log("MongoDB connected:", DB_NAME);
}

// 1) Search by title
// GET /books/search?title=javascript
app.get("/books/search", async (req, res) => {
  const title = (req.query.title || "").trim();
  if (!title) return res.status(400).json({ error: "title query param required" });

  const results = await books
    .find({ title: { $regex: title, $options: "i" } })
    .toArray();

  res.json(results.map(b => ({ ...b, _id: String(b._id) })));
});

// 2) Filter by category
// GET /books/category/programming
app.get("/books/category/:category", async (req, res) => {
  const category = (req.params.category || "").trim();

  const results = await books
    .find({ category: { $regex: `^${category}$`, $options: "i" } })
    .toArray();

  res.json(results.map(b => ({ ...b, _id: String(b._id) })));
});

// 3) Sort books
// GET /books/sort/price  (asc)
// GET /books/sort/rating (desc)
app.get("/books/sort/:field", async (req, res) => {
  const field = req.params.field;
  if (field !== "price" && field !== "rating") {
    return res.status(400).json({ error: "field must be price or rating" });
  }

  const sortObj = field === "price" ? { price: 1 } : { rating: -1 };
  const results = await books.find({}).sort(sortObj).toArray();

  res.json(results.map(b => ({ ...b, _id: String(b._id) })));
});

// 4) Top rated books
// GET /books/top
app.get("/books/top", async (req, res) => {
  const results = await books
    .find({ rating: { $gte: 4 } })
    .sort({ rating: -1 })
    .limit(5)
    .toArray();

  res.json(results.map(b => ({ ...b, _id: String(b._id) })));
});

// 5) Pagination
// GET /books?page=2
app.get("/books", async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const skip = (page - 1) * PAGE_SIZE;

  const results = await books.find({}).skip(skip).limit(PAGE_SIZE).toArray();

  res.json({
    page,
    pageSize: PAGE_SIZE,
    items: results.map(b => ({ ...b, _id: String(b._id) })),
  });
});

connectDB()
  .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
  .catch((e) => {
    console.error("DB connect failed:", e.message);
    process.exit(1);
  });
