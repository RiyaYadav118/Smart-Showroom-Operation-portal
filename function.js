// SHOW LOGIN
function showLogin() {
    document.getElementById("loginBox").style.display = "block";
}

// LOGIN
let isAdmin = false; // admin check

function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (user === "admin" && pass === "123") {
        alert("Admin Login");
        document.getElementById("adminPanel").style.display = "block";
        isAdmin = true;
    } else {
        alert("User Login");
        isAdmin = false;
    }

    document.getElementById("loginBox").style.display = "none";
    loadCars(); // reload to show/hide delete button
}

// ADD CAR
document.getElementById("carForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;
    let imageFile = document.getElementById("image").files[0];

    let reader = new FileReader();

    reader.onload = function() {
        let cars = JSON.parse(localStorage.getItem("cars")) || [];

        cars.push({
            name: name,
            price: price,
            desc: desc,
            image: reader.result,
            stock: 5,
            sold: 0
        });

        localStorage.setItem("cars", JSON.stringify(cars));
        loadCars();
    };

    reader.readAsDataURL(imageFile);
});

// DELETE CAR FUNCTION
function deleteCar(index) {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    cars.splice(index, 1); // remove car

    localStorage.setItem("cars", JSON.stringify(cars));
    loadCars(); // reload UI
}

// SHOW CARS
function loadCars() {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    let carList = document.getElementById("carList");

    carList.innerHTML = "";

    cars.forEach((car, index) => {
        let card = document.createElement("div");
        card.classList.add("card");

        // 👇 delete button only for admin
        let deleteBtn = isAdmin 
            ? `<button onclick="deleteCar(${index})" style="background:red;color:white;border:none;padding:5px;margin-top:5px;cursor:pointer;">Delete</button>`
            : "";

        card.innerHTML = `
            <img src="${car.image}">
            <h3>${car.name}</h3>
            <p><b>Price:</b> ${car.price}</p>
            <p>${car.desc}</p>
            ${deleteBtn}
        `;

        carList.appendChild(card);
    });
}

// SLIDER
let images = ["images/poonam1.jpeg","images/poonam2.png","images/poonam3.png"];
let titles = ["Welcome to MotoHub","Luxury Redefined","Performance Meets Elegance"];
let subtitles = ["Your Premium Car Destination","Experience Excellence","Find Your Dream Car"];

let index = 0;

function showImage() {
    document.getElementById("slider").src = images[index];
    document.getElementById("title").innerText = titles[index];
    document.getElementById("subtitle").innerText = subtitles[index];
}

function nextSlide() {
    index = (index + 1) % images.length;
    showImage();
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showImage();
}

// LOAD
loadCars();