function setupDropdown(dropdownId, outputId) {
  const dropdown = document.getElementById(dropdownId);
  const selectedValue = dropdown.querySelector('.selected-value');
  const options = dropdown.querySelectorAll('.dropdown-options div');
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
  const fromCurrency = document.getElementById('from-output').textContent;
  const toCurrency = document.getElementById('to-output').textContent;
  const amount = document.getElementById('amount').value;

  if (amount <= 0) {
    sendRequestButton.disabled = true;
  }
  console.log('i am clicked')

  const apiKey = '252e8a4fdcc2587d2fc6c661'; // Replace with your actual API key
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
  const data = await fetchExchangeRate(apiUrl);
  

  function showPopup() {
    if (data && data.conversion_rate && data.conversion_result){
      const popup = document.getElementById('popup');
      popup.textContent = `Converted Amount: ${data.conversion_result}`;
    }else{
      const popup = document.getElementById('popup');
      popup.textContent = `'Failed to fetch conversion rate.`;
    }
    popup.classList.add('show');
    
    // Remove after 3 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
    }

    
    showPopup();
});
  // Fetch exchange rate
 









    // if (data && data.conversion_rate && data.conversion_result) {
    //   function showPopup() {
    //     const popup = document.getElementById('popup');
    //     popup.textContent = `Converted Amount: ${data.conversion_result}`;
    //     popup.classList.add('show');
        
    //     // Remove after 3 seconds
    //     setTimeout(() => {
    //       popup.classList.remove('show');
    //     }, 3000);
    //     }
    //     console.log(data.conversion_rate)
        
    // } else {
    //   function showPopup() {
    //     const popup = document.getElementById('popup');
    //     popup.textContent = `'Failed to fetch conversion rate.`;
    //     popup.classList.add('show');
        
    //     // Remove after 3 seconds
    //     setTimeout(() => {
    //       popup.classList.remove('show');
    //     }, 3000);
    //     }
    //     console.log(`'Failed to fetch conversion rate.`)
    // }