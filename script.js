const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Load currencies from API
async function loadCurrencies() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  // Fill both dropdowns
  currencies.forEach(code => {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = code;
    fromCurrency.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = code;
    toCurrency.appendChild(option2);
  });

  // Default values
  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
}

// Convert currency
async function convertCurrency() {
  let amount = document.getElementById("amount").value;
  let from = fromCurrency.value;
  let to = toCurrency.value;

  if (amount === "" || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await res.json();

  if (data.result === "success") {
    let rate = data.rates[to];
    let converted = (amount * rate).toFixed(2);
    result.textContent = `${amount} ${from} = ${converted} ${to}`;
  } else {
    result.textContent = "Error fetching data. Try again later.";
  }
}

// Load currency list when page opens
loadCurrencies();
