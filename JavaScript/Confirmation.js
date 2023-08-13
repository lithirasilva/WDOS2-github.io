// When the page content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get references to input fields and the continue button
    const fullNameInput = document.getElementById("full-name");
    const phoneNumberInput = document.getElementById("mobileNumber");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirm-email");
    const continueButton = document.getElementById("continue-button");

    // Function to calculate total cost for a ticket category
    function calculateCategoryTotal(category, quantity) {
        // Prices for each category 
        const prices = {
            "SL Adult": 20,
            "SL Child": 10,
            "Foreigner Adult": 30,
            "Foreigner Child": 15,
            "Infant": 0
        };
        return prices[category] * quantity;
    }

    // Retrieve values from local storage
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedTime = localStorage.getItem("selectedTime");
    const slAdultTickets = parseInt(localStorage.getItem("slAdultTickets"));
    const slChildTickets = parseInt(localStorage.getItem("slChildTickets"));
    const foreignAdultTickets = parseInt(localStorage.getItem("foreignAdultTickets"));
    const foreignChildTickets = parseInt(localStorage.getItem("foreignChildTickets"));
    const infantTickets = parseInt(localStorage.getItem("infantTickets"));
    const totalCharges = parseInt(localStorage.getItem("totalCharges"));

    // Update summary table with retrieved values
    document.getElementById("summary-date").innerText = selectedDate;
    document.getElementById("summary-time").innerText = selectedTime;

    // Get references to summary elements
    const summaryTickets = document.getElementById("summary-tickets");
    const summaryPrice = document.getElementById("summary-price");
    summaryTickets.innerHTML = "";
    summaryPrice.innerHTML = "";

    // Define an array to loop through ticket categories
    const ticketCategories = [
        { category: "SL Adult", quantity: slAdultTickets },
        { category: "SL Child", quantity: slChildTickets },
        { category: "Foreigner Adult", quantity: foreignAdultTickets },
        { category: "Foreigner Child", quantity: foreignChildTickets },
        { category: "Infant", quantity: infantTickets }
    ];

    let totalPayable = 0; // Initialize total payable

    // Loop through each ticket category and update the summary
    for (const categoryData of ticketCategories) {
        const { category, quantity } = categoryData;
        if (quantity > 0) {
            const categoryTotal = calculateCategoryTotal(category, quantity);
            summaryTickets.innerHTML += `<li>${quantity} ${category}</li>`;
            summaryPrice.innerHTML += `<li>$${categoryTotal}</li>`;
            totalPayable += categoryTotal; // Add to total payable
        }
    }

    // Display the total payable in the summary
    summaryPrice.innerHTML += `<li class="bold">Total Payable: $${totalPayable}</li>`;
});
