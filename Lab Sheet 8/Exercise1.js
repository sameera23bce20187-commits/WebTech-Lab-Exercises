document.getElementById("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let studentName = document.getElementById("studentName").value;
  let mark1 = Number(document.getElementById("mark1").value);
  let mark2 = Number(document.getElementById("mark2").value);
  let mark3 = Number(document.getElementById("mark3").value);

  const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

  let totalMarks = mark1 + mark2 + mark3;
  let averageMarks = calculateAverage(mark1, mark2, mark3);

  let highestMark = Math.max(mark1, mark2, mark3);
  let lowestMark = Math.min(mark1, mark2, mark3);
  let result = averageMarks >= 50 ? "Pass" : "Fail";
  let grade =
    averageMarks >= 90 ? "A+" :
    averageMarks >= 80 ? "A" :
    averageMarks >= 70 ? "B" :
    averageMarks >= 60 ? "C" :
    averageMarks >= 50 ? "D" : "F";

  document.getElementById("output").innerHTML = `
    <p>Student Name: ${studentName}</p>
    <p>Mark 1: ${mark1}</p>
    <p>Mark 2: ${mark2}</p>
    <p>Mark 3: ${mark3}</p>
    <p>Total Marks: ${totalMarks}</p>
    <p>Average Marks: ${averageMarks.toFixed(2)}</p>
    <p>Highest Mark: ${highestMark}</p>
    <p>Lowest Mark: ${lowestMark}</p>
    <p>Grade: ${grade}</p>
    <p>Result: ${result}</p>
  `;
});