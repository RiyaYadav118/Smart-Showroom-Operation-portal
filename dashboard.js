// // Dashboard JS logic

// function loadDashboard() {
//     // Get cars from localStorage
//     let cars = JSON.parse(localStorage.getItem("cars")) || [];

//     let totalStock = 0;
//     let totalSold = 0;
//     let topCar = "";
//     let maxSold = 0;

//     cars.forEach(car => {
//         totalStock += car.stock || 0;
//         totalSold += car.sold || 0;

//         if ((car.sold || 0) > maxSold) {
//             maxSold = car.sold;
//             topCar = car.name;
//         }
//     });

//     // Display in HTML
//     document.getElementById("totalStock").innerText = totalStock;
//     document.getElementById("totalSold").innerText = totalSold;
//     document.getElementById("topCar").innerText = topCar || "No sales yet";
// }

// Run dashboard on page load
//window.onload = loadDashboard;


// ================= DASHBOARD =================
function loadDashboard() {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    let totalStock = 0;
    let totalSold = 0;
    let topCar = "";
    let maxSold = 0;

    cars.forEach(car => {
        totalStock += car.stock || 0;
        totalSold += car.sold || 0;

        if ((car.sold || 0) > maxSold) {
            maxSold = car.sold;
            topCar = car.name;
        }
    });

    // agar elements exist karte hain tab hi set karo
    if (document.getElementById("totalStock"))
        document.getElementById("totalStock").innerText = totalStock;

    if (document.getElementById("totalSold"))
        document.getElementById("totalSold").innerText = totalSold;

    if (document.getElementById("topCar"))
        document.getElementById("topCar").innerText = topCar || "No sales yet";
}


// ================= EMI DROPDOWN =================
function loadCarsDropdown() {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    let dropdown = document.getElementById("carSelect");

    // 🔥 important (error avoid karega)
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">Select Car</option>';

    cars.forEach((car, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.text = car.name + " - ₹" + car.price;
        dropdown.appendChild(option);
    });
}


// ================= PRICE AUTO FILL =================
function setPrice() {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    let index = document.getElementById("carSelect").value;

    if (index !== "") {
        document.getElementById("price").value = cars[index].price;
    }
}


// ================= EMI CALCULATION =================
function calculateEMI() {
    let price = parseFloat(document.getElementById("price").value);
    let downPayment = parseFloat(document.getElementById("downPayment").value);
    let interest = parseFloat(document.getElementById("interest").value);
    let tenure = parseFloat(document.getElementById("tenure").value);

    if (!price || !interest || !tenure) {
        alert("Please fill all fields");
        return;
    }

    if (downPayment > price) {
        alert("Down Payment cannot be more than Price");
        return;
    }

    let loan = price - downPayment;
    let r = interest / 12 / 100;

    let emi = (loan * r * Math.pow(1 + r, tenure)) /
              (Math.pow(1 + r, tenure) - 1);

    document.getElementById("result").innerHTML =
        "Monthly EMI: ₹" + emi.toFixed(2);
}


// ================= SINGLE ONLOAD =================
window.onload = function () {
    loadDashboard();       // dashboard ke liye
    loadCarsDropdown();    // EMI ke liye
};