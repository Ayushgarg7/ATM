function clearAllInputs() {
  // Selects all input fields on the page and clears them for security
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
}

function simulateProcessing(buttonText, callback) {
  // Optional: Could add button state changes here in the future
  // For now, we execute immediately but clear inputs on success
  callback();
}

function createAccount() {
  const name = document.getElementById("name").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const pin = document.getElementById("pin").value;
  const initialBalance = parseFloat(
    document.getElementById("initialBalance").value
  );

  if (!isValidAccountNumber(accountNumber)) {
    showPopup("Error: Account Number must be a unique 4 to 6 digit number.");
    return;
  }

  if (!isValidPIN(pin)) {
    showPopup("Error: PIN must be a unique 4 to 6 digit number.");
    return;
  }

  const existingAccount = localStorage.getItem(accountNumber);
  if (existingAccount) {
    showPopup("Error: An account with this UID already exists.");
    return;
  }

  const account = {
    name,
    accountNumber,
    pin,
    balance: initialBalance || 0,
  };

  localStorage.setItem(account.accountNumber, JSON.stringify(account));

  document.getElementById("output").textContent = "Account created successfully.";
  clearAllInputs(); // Clear for security
  showPopup("SUCCESS: Account created securely.");
}

function deleteAccount() {
  const accountNumber = document.getElementById("deleteAccountNumber").value;
  
  if(!localStorage.getItem(accountNumber)) {
    showPopup("Error: Account not found.");
    return;
  }

  localStorage.removeItem(accountNumber);
  document.getElementById("output").textContent = "Account deleted successfully.";
  clearAllInputs();
  showPopup("SUCCESS: Account terminated successfully.");
}

function deposit() {
  const accountNumber = document.getElementById("depositAccountNumber").value;
  const pin = document.getElementById("depositPIN").value;
  const amount = parseFloat(document.getElementById("depositAmount").value);

  if (isNaN(amount) || amount <= 0) {
    showPopup("Error: Please enter a valid deposit amount.");
    return;
  }

  const accountData = localStorage.getItem(accountNumber);

  if (accountData) {
    const account = JSON.parse(accountData);

    if (account.pin === pin) {
      account.balance += amount;
      localStorage.setItem(account.accountNumber, JSON.stringify(account));
      document.getElementById(
        "output"
      ).textContent = `Amount deposited successfully. Current Balance: $${account.balance}`;
      
      clearAllInputs();
      showPopup(
        `SUCCESS: Funds Deposited.\n\nNew Balance: $${account.balance.toFixed(2)}`
      );
    } else {
      document.getElementById("output").textContent = "Invalid PIN.";
      showPopup("SECURITY ALERT: Invalid PIN entered.");
    }
  } else {
    document.getElementById("output").textContent = "Account not found.";
    showPopup("Error: Account not found in database.");
  }
}

function withdraw() {
  const accountNumber = document.getElementById("withdrawAccountNumber").value;
  const pin = document.getElementById("withdrawPIN").value;
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  if (isNaN(amount) || amount <= 0) {
    showPopup("Error: Please enter a valid withdrawal amount.");
    return;
  }

  const accountData = localStorage.getItem(accountNumber);

  if (accountData) {
    const account = JSON.parse(accountData);

    if (account.pin === pin) {
      if (amount <= account.balance) {
        account.balance -= amount;
        localStorage.setItem(account.accountNumber, JSON.stringify(account));
        document.getElementById(
          "output"
        ).textContent = `Amount withdrawn successfully. Current Balance: $${account.balance}`;
        
        clearAllInputs();
        showPopup(
          `SUCCESS: Funds Dispensed.\n\nRemaining Balance: $${account.balance.toFixed(2)}`
        );
      } else {
        document.getElementById("output").textContent = "Insufficient balance.";
        showPopup("DECLINED: Insufficient funds available.");
      }
    } else {
      document.getElementById("output").textContent = "Invalid PIN.";
      showPopup("SECURITY ALERT: Invalid PIN entered.");
    }
  } else {
    document.getElementById("output").textContent = "Account not found.";
    showPopup("Error: Account not found in database.");
  }
}

function displayAccount() {
  const accountNumber = document.getElementById("displayAccountNumber").value;
  const accountData = localStorage.getItem(accountNumber);

  if (accountData) {
    const account = JSON.parse(accountData);
    const content = `ACCOUNT DETAILS:\n\nUID: ${account.accountNumber}\nHolder: ${account.name}\nCurrent Balance: $${account.balance.toFixed(2)}`;
    document.getElementById("output").innerHTML = content.replace(/\n/g, '<br>');
    
    clearAllInputs();
    showPopup(content);
  } else {
    document.getElementById("output").textContent = "Account not found.";
    showPopup("Error: Account not found in database.");
  }
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  const messageLines = message.split("\n");
  popupContent.innerHTML = messageLines.join("<br>");
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function isValidAccountNumber(accountNumber) {
  const regex = /^\d{4,6}$/;
  return regex.test(accountNumber);
}

function isValidPIN(pin) {
  const regex = /^\d{4,6}$/;
  return regex.test(pin);
}
