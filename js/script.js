let allInputs = document.querySelectorAll("input");
let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
let birthdayDiv = document.querySelector(".birthday");
let yearsHeading = document.querySelector("#years span")
let monthsHeading = document.querySelector("#months span")
let daysHeading = document.querySelector("#days span");
let submit = document.getElementById("submit");
// ====================== Errors ====================== //
let error = document.querySelectorAll(".error");
let dayError = document.querySelector(".day-error");
let monthError = document.querySelector(".month-error");
let yearError = document.querySelector(".year-error");

let dateNow = new Date();
yearInput.setAttribute("max", `${dateNow.getFullYear()}`);

// ====================== Age Calculator ====================== //

function ageCalc() {
  let dayValue = parseInt(dayInput.value);
  let monthValue = parseInt(monthInput.value);
  let yearValue = parseInt(yearInput.value);

  let birthday = new Date(`${yearValue}-${monthValue}-${dayValue}`);

  let years = dateNow.getFullYear() - birthday.getFullYear();
  let months = dateNow.getMonth() - birthday.getMonth();
  let days = dateNow.getDate() - birthday.getDate() < 0 ? 0 : dateNow.getDate() - birthday.getDate();

  yearsHeading.innerHTML = parseInt(years);
  monthsHeading.innerHTML = parseInt(months);
  daysHeading.innerHTML = parseInt(days);
}

// ====================== Day Test ====================== //
function validateDay() {
  let dayValue = parseInt(dayInput.value);
  let monthValue = parseInt(monthInput.value);

  if (dayInput.value !== "") {
    if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
      errorsStyling(dayInput, dayError, "red", "block", "Day must be between 1 and 31");
    } else if (monthValue === 2 && dayValue > 29) { // Check for February
      errorsStyling(dayInput, dayError, "red", "block", "February has a maximum of 29 days");
    } else if ([4, 6, 9, 11].includes(monthValue) && dayValue > 30) { // The Months Containing 30 day
      errorsStyling(dayInput, dayError, "red", "block", "This month has only 30 days");
    } else {
      errorsStyling(dayInput, dayError, "#ccc", "none");
    }
  } else {
    errorsStyling(dayInput, dayError, "red", "block", "Mandatory!");
  }
}

// ====================== Month Test ====================== //

function validateMonth() {
  let month = parseInt(monthInput.value);

  if (monthInput.value !== "") {
    if (isNaN(month) || month < 1 || month > 12) {
      errorsStyling(monthInput, monthError, "red", "block", "The month must be between 1, 12");
    } else {
      errorsStyling(monthInput, monthError, "#ccc", "none");
    }
  } else {
    errorsStyling(monthInput, monthError, "red", "block", "Mandatory!");
  }
}

// ====================== Year Test ====================== //

function validateYear() {
  let yearNow = dateNow.getFullYear();
  let yearValue = yearInput.value;
  let yearMin = yearInput.min || 1900; // 1900

  if (yearValue.length > 4) {
    yearInput.value = yearValue.slice(0, 4);
    return;
  }

  if (yearInput.value !== "") {
    if (yearValue.length !== 4) {
      errorsStyling(yearInput, yearError, "red", "block", "Year must be a 4-digit number");
    } else if (yearValue < yearMin) {
      errorsStyling(yearInput, yearError, "red", "block", `Year must be greater than or equal to ${yearMin}`);
    } else if (yearValue > yearNow) {
      errorsStyling(yearInput, yearError, "red", "block", `Year must be less than or equal to ${yearNow}`);
    } else {
      errorsStyling(yearInput, yearError, "#ccc", "none");
    }
  } else {
    errorsStyling(yearInput, yearError, "red", "block", "Mandatory!");
  }
}

// ======================== Errors Styling  ======================== //

function errorsStyling(inputType, errorType, borderColor, errorDisplay, errorMsg) {
  inputType.style.borderColor = borderColor;
  errorType.style.display = errorDisplay;
  errorType.innerHTML = errorMsg;
};

// ================ Calling Function on From Submit =============== //

submit.addEventListener("click", function (e) {
  e.preventDefault();

  validateDay();
  validateMonth();
  validateYear();

  if (dayInput.value !== "" && monthInput.value !== "" && yearInput.value !== "" &&
    dayError.style.display === "none" &&
    monthError.style.display === "none" &&
    yearError.style.display === "none") {
    ageCalc();
  }
});

dayInput.addEventListener("keyup", validateDay);
monthInput.addEventListener("keyup", validateMonth);
yearInput.addEventListener("keyup", validateYear);
