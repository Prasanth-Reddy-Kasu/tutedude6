const API_KEY = "1acf1508876212bdafd4479d33aaf387";

async function fetchWeather(city = "Guntur") {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const windKmh = Math.round(data.wind.speed * 3.6);
    const weatherMain = data.weather[0].main;
    const iconCode = data.weather[0].icon;

    document.getElementById("temperature").textContent = `${temp}°C`;
    document.getElementById("humidity").textContent = `${humidity}%`;
    document.getElementById("wind").textContent = `${windKmh} km/h`;

    const iconUrl = getCustomIcon(weatherMain, iconCode);
    document.getElementById("icon").innerHTML = `
      <img src="${iconUrl}" alt="${weatherMain}" style="width: 5rem;" />
    `;
  } catch (error) {
    document.getElementById("temperature").textContent = "--°C";
    document.getElementById("humidity").textContent = "--%";
    document.getElementById("wind").textContent = "-- km/h";
    document.getElementById("icon").innerHTML = `
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyp3I4d1dyUilENcDxwqKHMwcnFrAOq-BBvg&s" alt="Default icon" style="width: 5rem;" />
    `;
    alert("Could not fetch weather data. Please check the city name.");
  }
}

function getCustomIcon(weatherMain, iconCode) {
  const isNight = iconCode.endsWith("n");

  switch (weatherMain) {
    case "Clear":
      return isNight
        ? "https://cdn-icons-png.flaticon.com/512/11660/11660566.png"
        : "https://cdn-icons-png.flaticon.com/512/3032/3032894.png";
    case "Clouds":
      return "https://cdn-icons-png.flaticon.com/512/252/252035.png";
    case "Rain":
    case "Drizzle":
      return "https://cdn-icons-png.flaticon.com/512/6142/6142637.png";
    case "Thunderstorm":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8MOx5hvbEM9_qyaejGFCIIDYefirvqWbBag&s";
    case "Snow":
      return "https://cdn-icons-png.flaticon.com/512/2530/2530064.png";
    case "Mist":
    case "Fog":
    case "Haze":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiqAq87vZkcXJg5LcUaglyQiB1GykM0pYEg&s";
    default:
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyp3I4d1dyUilENcDxwqKHMwcnFrAOq-BBvg&s";
  }
}

document.getElementById("refreshBtn").addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput && cityInput.value.trim();
  fetchWeather(city || "Guntur");
});

fetchWeather();
