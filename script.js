function fetchPrice() {
    const cryptoName = document.getElementById('cryptoInput').value.trim().toLowerCase();

    if (cryptoName === '') {
        alert('Please enter a cryptocurrency name.');
        return;
    }

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
            const price = data[cryptoName].usd;
            displayPrice(price);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        });
}

function displayPrice(price) {
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.innerHTML = `<p>Current Price: $${price}</p>`;
}
