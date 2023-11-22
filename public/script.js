console.log("Script correctly linked!");

function clearDisplay() {
  document.querySelector('input[name="display"]').value = "";
}

function deleteLastChar() {
  let display = document.querySelector('input[name="display"]');
  display.value = display.value.toString().slice(0, -1);
}

function addToDisplay(value) {
  let display = document.querySelector('input[name="display"]');
  let currentValue = display.value;

  // Check if the last entered character is an operator
  let lastChar = currentValue.charAt(currentValue.length - 1);

  // Allow adding a decimal point after the second negative sign for all operations
  if (
    value === "." &&
    currentValue.includes("-") &&
    !currentValue.includes(".", currentValue.indexOf("-"))
  ) {
    display.value += value;
    return;
  }

  // Rest of the logic to prevent duplicate operators and decimal points
  const operators = ["+", "-", "*", "/"];
  if (
    operators.includes(lastChar) &&
    operators.includes(value) &&
    lastChar !== "-" &&
    value !== "-"
  ) {
    return;
  }

  display.value += value;
}

function calculateResult() {
  let display = document.querySelector('input[name="display"]');
  let expression = display.value;

  // Replace any occurrences of "--" with "+"
  expression = expression.replace(/--/g, "+");

  // Evaluate the expression
  let result;
  try {
    result = eval(expression);
    // Check if the expression involves division with negative numbers
    if (expression.includes("/-")) {
      // Replace "/-" with "/" for proper calculation of negative number division
      result = eval(expression.replace(/\/-/g, "/"));
    }
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}
