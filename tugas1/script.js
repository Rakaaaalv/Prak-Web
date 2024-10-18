let displayValue = "";

function appendNumber(number) {
  displayValue += number;
  updateDisplay();
}

function appendOperator(operator) {
  displayValue += operator;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function deleteLast() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function toggleSign() {
  if (displayValue === "" || displayValue === "0") {
    return;
  }

  if (displayValue.startsWith("-")) {
    displayValue = displayValue.slice(1);
  } else {
    displayValue = "-" + displayValue;
  }

  updateDisplay();
}

function calculate() {
  try {
    displayValue = eval(displayValue).toString();
  } catch (error) {
    displayValue = "Error";
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").value = displayValue;
}
