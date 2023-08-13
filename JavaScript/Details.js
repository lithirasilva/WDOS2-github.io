// This code is executed when the page content is loaded
document.addEventListener("DOMContentLoaded", function() {
   
    // Getting references to various input fields and buttons
    const fullNameInput = document.getElementById("full-name");
    const phoneNumberInput = document.getElementById("mobileNumber");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirm-email");
    const continueButton = document.getElementById("continue-button");

    // Defining a function to calculate total charges for a category
    function calculateCategoryTotal(category, quantity) {
        // Define prices for each category (adjust as needed)
        const prices = {
            "SL Adult": 20,
            "SL Child": 10,
            "Foreigner Adult": 30,
            "Foreigner Child": 15,
            "Infant": 0
        };
        return prices[category] * quantity;
    }

    // Retrieving values from local storage
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedTime = localStorage.getItem("selectedTime");
    const slAdultTickets = parseInt(localStorage.getItem("slAdultTickets"));
    const slChildTickets = parseInt(localStorage.getItem("slChildTickets"));
    const foreignAdultTickets = parseInt(localStorage.getItem("foreignAdultTickets"));
    const foreignChildTickets = parseInt(localStorage.getItem("foreignChildTickets"));
    const infantTickets = parseInt(localStorage.getItem("infantTickets"));
    const totalCharges = parseInt(localStorage.getItem("totalCharges"));

    // Updating summary table with retrieved values
    document.getElementById("summary-date").innerText = selectedDate;
    document.getElementById("summary-time").innerText = selectedTime;

    const summaryTickets = document.getElementById("summary-tickets");
    const summaryPrice = document.getElementById("summary-price");
    summaryTickets.innerHTML = "";
    summaryPrice.innerHTML = "";

    // Creating an array to iterate through ticket categories
    const ticketCategories = [
        { category: "SL Adult", quantity: slAdultTickets },
        { category: "SL Child", quantity: slChildTickets },
        { category: "Foreigner Adult", quantity: foreignAdultTickets },
        { category: "Foreigner Child", quantity: foreignChildTickets },
        { category: "Infant", quantity: infantTickets }
    ];

    let totalPayable = 0; // Initializing the total payable variable

    // Looping through ticket categories and updating summary
    for (const categoryData of ticketCategories) {
        const { category, quantity } = categoryData;
        if (quantity > 0) {
            const categoryTotal = calculateCategoryTotal(category, quantity);
            summaryTickets.innerHTML += `<li>${quantity} ${category}</li>`;
            summaryPrice.innerHTML += `<li>$${categoryTotal}</li>`;
            totalPayable += categoryTotal; // Adding to the total payable
        }
    }

    // Displaying the total payable in the summary
    summaryPrice.innerHTML += `<li class="bold">Total Payable: $${totalPayable}</li>`;
});

// ... (Event listeners for input fields)

// Event listener for the "Continue" button
continueButton.addEventListener("click", function() {
    if (
        // Checking if required fields are filled
        fullNameInput.value.trim() === "" ||
        phoneNumberInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        confirmEmailInput.value.trim() === ""
    ) {
        // Storing validation status and showing an alert
        localStorage.setItem("isInformationValid", "true");
        alert("Please fill in all the required fields.");
        return;
    }

    // Checking if email and confirmEmail match
    if (emailInput.value !== confirmEmailInput.value) {
        alert("Emails do not match. Please make sure they are the same.");
        return;
    }

    // Redirecting to the next page
    window.location.href = purchaseLink.href;
});





