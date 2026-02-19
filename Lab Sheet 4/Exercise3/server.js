const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let students = [];

// CREATE
app.post("/students", (req, res) => {
  const student = req.body;

  if (!student.id || !student.name) {
    return res.status(500).json({ message: "Invalid data" });
  }

  students.push(student);
  res.status(200).json({ message: "Student added successfully" });
});

// READ
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// UPDATE
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = req.body;
  res.status(200).json({ message: "Student updated successfully" });
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
