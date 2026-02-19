console.log("Script Loaded");
const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registrationForm");

let isUsernameAvailable = false;

usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();

  if (username === "") {
    feedback.textContent = "";
    isUsernameAvailable = false;
    return;
  }

  checkUsername(username);
});

async function checkUsername(username) {
  feedback.textContent = "Checking...";
  feedback.className = "loading";

  try {
    const response = await fetch("users.json");

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    if (data.users.includes(username.toLowerCase())) {
      feedback.textContent = "Username already taken";
      feedback.className = "taken";
      isUsernameAvailable = false;
    } else {
      feedback.textContent = "Username available";
      feedback.className = "available";
      isUsernameAvailable = true;
    }

  } catch (error) {
    feedback.textContent = "Error checking username";
    feedback.className = "taken";
    isUsernameAvailable = false;
  }
}

form.addEventListener("submit", function (event) {
  if (!isUsernameAvailable) {
    event.preventDefault();
    alert("Username is not available. Please choose another one.");
  }
});
