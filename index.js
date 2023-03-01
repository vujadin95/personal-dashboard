// let myId = "G0ve1Hyax8ED9RKJoT4rLeic6e3nnRK7csVDg9QtnFQ";
const defaultBackgroundImage =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc2NzA1ODI&ixlib=rb-4.0.3&q=80&w=1080";
const defaultAuthor = "Benjamin Voros";
const defaultQoute = "Today is the tomorrow you worried about yesterday.";
const scrimbaApi =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const quoteApi = "https://type.fit/api/quotes";

// index.html page elements
const authorEl = document.getElementById("author");
const locationEl = document.getElementById("location");
const quoteEl = document.getElementById("quote");
const quoteAuthorEl = document.getElementById("quote-author");
const weatherIconEl = document.getElementById("weather-icon");
const weatherTempEl = document.getElementById("weather-temp");
const weatherLocationEl = document.getElementById("weather-location");

//  for production page: `https://api.unsplash.com/photos/random?client_id=${myId}&query=nature&orientation=landscape`

async function getBackgroundImage() {
  try {
    const response = await fetch(`${scrimbaApi}`);
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.textContent = `By: ${data.user.name}`;
    locationEl.textContent = data.location.name
      ? `Location: ${data.location.name}`
      : "";
  } catch (error) {
    document.body.style.backgroundImage = `url(${defaultBackgroundImage})`;
    authorEl.textContent = `By: ${defaultAuthor}`;
  }
}
getBackgroundImage();

// function for displaying time on dashboard
function setTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short", hour12: false }
  );
}
setTime();
setInterval(setTime, 1000);

// function that gets random qoute from free qoute API
async function getQuote() {
  try {
    const response = await fetch(`${quoteApi}`);
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * 1643);
    quoteEl.textContent = `"${data[randomIndex].text}"`;
    quoteAuthorEl.textContent = data[randomIndex].author
      ? `${data[randomIndex].author}`
      : "Anonymous";
  } catch (error) {
    quoteEl.textContent = `"${defaultQoute}"`;
    quoteAuthorEl.textContent = `Anonymous`;
    console.log("Fetch error: ", error);
  }
}
//calling getQoute function on every poge load
getQuote();
// calling getQoute function every minute
setInterval(getQuote, 60 * 1000);

async function getWeatherData() {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8e23809fa3mshc10cf01d693f498p18f02ejsn0bfe38262ba7",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=Kragujevac`,
      options
    );
    const data = await response.json();
    weatherIconEl.src = data.current.condition.icon;
    weatherTempEl.textContent = `${data.current.temp_c}º`;
    weatherLocationEl.textContent = data.location.name;
  } catch (error) {}
}
getWeatherData();
