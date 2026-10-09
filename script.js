const display = document.getElementById("display");
const buttons = document.querySelectorAll("#main button");

let emptySlots = [];
let c = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    const id = button.id;

    if (id === "clear") {
      display.textContent = "";
      emptySlots = [];
      c = 0;
    } 
    else if (id === "equal") {
      display.textContent = calculating();
    } 
    else {
      display.textContent += value;

      if (["+", "-", "*", "/", "%"].includes(value)) {
        if (
          emptySlots.length === 0 ||
          ["+", "-", "*", "/", "%"].includes(emptySlots[c])
        ) {
          display.textContent = display.textContent.slice(0, -value.length);
          return;
        }

        c++;
        emptySlots[c] = value;
        c++;
      } 
      else {
        if (value === "." && String(emptySlots[c] ?? "").includes(".")) {
          display.textContent = display.textContent.slice(0, -1);
          return;
        }

        emptySlots[c] = String(emptySlots[c] ?? "") + value;
      }
    }
  });
});

function calculating() {
  if (emptySlots.length === 0) return 0;

  let result = Number(emptySlots[0]);

  for (let i = 1; i < emptySlots.length; i += 2) {
    const operator = emptySlots[i];
    const number = Number(emptySlots[i + 1]);

    if (emptySlots[i + 1] === undefined || emptySlots[i + 1] === "") {
      return "Incomplete expression";
    }

    if (operator === "+") result += number;
    else if (operator === "-") result -= number;
    else if (operator === "*") result *= number;
    else if (operator === "/") {
      if (number === 0) return "Cannot divide by zero";
      else
      result /= number;
    }
    else if (operator === "%") {
      if (number === 0) return "Cannot divide by zero";
      result %= number;
    }
  }

  return result;
}