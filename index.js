// let myId = "G0ve1Hyax8ED9RKJoT4rLeic6e3nnRK7csVDg9QtnFQ";
const defaultAuthor = "Marek Piwnicki";
const defaultQoute = "Today is the tomorrow you worried about yesterday.";
const scrimbaApi =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
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

let focusData = { input: "", isChecked: false, areDotsClicked: false };

function render() {
  if (focusData.input === "") {
    displayFocusWithInput();
    focusEl.addEventListener("keypress", function (e) {
      if (document.getElementById("focus-input")) {
        focusData.input = document.getElementById("focus-input").value;
      }
      if (e.key === "Enter" && focusData.input !== "") {
        displayFocusWithInputValue();
        hadnleCheckboxClick();
        handleDotsClick();
        // localStorage.setItem("focusData", JSON.stringify(focusData));
      }
    });
  } else {
    displayFocusWithInputValue();
    hadnleCheckboxClick();
    handleDotsClick();
  }
}

function displayFocusWithInput() {
  focusEl.innerHTML = `
    <p class="focus-question">What is your main focus on today?</p>
    <input class="focus-input" type="text" id='focus-input' autocomplete='off'/>
    `;
}

function displayFocusWithInputValue() {
  focusEl.innerHTML = `
  <p class="focus-question">Today's focus</p>
  <div class='added-focus-wrapper'>
  ${
    focusData.isChecked
      ? '<i id="uzmi" class="fa-solid fa-square-check fa-2xl checkbox"></i>'
      : '<i id="uzmi" class="fa-regular fa-square fa-2xl checkbox"></i>'
  }  
    <p class='focus-question checkbox-label ${
      focusData.isChecked ? "crossed" : ""
    }'>${focusData.input}</p>
    <span id='dots' class='dots'>&#183;&#183;&#183;</span>
  </div>
  `;
}

function hadnleCheckboxClick() {
  document.getElementById("uzmi").addEventListener("click", function () {
    focusData.isChecked = !focusData.isChecked;
    render();
  });
}

function handleDotsClick() {
  const dotsSpanEl = document.getElementById("dots");
  const dotsEl = document.getElementById("dots-id");
  dotsSpanEl.addEventListener("click", function () {
    focusData.areDotsClicked = !focusData.areDotsClicked;
    if (focusData.areDotsClicked) {
      dotsEl.style.display = "flex";
      if (focusData.isChecked) {
        dotsEl.innerHTML = `
              <div id='clear-btn-checkbox-clicked' class="dots-option">
                <i class="fa-solid fa-x"></i>
                <p>Clear</p>
              </div>
              <div id='new-btn' class="dots-option">
                <i class="fa-solid fa-plus"></i>
                <p>New</p>
              </div>
      `;
      } else {
        dotsEl.innerHTML = `
              <div id='edit-btn' class="dots-option">
                <i class="fa-solid fa-pen"></i>
                <p>Edit</p>
              </div>
              <div id='clear-btn-checkbox-not-clicked' class="dots-option">
                <i class="fa-solid fa-x"></i>
                <p>Clear</p>
              </div>
        `;
      }
      dotsEl.addEventListener("click", test);
    } else {
      dotsEl.style.display = "none";
    }
  });
}

render();

function test(e) {
  if (e.target.id === "edit-btn" || e.target.parentElement.id === "edit-btn") {
    displayFocusWithInput();
    document.getElementById("focus-input").value = focusData.input;
    document.getElementById("focus-input").focus();
    document.getElementById("dots-id").style.display = "none";
  } else if (
    e.target.id === "clear-btn-checkbox-not-clicked" ||
    e.target.parentElement.id === "clear-btn-checkbox-not-clicked" ||
    e.target.id === "clear-btn-checkbox-clicked" ||
    e.target.parentElement.id === "clear-btn-checkbox-clicked" ||
    e.target.id === "new-btn" ||
    e.target.parentElement.id === "new-btn"
  ) {
    focusData.input = "";
    focusData.isChecked = false;
    focusData.areDotsClicked = false;
    document.getElementById("dots-id").style.display = "none";
    render();
    document.getElementById("focus-input").focus();
  }
}
