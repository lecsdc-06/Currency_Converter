const amountInput = document.getElementById("amount");

const fromCurrency = document.getElementById("fromCurrency");

const toCurrency = document.getElementById("toCurrency");

const convertButton = document.getElementById("convertButton");

const result = document.getElementById("result");

const rateDisplay = document.getElementById("rate");

const status = document.getElementById("status");

convertButton.addEventListener("click", convertCurrency);

async function loadCurrencies() {

    try {

        const response =
            await fetch("https://api.frankfurter.dev/v2/currencies");

        if (!response.ok) {
            throw new Error("Unable to load currencies.");
        }

        const currencies =
            await response.json();

        currencies.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        currencies.forEach(currency => {

            const fromOption =
                document.createElement("option");

            fromOption.value =
                currency.iso_code;

            fromOption.textContent =
                `${currency.iso_code} - ${currency.name}`;

            fromCurrency.appendChild(fromOption);


            const toOption =
                document.createElement("option");

            toOption.value =
                currency.iso_code;

            toOption.textContent =
                `${currency.iso_code} - ${currency.name}`;

            toCurrency.appendChild(toOption);

        });

        fromCurrency.value = "PHP";

        toCurrency.value = "USD";

    } catch (error) {

        status.textContent =
            "Unable to load currencies.";

        console.error(error);

    }
}

async function convertCurrency() {

    const amount = Number(amountInput.value);

    const from = fromCurrency.value;

    const to = toCurrency.value;

  const url = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;

const response = await fetch(url);

const data = await response.json();

console.log(data.rate);

const convertedAmount = amount * data.rate;

result.textContent =
    `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

    rateDisplay.textContent =
    `1 ${from} = ${data.rate} ${to}`;
}

loadCurrencies();