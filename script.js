let expression = "";

// Function to update the display
function press(num) {
    expression += num;
    document.getElementById("display").value = expression;
}

// Function to calculate the result
function calculateResult() {
    try {
        expression = eval(expression).toString();
        document.getElementById("display").value = expression;
    } catch (error) {
        document.getElementById("display").value = "Error";
        expression = "";
    }
}

// Function to clear the display
function clearDisplay() {
    expression = "";
    document.getElementById("display").value = "";
}

// Function to update the current time and date
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("current-date").textContent = formattedDate;
    document.getElementById("current-time").textContent = formattedTime;
}

// Update the time and date every second
setInterval(updateDateTime, 1000);

// Initial call to set the time and date
updateDateTime();

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll(".iphone-container, .calculator-container, button, .currency-converter *").forEach(el => el.classList.toggle("dark-mode"));
}

// Add event listener to the toggle switch
document.getElementById("theme-toggle").addEventListener("change", toggleDarkMode);
// Function to fetch and populate currency options
async function fetchCurrencies() {
    try {
        const response = await fetch("https://api.frankfurter.app/currencies");
        const data = await response.json();
        const fromCurrency = document.getElementById("from-currency");
        const toCurrency = document.getElementById("to-currency");

        for (const [code, name] of Object.entries(data)) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${code} - ${name}`;
            fromCurrency.appendChild(option.cloneNode(true));
            toCurrency.appendChild(option.cloneNode(true));
        }
    } catch (error) {
        console.error("Error fetching currencies:", error);
    }
}

fetchCurrencies();

// Function to convert currency
async function convertCurrency() {
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
        const data = await response.json();

        if (!response.ok || !data.rates) {
            document.getElementById("result").textContent = "Failed to fetch exchange rates.";
            return;
        }

        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        document.getElementById("result").textContent = "An error occurred. Please try again later.";
    }
}