let cryptoChart;

function fetchData() {
    const cryptoName = document.getElementById('cryptoInput').value.trim().toLowerCase();

    if (cryptoName === '') {
        alert('Please enter a cryptocurrency name.');
        return;
    }

    fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=7&interval=daily`)
        .then(response => response.json())
        .then(data => {
            const prices = data.prices.map(price => ({x: new Date(price[0]), y: price[1]}));
            displayPrice(prices[prices.length - 1].y);
            displayChart(prices);
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

function displayChart(prices) {
    if (cryptoChart) {
        cryptoChart.destroy();
    }

    const ctx = document.getElementById('cryptoChart').getContext('2d');
    cryptoChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Price',
                data: prices,
                borderColor: 'blue',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    ticks: {
                        source: 'auto'
                    }
                }],
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }]
            }
        }
    });
}
