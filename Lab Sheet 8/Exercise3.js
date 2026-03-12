class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
  }

  displayCourse() {
    return `Course: ${this.courseName}, Instructor: ${this.instructor}`;
  }
}

let course1 = new Course("Web Technologies", "Dr. Kumar");

let studentName = "Arun";
let seatsAvailable = true;
let courseFee = 5000;

let enrollCourse = new Promise((resolve, reject) => {
  if (seatsAvailable)
    resolve("Enrollment Successful");
  else
    reject("Course Full");
});

enrollCourse
  .then(msg => {
    document.getElementById("output").innerHTML = `
      <p>${course1.displayCourse()}</p>
      <p>Student Name: ${studentName}</p>
      <p>Course Fee: Rs. ${courseFee}</p>
      <p>Enrollment Message: ${msg}</p>
      <p>Enrollment Status: Confirmed</p>
    `;
  })
  .catch(err => {
    document.getElementById("output").innerHTML = `
      <p>${course1.displayCourse()}</p>
      <p>Student Name: ${studentName}</p>
      <p>Enrollment Message: ${err}</p>
      <p>Enrollment Status: Waiting List</p>
    `;
  });