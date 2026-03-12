document.getElementById("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const student = {
    id: Number(document.getElementById("id").value),
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    marks: Number(document.getElementById("marks").value)
  };

  const { id, name, department, marks } = student;

  const updatedStudent = {
    ...student,
    grade: marks >= 90 ? "A" : marks >= 75 ? "B" : marks >= 50 ? "C" : "F"
  };

  let result = marks >= 50 ? "Pass" : "Fail";
  let scholarship = marks >= 90 ? "Eligible" : "Not Eligible";
  let remark =
    marks >= 90 ? "Excellent" :
    marks >= 75 ? "Very Good" :
    marks >= 60 ? "Good" :
    marks >= 50 ? "Average" : "Needs Improvement";

  document.getElementById("output").innerHTML = `
    <p><strong>Student ID:</strong> ${id}</p>
    <p><strong>Student Name:</strong> ${name}</p>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Marks:</strong> ${marks}</p>
    <p><strong>Grade:</strong> ${updatedStudent.grade}</p>
    <p><strong>Result:</strong> ${result}</p>
    <p><strong>Scholarship Status:</strong> ${scholarship}</p>
    <p><strong>Remark:</strong> ${remark}</p>
  `;
});