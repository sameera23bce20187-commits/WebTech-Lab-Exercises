const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

let notes;

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  notes = client.db(DB_NAME).collection("notes");
  console.log("Connected to MongoDB:", DB_NAME);
}

// CREATE
app.post("/notes", async (req, res) => {
  const { title, subject, description } = req.body;
  if (!title || !subject || !description) {
    return res.status(400).json({ error: "title, subject, description required" });
  }

  const doc = {
    title: title.trim(),
    subject: subject.trim(),
    description: description.trim(),
    created_date: todayISO(),
  };

  const result = await notes.insertOne(doc);
  res.status(201).json({ _id: String(result.insertedId), ...doc });
});

// READ
app.get("/notes", async (req, res) => {
  const all = await notes.find({}).sort({ _id: -1 }).toArray();
  res.json(all.map(n => ({ ...n, _id: String(n._id) })));
});

// UPDATE
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });

  const { title, description } = req.body;
  const update = {};
  if (typeof title === "string") update.title = title.trim();
  if (typeof description === "string") update.description = description.trim();

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  const r = await notes.updateOne({ _id: new ObjectId(id) }, { $set: update });
  if (r.matchedCount === 0) return res.status(404).json({ error: "Note not found" });

  const updated = await notes.findOne({ _id: new ObjectId(id) });
  res.json({ ...updated, _id: String(updated._id) });
});

// DELETE
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });

  const r = await notes.deleteOne({ _id: new ObjectId(id) });
  if (r.deletedCount === 0) return res.status(404).json({ error: "Note not found" });

  res.json({ message: "Deleted" });
});

connectDB()
  .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
  .catch((e) => {
    console.error("DB connect failed:", e.message);
    process.exit(1);
  });
