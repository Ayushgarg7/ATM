function createAccount() {
  const name = document.getElementById("name").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const pin = document.getElementById("pin").value;
  const initialBalance = parseFloat(
    document.getElementById("initialBalance").value
  );

  if (!isValidAccountNumber(accountNumber)) {
    showPopup("Account Number must be a unique 4 to 6 digit number.");
    return;
  }

  if (!isValidPIN(pin)) {
    showPopup("PIN must be a unique 4 to 6 digit number.");
    return;
  }

  const existingAccount = localStorage.getItem(accountNumber);
  if (existingAccount) {
    showPopup("An account with this account number already exists.");
    return;
  }

  const account = {
    name,
    accountNumber,
    pin,
    balance: initialBalance,
  };

  localStorage.setItem(account.accountNumber, JSON.stringify(account));

  document.getElementById("output").textContent =
    "Account created successfully.";
  showPopup("Account created successfully.");
}

function deleteAccount() {
  const accountNumber = document.getElementById("deleteAccountNumber").value;
  localStorage.removeItem(accountNumber);
  document.getElementById("output").textContent =
    "Account deleted successfully.";
  showPopup("Account deleted successfully.");
}

function deposit() {
  const accountNumber = document.getElementById("depositAccountNumber").value;
  const pin = document.getElementById("depositPIN").value;
  const amount = parseFloat(document.getElementById("depositAmount").value);

  const accountData = localStorage.getItem(accountNumber);

  if (accountData) {
    const account = JSON.parse(accountData);

    if (account.pin === pin) {
      account.balance += amount;
      localStorage.setItem(account.accountNumber, JSON.stringify(account));
      document.getElementById(
        "output"
      ).textContent = `Amount deposited successfully. Current Balance: $${account.balance}`;
      showPopup(
        `Amount deposited successfully. Current Balance: $${account.balance}`
      );
    } else {
      document.getElementById("output").textContent = "Invalid PIN.";
      showPopup("Invalid PIN.");
    }
  } else {
    document.getElementById("output").textContent = "Account not found.";
    showPopup("Account not found.");
  }
}

function withdraw() {
  const accountNumber = document.getElementById("withdrawAccountNumber").value;
  const pin = document.getElementById("withdrawPIN").value;
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

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
        showPopup(
          `Amount withdrawn successfully. Current Balance: $${account.balance}`
        );
      } else {
        document.getElementById("output").textContent = "Insufficient balance.";
        showPopup("Insufficient balance.");
      }
    } else {
      document.getElementById("output").textContent = "Invalid PIN.";
      showPopup("Invalid PIN.");
    }
  } else {
    document.getElementById("output").textContent = "Account not found.";
    showPopup("Account not found.");
  }
}

function displayAccount() {
  const accountNumber = document.getElementById("displayAccountNumber").value;

  const accountData = localStorage.getItem(accountNumber);

  if (accountData) {
    const account = JSON.parse(accountData);
    const content = `Account Number: ${account.accountNumber}<br>Name: ${account.name}<br>Balance: $${account.balance}`;
    document.getElementById("output").innerHTML = content;
    showPopup(content);
  } else {
    document.getElementById("output").textContent = "Account not found.";
    showPopup("Account not found.");
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
