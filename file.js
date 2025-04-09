const display = document.getElementById("display");

function displayValue(value) {
    const functions = ["Math.sqrt(", "Math.pow(", "Math.sin(", "Math.cos(", "Math.tan(", "Math.log("];
    if (functions.includes(value)) {
        display.value += value + ")";
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
    } catch (e) {
        display.value = "Error";
    }
}
