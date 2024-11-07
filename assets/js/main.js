// search trips


const searchBar = document.querySelector(".search-bar");
const searchResults = document.querySelector(".search-results");
const overlay = document.querySelector(".overlay");
const popupModal = document.querySelector(".popup-modal");
const popupMessage = document.getElementById("popup-message");

const cities = [
  {
    name: "Santo Domingo",
    details: "National District, Dominican Republic",
  },
  { name: "Santiago", details: "Santiago Province, Dominican Republic" },
  {
    name: "Punta Cana",
    details: "La Altagracia Province, Dominican Republic",
  },
  {
    name: "La Romana",
    details: "La Romana Province, Dominican Republic",
  },
  {
    name: "Puerto Plata",
    details: "Puerto Plata Province, Dominican Republic",
  },
  { name: "Jarabacoa", details: "La Vega Province, Dominican Republic" },
];

searchBar.addEventListener("focus", () => {
  searchResults.style.display = "block";
  searchBar.classList.add("active");
  overlay.style.display = "flex"; // Show the search overlay
});

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  searchResults.innerHTML = "";

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(query)
  );

  filteredCities.forEach((city) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-map-marker-alt", "location-icon");

    const locationInfo = document.createElement("div");
    locationInfo.classList.add("location-info");

    const locationName = document.createElement("div");
    locationName.classList.add("location-name");
    locationName.textContent = city.name;

    const locationDetails = document.createElement("div");
    locationDetails.classList.add("location-details");
    locationDetails.textContent = city.details;

    locationInfo.appendChild(locationName);
    locationInfo.appendChild(locationDetails);
    resultItem.appendChild(icon);
    resultItem.appendChild(locationInfo);
    searchResults.appendChild(resultItem);

    resultItem.addEventListener("click", () => {
      searchResults.style.display = "none"; // Hide search results
      overlay.style.display = "none"; // Hide the search overlay
      showPopup(city.name);
    });
  });

  if (filteredCities.length === 0) {
    searchResults.innerHTML =
      '<p style="padding: 10px;">No results found</p>';
  }
});

document.querySelectorAll(".destination").forEach((destination) => {
  destination.addEventListener("click", () => {
    const location = destination.getAttribute("data-location");
    searchResults.style.display = "none"; // Hide search results
    overlay.style.display = "none"; // Hide the search overlay
    showPopup(location);
  });
});

function showPopup(location) {
  popupMessage.textContent = `You are going to ${location} 😎`;
  overlay.style.display = "block"; // Show the overlay for the popup
  popupModal.style.display = "block"; // Show the popup modal

  saveUserData({
    place: location,
  });
  setTimeout(() => {
    overlay.style.display = "none"; // Hide the overlay after animation
    popupModal.style.display = "none"; // Hide the popup modal
    window.location.href = "choose-date.html"; // Redirect after delay
  }, 3000);
}

overlay.addEventListener("click", () => {
  searchResults.style.display = "none";
  searchBar.classList.remove("active");
  overlay.style.display = "none"; // Hide the overlay
  popupModal.style.display = "none"; // Hide the popup modal
});



document.addEventListener("DOMContentLoaded", function () {
  updateProgress(1); // Set progress to 1st step (14.28%)
});

function updateProgress(step) {
  const progressBar = document.querySelector(".progress");
  const totalSteps = 7; // Total steps is 7
  const progressPercentage = (step / totalSteps) * 100;
  progressBar.style.width = progressPercentage + "%";
}












// choose date:

const exactDates = document.getElementById("exact-dates");
const monthSelect = document.getElementById("month-select");
const calendar1 = document.getElementById("calendar-1");
const calendar2 = document.getElementById("calendar-2");
const currentMonth1 = document.getElementById("current-month-1");
const currentMonth2 = document.getElementById("current-month-2");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const dateRangeInfo = document.getElementById("date-range-info");
const monthButtons = document.getElementById("month-buttons");
const tripLengthValue = document.getElementById("trip-length-value");
const decreaseDaysButton = document.getElementById("decrease-days");
const increaseDaysButton = document.getElementById("increase-days");
const monthSelectionInfo = document.getElementById(
  "month-selection-info"
);
const toggleToMonth = document.getElementById("toggle-to-month");
const toggleToCalendar = document.getElementById("toggle-to-calendar");

