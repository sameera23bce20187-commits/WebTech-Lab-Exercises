let cachedCity = null;
let cachedData = null;

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const spinner = document.getElementById("spinner");

  if (!city) return;

  // If same city searched again → use cache
  if (cachedCity === city && cachedData) {
    displayWeather(cachedData);
    return;
  }

  spinner.style.display = "block";
  resultDiv.innerHTML = "";

  try {
    const apiKey = "8c51ad5b9ae3eb46b56a6ee1484970e2";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cachedCity = city;
    cachedData = data;

    displayWeather(data);

  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  } finally {
    spinner.style.display = "none";
  }
}

function displayWeather(data) {
  const resultDiv = document.getElementById("weatherResult");

  resultDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}
