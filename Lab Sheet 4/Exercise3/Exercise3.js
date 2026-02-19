const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let editingId = null;

// Load students
window.onload = fetchStudents;

async function fetchStudents() {
  const response = await fetch("/students");
  const data = await response.json();
  displayStudents(data);
}

function displayStudents(students) {
  table.innerHTML = students.map(student => `
    <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.dept}</td>
      <td>${student.marks}</td>
      <td>
        <button onclick="editStudent('${student.id}')">Edit</button>
        <button onclick="deleteStudent('${student.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

// CREATE or UPDATE
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    dept: document.getElementById("dept").value,
    marks: document.getElementById("marks").value
  };

  try {
    let response;

    if (editingId) {
      response = await fetch(`/students/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
      editingId = null;
    } else {
      response = await fetch("/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
    }

    const result = await response.json();

    if (response.status === 200) {
      message.textContent = result.message;
      fetchStudents();
      form.reset();
    } else {
      message.textContent = "Error: " + result.message;
    }

  } catch (error) {
    message.textContent = "Server error (500)";
  }
});

// DELETE
async function deleteStudent(id) {
  const response = await fetch(`/students/${id}`, {
    method: "DELETE"
  });

  if (response.status === 200) {
    message.textContent = "Student deleted successfully";
    fetchStudents();
  } else {
    message.textContent = "Student not found (404)";
  }
}

// EDIT
async function editStudent(id) {
  const response = await fetch("/students");
  const students = await response.json();
  const student = students.find(s => s.id === id);

  document.getElementById("id").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("dept").value = student.dept;
  document.getElementById("marks").value = student.marks;

  editingId = id;
}
