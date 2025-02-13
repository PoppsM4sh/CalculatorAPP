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

// Function to convert USD to ZAR
async function convertCurrency() {
    // Get the amount to convert
    const amount = parseFloat(document.getElementById("amount").value);

    // Validate input
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").textContent = "Please enter a valid amount.";
        return;
    }

    try {
        // Fetch exchange rates using USD as the base currency
        const response = await fetch(`https://api.frankfurter.app/latest?from=USD`);
        const data = await response.json();

        // Check if the API request was successful
        if (!response.ok || !data.rates) {
            document.getElementById("result").textContent = "Failed to fetch exchange rates.";
            return;
        }

        // Extract the exchange rate for ZAR
        const rate = data.rates.ZAR;

        // Handle unsupported currencies
        if (rate === undefined) {
            document.getElementById("result").textContent = `Conversion from USD to ZAR is not supported.`;
            return;
        }

        // Perform the conversion
        const convertedAmount = (amount * rate).toFixed(2);

        // Display the result
        document.getElementById("result").textContent = `${amount} USD = ${convertedAmount} ZAR`;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        document.getElementById("result").textContent = "An error occurred. Please try again later.";
    }
}