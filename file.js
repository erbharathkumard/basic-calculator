
    const display = document.getElementById("display");
    const historyList = document.getElementById("historyList");
    const clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

    document.addEventListener("keydown", (e) => {
      if (e.key >= 0 && e.key <= 9 || "+-*/.".includes(e.key)) {
        displayValue(e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        deleteLast();
      }
    });

    function displayValue(val) {
      clickSound.play();
      display.value += val;
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
        if (!isNaN(result)) {
          addToHistory(`${display.value} = ${result}`);
          display.value = result;
        } else {
          display.value = "Error";
        }
        clickSound.play();
      } catch {
        display.value = "Error";
      }
    }

    function copyToClipboard() {
      navigator.clipboard.writeText(display.value);
      alert("Copied to clipboard!");
    }

    function addToHistory(entry) {
      const li = document.createElement("li");
      li.textContent = entry;
      historyList.appendChild(li);
      saveHistoryToLocalStorage();
    }

    function saveHistoryToLocalStorage() {
      const historyItems = [];
      historyList.querySelectorAll("li").forEach(li => historyItems.push(li.textContent));
      localStorage.setItem("calcHistory", JSON.stringify(historyItems));
    }

    function loadHistoryFromLocalStorage() {
      const saved = JSON.parse(localStorage.getItem("calcHistory"));
      if (saved) {
        saved.forEach(entry => {
          const li = document.createElement("li");
          li.textContent = entry;
          historyList.appendChild(li);
        });
      }
    }

    function clearHistory() {
      historyList.innerHTML = "";
      localStorage.removeItem("calcHistory");
    }

    function toggleTheme() {
      document.body.classList.toggle("light-mode");
    }

    
    loadHistoryFromLocalStorage();
  