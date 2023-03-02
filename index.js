// let myId = "G0ve1Hyax8ED9RKJoT4rLeic6e3nnRK7csVDg9QtnFQ";
const defaultAuthor = "Marek Piwnicki";
const defaultQoute = "Today is the tomorrow you worried about yesterday.";
const scrimbaApi =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=universe";
const quoteApi = "https://type.fit/api/quotes";

// index.html page elements
const bodyEl = document.body;
const focusEl = document.getElementById("focus");
// const focusInputEl = document.getElementById("focus-input");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("hello-message");
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
    bodyEl.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.textContent = `By: ${data.user.name}`;
    locationEl.textContent = data.location.name
      ? `Location: ${data.location.name}`
      : "";
  } catch (error) {
    document.body.style.backgroundImage = `url('/default.jpg')`;
    authorEl.textContent = `By: ${defaultAuthor}`;
  }
}
getBackgroundImage();

// function for displaying time and hello message on dashboard
function setTime() {
  let message = "";
  const date = new Date();
  const timeToDisplay = date.toLocaleTimeString("en-us", {
    timeStyle: "short",
    hour12: false,
  });
  timeEl.textContent = timeToDisplay;
  if (date.getHours() > 12 && date.getHours() < 18) {
    message = "Good afternoon, Vujadin";
  } else if (date.getHours() >= 18 && date.getHours() < 21) {
    message = "Good evening, Vujadin";
  } else if (date.getHours() >= 21 && date.getHours() <= 23) {
    message = "Good night, Vujadin";
  } else if (date.getHours() >= 0 && date.getHours() < 5) {
    message = "Good night, Vujadin";
  } else if (date.getHours() >= 5 && date.getHours() <= 9) {
    message = "Good morning, Vujadin";
  } else {
    message = "Good day, Vujadin";
  }
  messageEl.textContent = message;
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
//calling getQuote function on every poge load
getQuote();
// calling getQuote function every minute
setInterval(getQuote, 3600 * 1000);

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
  } catch (error) {
    document.getElementById("weather").textContent = "No current data";
  }
}
getWeatherData();

let mainFocus = { text: "", isChecked: false };

function render() {
  if (mainFocus.text === "") {
    focusEl.innerHTML = `
    <p class="focus-question">What is your main focus on today?</p>
    <input class="focus-input" type="text" id='focus-input' autocomplete='off'/>
    `;
    focusEl.addEventListener("input", function () {
      mainFocus.text = document.getElementById("focus-input").value;
    });
    focusEl.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && mainFocus.text !== "") {
        renderEnteredFocus();
        document.getElementById("uzmi").addEventListener("click", function () {
          mainFocus.isChecked = !mainFocus.isChecked;
          renderEnteredFocus();
          render();
        });
      }
    });
  } else {
    document.getElementById("uzmi").addEventListener("click", function () {
      mainFocus.isChecked = !mainFocus.isChecked;
      renderEnteredFocus();
      document
        .getElementById("ajde-ovo")
        .addEventListener("click", function () {
          console.log("first");
          document.getElementById("dots-id").style.display = "flex";
        });
      render();
    });
  }
}

function renderEnteredFocus() {
  focusEl.innerHTML = `
  <p class="focus-question">Today's focus</p>
  <div class='added-focus-wrapper'>
  ${
    mainFocus.isChecked
      ? '<i id="uzmi" class="fa-solid fa-square-check fa-2xl checkbox"></i>'
      : '<i id="uzmi" class="fa-regular fa-square fa-2xl checkbox"></i>'
  }  
    <p class='focus-question checkbox-label ${
      mainFocus.isChecked ? "crossed" : ""
    }'>${mainFocus.text}</p>
    <span id='ajde-ovo' class='dots'>&#183;&#183;&#183;</span>
  </div>
  `;
}
function deleteFocusTask() {
  mainFocus.text = "";
}
//<i class="fa-solid fa-square-check"></i>

render();
