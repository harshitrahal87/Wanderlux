/* WanderLux Travel Agency - JavaScript */

/* Mobile menu toggle */
function toggleMenu() {
  var links = document.getElementById("navLinks");
  links.classList.toggle("open");
}

/* Rotating banner slideshow (Home page) */
var slideIndex = 0;
function showSlides() {
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (slides.length === 0) {
    return;
  }
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }
  for (var j = 0; j < dots.length; j++) {
    dots[j].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].classList.add("show");
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }
  setTimeout(showSlides, 3500);
}

/* Let a user click a dot to jump to a slide */
function currentSlide(n) {
  slideIndex = n - 1;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }
  for (var j = 0; j < dots.length; j++) {
    dots[j].classList.remove("active");
  }
  slides[n - 1].classList.add("show");
  dots[n - 1].classList.add("active");
}

/* Trip Cost Calculator */
function calculateCost() {
  var destination = document.getElementById("destination").value;
  var travellers = Number(document.getElementById("travellers").value);
  var days = Number(document.getElementById("days").value);
  var style = document.getElementById("style").value;
  var errorBox = document.getElementById("calcError");
  var resultBox = document.getElementById("result");

  // Simple validation
  if (destination === "" || travellers === "" || days === "" || style === "") {
    errorBox.textContent = "Please fill in all fields before calculating.";
    resultBox.classList.remove("show");
    return;
  }
  if (travellers < 1 || days < 1) {
    errorBox.textContent = "Travellers and days must be at least 1.";
    resultBox.classList.remove("show");
    return;
  }
  errorBox.textContent = "";

  // Preset daily rate per traveller for each destination (USD)
  var dailyRates = {
    Bali: 120,
    Dubai: 180,
    Paris: 220,
    Maldives: 300,
    Sydney: 200,
    Tokyo: 240
  };

  // Travel style multiplier
  var multipliers = {
    Budget: 1,
    Standard: 1.4,
    Luxury: 2
  };

  var baseAccommodation = 60; // per day flat accommodation base
  var dailyRate = dailyRates[destination];
  var multiplier = multipliers[style];

  // Total = ((daily rate + accommodation) * days * travellers) * style multiplier
  var total = (dailyRate + baseAccommodation) * days * travellers * multiplier;
  total = Math.round(total);

  var totalText = total.toLocaleString();

  resultBox.innerHTML =
    "<h3>Your Estimated Trip Cost</h3>" +
    "<p><strong>Estimated cost for " + travellers +
    " traveller(s) to " + destination + " for " + days +
    " days: $" + totalText + " - " + style + " Travel Package.</strong></p>" +
    "<p>This is an approximate figure. Contact our consultants for an exact quote.</p>";
  resultBox.classList.add("show");
}

/* Appointment form validation */
function validateAppointment() {
  var name = document.getElementById("apptName").value.trim();
  var email = document.getElementById("apptEmail").value.trim();
  var phone = document.getElementById("apptPhone").value.trim();
  var date = document.getElementById("apptDate").value;
  var ok = true;

  document.getElementById("nameErr").textContent = "";
  document.getElementById("emailErr").textContent = "";
  document.getElementById("phoneErr").textContent = "";
  document.getElementById("dateErr").textContent = "";

  if (name === "") {
    document.getElementById("nameErr").textContent = "Please enter your name.";
    ok = false;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailErr").textContent = "Please enter a valid email.";
    ok = false;
  }

  var phonePattern = /^[0-9 +]{8,15}$/;
  if (!phonePattern.test(phone)) {
    document.getElementById("phoneErr").textContent = "Enter a valid phone number.";
    ok = false;
  }

  if (date === "") {
    document.getElementById("dateErr").textContent = "Please choose a preferred date.";
    ok = false;
  }

  if (ok) {
    document.getElementById("apptSuccess").classList.add("show");
    document.getElementById("appointmentForm").reset();
  }
  return false; // stop page reload for this demo
}

/* Contact form validation */
function validateContact() {
  var name = document.getElementById("cName").value.trim();
  var email = document.getElementById("cEmail").value.trim();
  var message = document.getElementById("cMessage").value.trim();
  var ok = true;

  document.getElementById("cNameErr").textContent = "";
  document.getElementById("cEmailErr").textContent = "";
  document.getElementById("cMessageErr").textContent = "";

  if (name === "") {
    document.getElementById("cNameErr").textContent = "Please enter your name.";
    ok = false;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("cEmailErr").textContent = "Please enter a valid email.";
    ok = false;
  }

  if (message === "") {
    document.getElementById("cMessageErr").textContent = "Please write a message.";
    ok = false;
  }

  if (ok) {
    // Send the email through Formspree (a free form-to-email service).
    // Replace YOUR_FORM_ID with the ID from your own free formspree.io account.
    var endpoint = "https://formspree.io/f/YOUR_FORM_ID";
    var data = { name: name, email: email, message: message };

    fetch(endpoint, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function () {
        document.getElementById("cSuccess").classList.add("show");
        document.getElementById("contactForm").reset();
      })
      .catch(function () {
        document.getElementById("cSuccess").classList.add("show");
        document.getElementById("contactForm").reset();
      });
  }
  return false;
}

/* Reveal sections while scrolling */
function revealOnScroll() {
  var items = document.getElementsByClassName("reveal");
  var trigger = window.innerHeight * 0.85;
  for (var i = 0; i < items.length; i++) {
    var top = items[i].getBoundingClientRect().top;
    if (top < trigger) {
      items[i].classList.add("visible");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", function () {
  showSlides();
  revealOnScroll();
});
