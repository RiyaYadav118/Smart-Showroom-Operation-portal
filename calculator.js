function loadCarsDropdown() {
    // localStorage se data uthao
    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    let dropdown = document.getElementById("carSelect");

    // pehle empty karo (duplicate avoid)
    dropdown.innerHTML = '<option value="">Select Car</option>';

    // loop chalao
    cars.forEach((car, index) => {
        let option = document.createElement("option");

        option.value = index; // index store kar rahe hain

        // sirf name + price show kar rahe hain
        option.text = car.name + " - ₹" + car.price;

        dropdown.appendChild(option);
    });
}

// page load hote hi call karo
window.onload = loadCarsDropdown;

function setPrice() {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    let index = document.getElementById("carSelect").value;

    if (index !== "") {
        document.getElementById("price").value = cars[index].price;
    }
}

function calculateEMI() {
    let price = parseFloat(document.getElementById("price").value);
    let downPayment = parseFloat(document.getElementById("downPayment").value);
    let interest = parseFloat(document.getElementById("interest").value);
    let tenure = parseFloat(document.getElementById("tenure").value);

    // Loan amount
    let loan = price - downPayment;

    // Monthly interest rate
    let r = interest / 12 / 100;

    // EMI formula
    let emi = (loan * r * Math.pow(1 + r, tenure)) / 
              (Math.pow(1 + r, tenure) - 1);

    // Result show
    document.getElementById("result").innerHTML =
        "Monthly EMI: ₹" + emi.toFixed(2);
}