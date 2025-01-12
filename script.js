let display = document.getElementById("display");
let memory = 0;
let currentInput = "";
let operator = "";
let previousInput = "";
let currentBase = "dec";

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) {
    return; // Prevent multiple periods
  }

  if (currentInput.length < 15) {
    // Limit input length
    currentInput += number;
    updateDisplay();
  }
}

function appendOperator(op) {
  if (currentInput === "" && op === "-") {
    // Allow negative number input
    currentInput = "-";
    updateDisplay();
    return;
  }

  if (currentInput === "") return; // Prevent operator if no input

  if (operator !== "") {
    calculateResult(); // Calculate if there's a previous operator
  }

  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculateResult() {
  if (currentInput === "" || previousInput === "") return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero");
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  currentBase = "dec"; // Reset base memory to decimal
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculatePercentage() {
  if (currentInput === "") return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

function memoryStore() {
  if (currentInput !== "") {
    memory = parseFloat(currentInput);
    clearDisplay();
  }
}

function memoryRecall() {
  currentInput = memory.toString();
  updateDisplay();
}

function memoryAdd() {
  if (currentInput !== "") {
    memory += parseFloat(currentInput);
    clearDisplay();
  }
}

function memorySubtract() {
  if (currentInput !== "") {
    memory -= parseFloat(currentInput);
    clearDisplay();
  }
}

function memoryClear() {
  memory = 0;
}

function updateDisplay() {
  display.value = currentInput || "0";
}

// Function to handle base conversion (bit, dec, hex, octa)
function convertBase(base) {
  const inputNumber = currentInput;

  // Ensure there's a number to convert
  if (inputNumber === "" || isNaN(inputNumber)) {
    alert("Please enter a valid number");
    return;
  }

  let result = "";
  let number = parseFloat(inputNumber); // Convert to a number

  if (currentBase !== "dec") {
    number = convertToDecimal(number, currentBase);
  }

  // Convert the number to the desired base
  switch (base) {
    case "bit":
      result = number.toString(2);
      break;
    case "dec":
      result = number.toString(10);
      break;
    case "hex":
      result = number.toString(16).toUpperCase();
      break;
    case "octa":
      result = number.toString(8);
      break;
    default:
      result = "Invalid conversion base";
  }

  currentBase = base;

  currentInput = result;
  updateDisplay();
}

function convertToDecimal(value, base) {
  switch (base) {
    case "bit":
      return parseInt(value, 2);
    case "hex":
      return parseInt(value, 16);
    case "octa":
      return parseInt(value, 8);
    default:
      return value;
  }
}

function toggleNegative() {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "c" || key === "C") {
    clearDisplay();
  }
});
