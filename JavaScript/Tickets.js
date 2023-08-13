// Get the full name input element
const fullNameInput = document.getElementById("full-name");

// Calculate the total charges for the tickets
function calculateTotalCharges() {
  // Define charge values for different categories
  const charges = {
    slAdult: { normal: 4, peak: 6 },
    slChild: { normal: 2, peak: 3 },
    foreignerAdult: { normal: 10, peak: 13 },
    foreignerChild: { normal: 5, peak: 8 },
    infant: { normal: 0, peak: 0 },
  };

  // Calculate total charges for each category
  const slAdultTotal = calculateCategoryTotal("sl-adult", charges.slAdult);
  const slChildTotal = calculateCategoryTotal("sl-child", charges.slChild);
  const foreignerAdultTotal = calculateCategoryTotal("foreigner-adult", charges.foreignerAdult);
  const foreignerChildTotal = calculateCategoryTotal("foreigner-child", charges.foreignerChild);
  const infantTotal = calculateCategoryTotal("infant", charges.infant);

  // Sum up the total charges
  return slAdultTotal + slChildTotal + foreignerAdultTotal + foreignerChildTotal + infantTotal;
}

// Calculate charges for a specific category
function calculateCategoryTotal(categoryId, chargeConfig) {
  const quantity = Number(document.getElementById(categoryId).value);
  const charge = quantity > 0 ? chargeConfig.peak : chargeConfig.normal;
  return quantity * charge;
}

// Calculate the duration and peak hours count
function calculateDuration(startTime, endTime) {
  // Define peak hours
  const peakStart1 = 10;
  const peakEnd1 = 13;
  const peakStart2 = 15;
  const peakEnd2 = 18;

  // Ensure valid start and end times are provided
  if (startTime && endTime) {
    // Extract hours from start and end times
    const startHour = Number(startTime.split(":")[0]);
    const endHour = Number(endTime.split(":")[0]);

    // Calculate duration and peak hours
    const durationInHours = endHour - startHour;
    let peakHours = 0;
    if (
      (startHour >= peakStart1 && startHour < peakEnd1) ||
      (endHour > peakStart1 && endHour <= peakEnd1) ||
      (startHour >= peakStart2 && startHour < peakEnd2) ||
      (endHour > peakStart2 && endHour <= peakEnd2)
    ) {
      peakHours = durationInHours;
    }
    const normalHours = durationInHours - peakHours;

    return { normal: normalHours, peak: peakHours };
  }

  return { normal: 0, peak: 0 };
}

// Update the summary table with relevant data
function updateSummaryTable() {
  // Get selected date, time, and ticket quantities
  const date = document.getElementById("visit-date").value;
  const timeSlot = document.getElementById("time-slot").value;
  const [startTime, endTime] = timeSlot.split("-");
  const duration = calculateDuration(startTime, endTime);
  
  // Calculate total charges
  const totalCharges = calculateTotalCharges();
  
  // Get ticket quantities
  const slAdult = Number(document.getElementById("sl-adult").value);
  const slChild = Number(document.getElementById("sl-child").value);
  const foreignerAdult = Number(document.getElementById("foreigner-adult").value);
  const foreignerChild = Number(document.getElementById("foreigner-child").value);
  const infant = Number(document.getElementById("infant").value);

  // Update summary table data
  const summaryTableHTML = document.getElementById("summary").innerHTML;
  localStorage.setItem("summaryTableHTML", summaryTableHTML);
  
  // Update continue button availability based on input
  const continueButton = document.getElementById("continue-button");
  if (date && timeSlot && (slAdult || slChild || foreignerAdult || foreignerChild || infant)) {
    continueButton.removeAttribute("disabled");
  } else {
    continueButton.setAttribute("disabled", "true");
  }

  // Update summary table details
  document.getElementById("summary-date").innerText = date;
  document.getElementById("summary-time").innerText = timeSlot;
  const normalHours = duration.normal;
  const peakHours = duration.peak;
  const durationText = `${normalHours + peakHours} hrs (${normalHours.toString().padStart(2, "0")} Normal : ${peakHours.toString().padStart(2, "0")} Peak)`;
  document.getElementById("summary-duration").innerText = durationText;
  
  // Update summary tickets and prices
  const ticketCategories = [
    { category: "SL Adult", normalCharge: 4, peakCharge: 6 },
    { category: "SL Child", normalCharge: 2, peakCharge: 3 },
    { category: "Foreigner Adult", normalCharge: 10, peakCharge: 13 },
    { category: "Foreigner Child", normalCharge: 5, peakCharge: 8 },
    { category: "infant", normalCharge: 0, peakCharge: 0 },
  ];
  
  const summaryTickets = document.getElementById("summary-tickets");
  summaryTickets.innerHTML = "";
  const summaryPrice = document.getElementById("summary-price");
  summaryPrice.innerHTML = "";

  // Update summary ticket and price information
  for (const categoryData of ticketCategories) {
    const { category, normalCharge, peakCharge } = categoryData;
    const quantity = Number(document.getElementById(category.toLowerCase().replace(" ", "-")).value);

    let charge;
    if (duration.peak > 0) {
      charge = peakCharge;
    } else {
      charge = normalCharge;
    }

    const total = quantity * charge;
    if (quantity > 0) {
      summaryTickets.innerHTML += `<li>${quantity} ${category}</li>`;
      summaryPrice.innerHTML += `<li>$${total}</li>`;
    }
  }
  
  // Update total charges in summary
  document.getElementById("summary-total").innerText = `$${totalCharges}`;
}

// Attach event listeners for input changes
document.getElementById("visit-date").addEventListener("change", updateSummaryTable);
document.getElementById("time-slot").addEventListener("change", updateSummaryTable);
document.getElementById("sl-adult").addEventListener("change", updateSummaryTable);
document.getElementById("sl-child").addEventListener("change", updateSummaryTable);
document.getElementById("foreigner-adult").addEventListener("change", updateSummaryTable);
document.getElementById("foreigner-child").addEventListener("change", updateSummaryTable);
document.getElementById("infant").addEventListener("change", updateSummaryTable);

// Attach event listener to continue button
document.getElementById("continue-button").addEventListener("click", function () {
  const purchaseLink = document.getElementById("purchase-link").getAttribute("href");
});

// Store selected data in local storage
function storeSelectedData() {
  const selectedDate = document.getElementById("visit-date").value;
  const selectedTime = document.getElementById("time-slot").value;
  const slAdultTickets = parseInt(document.getElementById("sl-adult").value);
  const slChildTickets = parseInt(document.getElementById("sl-child").value);
  const foreignAdultTickets = parseInt(document.getElementById("foreigner-adult").value);
  const foreignChildTickets = parseInt(document.getElementById("foreigner-child").value);
  const infantTickets = parseInt(document.getElementById("infant").value);

  localStorage.setItem("selectedDate", selectedDate);
  localStorage.setItem("selectedTime", selectedTime);
  localStorage.setItem("slAdultTickets", slAdultTickets);
  localStorage.setItem("slChildTickets", slChildTickets);
  localStorage.setItem("foreignAdultTickets", foreignAdultTickets);
  localStorage.setItem("foreignChildTickets", foreignChildTickets);
  localStorage.setItem("infantTickets", infantTickets);
}

// Attach event listener to "Continue with Purchase" button
document.getElementById("continue-button").addEventListener("click", storeSelectedData);

// Get current date in the required format
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Update the summary date to current date on page load
function updateSummaryDate() {
  const currentDate = getCurrentDate();
  document.getElementById("summary-date").innerText = currentDate;
}

// Run the updateSummaryDate function when the page loads
window.onload = updateSummaryDate;
