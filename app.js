function setupDropdown(dropdownId, outputId) {
const dropdown = document.getElementById(dropdownId);
const selectedValue = dropdown.querySelector('.selected-value');
const options = dropdown.querySelectorAll('.currency');
const output = document.getElementById(outputId);

// Toggle dropdown visibility
dropdown.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

// Handle option selection
options.forEach(option => {
  option.addEventListener('click', (e) => {
    const value = e.target.getAttribute('data-value');
    selectedValue.textContent = value; // Update displayed value
    output.textContent = value; // Update output paragraph
    dropdown.classList.remove('open'); // Close the dropdown
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});
}

// Setup "From" and "To" dropdowns
setupDropdown('from-dropdown', 'from-output');
setupDropdown('to-dropdown', 'to-output');

// Fetch data with async/await
async function fetchExchangeRate(apiUrl) {
try {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error fetching API data:', error);
  alert('Error fetching API data. Please try again.');
}
}

// Send Request Button
const sendRequestButton = document.getElementById('send-request');

sendRequestButton.addEventListener('click', async () => {
const fromCurrency = document.getElementById('from-output').textContent.trim();
const toCurrency = document.getElementById('to-output').textContent.trim();
const amount = parseFloat(document.getElementById('amount').value);

if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
  alert('Please enter valid data.');
  return;
}

const apiKey = '252e8a4fdcc2587d2fc6c661'; // Replace with your actual API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
const data = await fetchExchangeRate(apiUrl);

function showPopup() {
  const popup = document.getElementById('popup');
  if (data && data.conversion_result) {
    popup.textContent = `Converted Amount: ${data.conversion_result}`;
  } else {
    popup.textContent = 'Failed to fetch conversion rate.';
  }
  popup.classList.add('show');

  // Remove after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 7000);
}

showPopup();
});

// Search currencies for "From" dropdown
function searchCurrencies() {
const searchInput = document.querySelector('#searchInputfrom').value.toLowerCase();
const currencies = document.getElementsByClassName('currency');

for (let i = 0; i < currencies.length; i++) {
  const countryName = currencies[i].getElementsByClassName('cnname')[0].textContent.toLowerCase();
  const currencyCode = currencies[i].dataset.value.toLowerCase();

  if (countryName.includes(searchInput) || currencyCode.includes(searchInput)) {
    currencies[i].style.display = 'block';
  } else {
    currencies[i].style.display = 'none';
  }
}
}

// Search currencies for "To" dropdown
function searchCurrenciesto() {
const searchInput2 = document.querySelector('#searchInputto').value.toLowerCase();
const currencies = document.getElementsByClassName('currency');

for (let i = 0; i < currencies.length; i++) {
  const countryName = currencies[i].getElementsByClassName('cnname')[0].textContent.toLowerCase();
  const currencyCode = currencies[i].dataset.value.toLowerCase();

  if (countryName.includes(searchInput2) || currencyCode.includes(searchInput2)) {
    currencies[i].style.display = 'block';
  } else {
    currencies[i].style.display = 'none';
  }
}
}

// Add event listeners for search inputs
document.querySelectorAll('.searchInput').forEach((input) => {
input.addEventListener('click', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach((dropdown) => {
    dropdown.classList.toggle('open');
  });
});
});