let currentDate = new Date();
let selectedStartDate = null;
let selectedEndDate = null;
let selectedMonth = null;
let tripLength = 7;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendars() {
  renderCalendar(calendar1, currentDate);
  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  renderCalendar(calendar2, nextMonth);
  currentMonth1.textContent = `${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
  currentMonth2.textContent = `${
    months[nextMonth.getMonth()]
  } ${nextMonth.getFullYear()}`;
}

function renderCalendar(calendar, date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const dayName = new Date(2023, 0, i + 1).toLocaleString("default", {
      weekday: "short",
    });
    const dayElement = document.createElement("div");
    dayElement.textContent = dayName;
    dayElement.classList.add("calendar-day");
    calendar.appendChild(dayElement);
  }

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    calendar.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add("calendar-day");

    const currentDayDate = new Date(year, month, day);
    if (isDateInRange(currentDayDate)) {
      dayElement.classList.add("in-range");
    }
    if (
      isSameDate(currentDayDate, selectedStartDate) ||
      isSameDate(currentDayDate, selectedEndDate)
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () =>
      handleDateClick(currentDayDate)
    );
    calendar.appendChild(dayElement);
  }
}

function handleDateClick(date) {
  if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
    selectedStartDate = date;
    selectedEndDate = null;
  } else {
    if (date > selectedStartDate) {
      const dayDifference = Math.ceil(
        (date - selectedStartDate) / (1000 * 60 * 60 * 24)
      );
      if (dayDifference <= 30) {
        selectedEndDate = date;
      } else {
        selectedEndDate = new Date(
          selectedStartDate.getTime() + 30 * 24 * 60 * 60 * 1000
        );
      }
    } else {
      selectedStartDate = date;
      selectedEndDate = null;
    }
  }
  renderCalendars();
  updateDateRangeInfo();
}

function isDateInRange(date) {
  return (
    selectedStartDate &&
    selectedEndDate &&
    date >= selectedStartDate &&
    date <= selectedEndDate
  );
}

function isSameDate(date1, date2) {
  return date1 && date2 && date1.toDateString() === date2.toDateString();
}

function updateDateRangeInfo() {
  if (selectedStartDate && selectedEndDate) {
    dateRangeInfo.textContent = `Selected dates: ${formatDate(
      selectedStartDate
    )} - ${formatDate(selectedEndDate)}`;
    const formattedStartDate = formatDate(selectedStartDate);
    const formattedEndDate = formatDate(selectedEndDate);

    appendToUserData({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    appendToUserData({
      month: null,
      days: null,
    });

  } else if (selectedStartDate) {
    dateRangeInfo.textContent = `Start date: ${formatDate(
      selectedStartDate
    )}`;
  } else {
    dateRangeInfo.textContent = "";
  }
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendars();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendars();
});

function renderMonthButtons() {
  monthButtons.innerHTML = "";
  months.forEach((month, index) => {
    const button = document.createElement("button");
    button.textContent = month;
    button.classList.add("month-button");
    if (index === selectedMonth) {
      button.classList.add("selected");
    }
    button.addEventListener("click", () => {
      selectedMonth = index;
      renderMonthButtons();
      updateMonthSelectionInfo();
    });
    monthButtons.appendChild(button);
  });
}

decreaseDaysButton.addEventListener("click", () => {
  if (tripLength > 1) {
    tripLength--;
    tripLengthValue.textContent = tripLength;
    updateMonthSelectionInfo();
  }
});

increaseDaysButton.addEventListener("click", () => {
  if (tripLength < 30) {
    tripLength++;
    tripLengthValue.textContent = tripLength;
    updateMonthSelectionInfo();
  }
});

function updateMonthSelectionInfo() {
  if (selectedMonth !== null) {
    monthSelectionInfo.textContent = `Selected: ${months[selectedMonth]}, ${tripLength} days`;

    appendToUserData({
      startDate: null,
      endDate: null,
    });

    appendToUserData({
      month: months[selectedMonth],
      days: tripLength,
    });
  } else {
    monthSelectionInfo.textContent = "Select a month and trip length";
  }
}

toggleToMonth.addEventListener("click", (e) => {
  e.preventDefault();
  exactDates.style.display = "none";
  monthSelect.style.display = "block";
  renderMonthButtons();
  updateMonthSelectionInfo();
});

toggleToCalendar.addEventListener("click", (e) => {
  e.preventDefault();
  monthSelect.style.display = "none";
  exactDates.style.display = "block";
  renderCalendars();
  updateDateRangeInfo();
});

renderCalendars();
updateDateRangeInfo();



document.addEventListener("DOMContentLoaded", function () {
  updateProgress(2); // Set progress to 2nd step (28.56%)
});

function updateProgress(step) {
  const progressBar = document.querySelector(".progress");
  const totalSteps = 7;
  const progressPercentage = (step / totalSteps) * 100;
  progressBar.style.width = progressPercentage + "%";
}





// trip type:

document.addEventListener("DOMContentLoaded", function () {
  const tripTypes = document.querySelectorAll(".trip-type");
  const childrenQuestion = document.querySelector(".children-question");
  const peopleQuestion = document.querySelector(".people-question");

  tripTypes.forEach((button) => {
    button.addEventListener("click", function () {
      const tripType = this.getAttribute("data-type");

      // Show "Are you traveling with children?" for family and friends
      if (tripType === "family" || tripType === "friends") {
        childrenQuestion.style.display = "block";
        peopleQuestion.style.display = "block"; // Show people question
      } else {
        childrenQuestion.style.display = "none";
        peopleQuestion.style.display = "none"; // Hide people question for other trips
      }
      appendToUserData({
        tripType: tripType.toUpperCase(),
      });
    });
  });

  const peopleInput = document.getElementById("peopleInput");

  // peopleInput.addEventListener("change", function (e) {
  //   appendToUserData({
  //     totalPeopleTravellingWith: e.target.value || null,
  //   });
  // });

  peopleInput.addEventListener("input", function () {
    appendToUserData({
      totalPeopleTravellingWith: parseInt(this.value),
    });
  });

  const childrenYesButton = document.getElementById("childrenYesButton");
  const childrenNoButton = document.getElementById("childrenNoButton");

  childrenYesButton.addEventListener("click", function () {
    appendToUserData({
      travellingWithChildren: "yes",
    });
  });

  childrenNoButton.addEventListener("click", function () {
    appendToUserData({
      travellingWithChildren: "no",
    });
  });

  const petYesButton = document.getElementById("petYesButton");
  const petNoButton = document.getElementById("petNoButton");

  petYesButton.addEventListener("click", function () {
    appendToUserData({
      travellingWithPets: "yes",
    });
  });

  petNoButton.addEventListener("click", function () {
    appendToUserData({
      travellingWithPets: "no",
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // Select elements for Solo Trip and Pets (No)
  const soloTripButton = document.querySelector(
    ".trip-type[data-type='solo']"
  );
  const petsNoButton = document.querySelector(
    ".pets-option[data-pets='no']"
  );

  // Function to set the default selection
  function setDefaultSelections() {
    // Set Solo Trip as selected
    if (soloTripButton) {
      soloTripButton.classList.add("selected");
    }

    // Set Pets (No) as selected
    if (petsNoButton) {
      petsNoButton.classList.add("selected");
    }
  }

  // Run the function on page load
  setDefaultSelections();
});




// location rating
// location rating
const accommodationTypes = document.querySelectorAll(
  ".accommodation-type"
);
const followUpQuestion = document.querySelector(".follow-up-question");
const followUpText = document.getElementById("follow-up-text");
const followUpOptions = document.querySelectorAll(".follow-up-option");
let selectedAccomodationType = null;

function selectOption(options, selectedOption) {
  options.forEach((option) => {
    option.classList.remove("selected");
  });
  selectedOption.classList.add("selected");
}

accommodationTypes.forEach((type) => {
  type.addEventListener("click", () => {
    selectOption(accommodationTypes, type);
    const accommodationType = type.getAttribute("data-type");
    followUpQuestion.style.display = "block";

    if (accommodationType === "all-inclusive") {
      appendToUserData({
        accomodationType: "ALL_INCLUSIVE",
      });
      selectedAccomodationType = "ALL_INCLUSIVE";
      followUpText.textContent = "How many stars?";
    } else if (accommodationType === "airbnb") {
      appendToUserData({
        accomodationType: "AIRBNB",
      });
      followUpText.textContent = "How many bedrooms?";
      selectedAccomodationType = "AIRBNB";
    }
  });
});

followUpOptions.forEach((option) => {
  option.addEventListener("click", () => {
    console.log(option.getAttribute("data-value"));
    const selectedRatingOrBedrooms = parseInt(
      option.getAttribute("data-value")
    );

    if (selectedAccomodationType === "ALL_INCLUSIVE") {
      appendToUserData({
        accomodationRating: selectedRatingOrBedrooms,
        totalBedrooms: null,
      });
    } else if (selectedAccomodationType === "AIRBNB") {
      appendToUserData({
        accomodationRating: null,
        totalBedrooms: selectedRatingOrBedrooms,
      });
    }
    selectOption(followUpOptions, option);
  });
});

document.querySelector(".close-button").addEventListener("click", () => {
  console.log("Close button clicked");
});

document.addEventListener("DOMContentLoaded", function () {
  updateProgress(4); // Set progress to 4th step (57.12%)
});


document.addEventListener("DOMContentLoaded", function () {
  // Default selections
  const allInclusiveButton = document.querySelector(
    ".accommodation-type[data-type='all-inclusive']"
  );
  const followUpOptionOne = document.querySelector(
    ".follow-up-option[data-value='1']"
  );
  const followUpQuestion = document.querySelector(".follow-up-question");
  const followUpText = document.getElementById("follow-up-text");

  // Select All-Inclusive by default
  if (allInclusiveButton) {
    allInclusiveButton.classList.add("selected");
    followUpQuestion.style.display = "block";
    followUpText.textContent = "How many stars?";
    selectedAccomodationType = "ALL_INCLUSIVE";

    // Set user data to All-Inclusive
    appendToUserData({
      accomodationType: "ALL_INCLUSIVE",
    });
  }

  // Set follow-up option to 1 by default
  if (followUpOptionOne) {
    followUpOptionOne.classList.add("selected");

    // Set user data to 1-star rating for All-Inclusive
    appendToUserData({
      accomodationRating: 1,
      totalBedrooms: null,
    });
  }
});





// add interest
const interests = [
  "Great Food",
  "Beach Time",
  "Nightlife and Entertainment",
  "Golfing",
  "Adventure Activities",
  "Wildlife",
  "Cultural Experiences (Language, dancing, cooking with a local, etc)",
  "Excursions & Day Trips",
  "Spa and Wellness",
  "Water Sports",
  "Shopping",
  "Multi-City visits",
];

const interestsContainer = document.getElementById("interestsContainer");
const modal = document.getElementById("addInterestModal");
const closeModal = document.getElementsByClassName("close")[0];
const newInterestInput = document.getElementById("newInterest");
const addNewInterestButton = document.getElementById("addNewInterest");

function createInterestElement(interest) {
  const div = document.createElement("div");
  div.className = "interest";
  div.textContent = interest;
  div.onclick = () => {
    div.classList.toggle("selected");
    appendToUserData({
      interests: Array.from(
        document.querySelectorAll(".interest.selected")
      ).map((el) => el.textContent),
    });
  };
  return div;
}

interests.forEach((interest) => {
  interestsContainer.appendChild(createInterestElement(interest));
});

// Add the "Add interest" button
const addInterestButton = createInterestElement("+ Add interest");
addInterestButton.classList.add("add-interest");
addInterestButton.onclick = () => (modal.style.display = "block");
interestsContainer.appendChild(addInterestButton);

closeModal.onclick = () => (modal.style.display = "none");

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

addNewInterestButton.onclick = () => {
  const newInterest = newInterestInput.value.trim();
  if (newInterest) {
    interestsContainer.insertBefore(
      createInterestElement(newInterest),
      addInterestButton
    );
    newInterestInput.value = "";
    modal.style.display = "none";
  }
};

document.querySelector(".nav-buttons button:last-child").onclick = () => {
  const selectedInterests = Array.from(
    document.querySelectorAll(".interest.selected")
  ).map((el) => el.textContent);
  console.log("Selected interests:", selectedInterests);
  // Here you would typically send this data to your backend or move to the next step
};



document.addEventListener("DOMContentLoaded", function () {
  updateProgress(6); // Set progress to 5th step (71.4%)
});

function updateProgress(step) {
  const progressBar = document.querySelector(".progress");
  const totalSteps = 7;
  const progressPercentage = (step / totalSteps) * 100;
  progressBar.style.width = progressPercentage + "%";
}






