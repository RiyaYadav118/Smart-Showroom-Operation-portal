// SHOW LOGIN

function showLogin() {

document.getElementById("loginBox").style.display = "block";

}

// LOGIN

let isAdmin = false; // default

function login() {

let user = document.getElementById("username").value.trim();

let pass = document.getElementById("password").value.trim();



if (user === "admin" && pass === "123") {

    alert("Admin Login");

    document.getElementById("adminPanel").style.display = "block";

    isAdmin = true;

    localStorage.setItem("isAdmin", true);  // save admin

} else {

    alert("User Login");

    isAdmin = false;

    localStorage.setItem("isAdmin", false); // save user

}



document.getElementById("loginBox").style.display = "none";

loadCars(); // reload cars with correct buttons

}

// FORM SUBMIT (ADD CAR)

document.getElementById("carForm").addEventListener("submit", function(e) {

e.preventDefault();



let name = document.getElementById("name").value;

let price = document.getElementById("price").value;

let desc = document.getElementById("desc").value;

let stock = document.getElementById("stock").value;

let imageFile = document.getElementById("image").files[0];



let reader = new FileReader();



reader.onload = function() {

    let cars = JSON.parse(localStorage.getItem("cars")) || [];



    cars.push({

        name: name,

        price: price,

        desc: desc,

        image: reader.result,

        stock: parseInt(stock),

        sold: 0

    });



    localStorage.setItem("cars", JSON.stringify(cars));

    loadCars(); // display update

};



reader.readAsDataURL(imageFile);

});

// 🔥 DISPLAY FUNCTION (YAHIN BUY BUTTON ADD HAI)

function loadCars() {

let cars = JSON.parse(localStorage.getItem("cars")) || [];

let container = document.getElementById("carList");

container.innerHTML = "";



// ✅ check JS variable first, fallback to localStorage

let adminStatus = (typeof isAdmin !== "undefined") ? isAdmin : JSON.parse(localStorage.getItem("isAdmin")) || false;



cars.forEach((car, index) => {

    let actionBtn = "";



    if (adminStatus) {

        // Admin -> Delete button

        actionBtn = `<button onclick="deleteCar(${index})" style="background:red;color:white;border:none;padding:5px;margin-top:5px;cursor:pointer;">Delete</button>`;

    } else {

        // User -> Buy Now button

        actionBtn = `<button onclick="buyCar(${index})">Buy Now</button>`;

    }



    let carHTML = `

        <div class="card">

            <img src="${car.image}" width="200">

            <h3>${car.name}</h3>

            <p>Price: ₹${car.price}</p>

            <p>${car.desc}</p>

            <p>Stock: ${car.stock}</p>

            <p>Sold: ${car.sold}</p>

            ${actionBtn}

        </div>

    `;



    container.innerHTML += carHTML;

});

}

// BUY FUNCTION

function buyCar(index) {

let cars = JSON.parse(localStorage.getItem("cars")) || [];



if (cars[index].stock > 0) {

    cars[index].stock--;   // ➖ stock

    cars[index].sold++;    // ➕ sold



    localStorage.setItem("cars", JSON.stringify(cars));

    loadCars(); // refresh UI

} else {

    alert("Out of stock!");

}

}

// PAGE LOAD PAR AUTO RUN

window.onload = loadCars;

// DELETE CAR FUNCTION

function deleteCar(index) {

let cars = JSON.parse(localStorage.getItem("cars")) || [];



cars.splice(index, 1); // remove car



localStorage.setItem("cars", JSON.stringify(cars));

loadCars(); // reload UI

}

// SLIDER

let images = ["images/poonam1.jpeg","images/poonam2.png","images/poonam3.png"]; let titles = ["Welcome to MotoHub","Luxury Redefined","Performance Meets Elegance"]; let subtitles = ["Your Premium Car Destination","Experience Excellence","Find Your Dream Car"]; let index = 0; function showImage() { document.getElementById("slider").src = images[index]; document.getElementById("title").innerText = titles[index]; document.getElementById("subtitle").innerText = subtitles[index]; } function nextSlide() { index = (index + 1) % images.length; showImage(); } function prevSlide() { index = (index - 1 + images.length) % images.length; showImage(); }  loadCars(); // LOAD