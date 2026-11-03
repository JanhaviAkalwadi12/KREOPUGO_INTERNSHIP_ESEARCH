/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    nav.classList.toggle("active");

}


/* ================= FOOD BUTTON ================= */

function showFoodMessage() {

    alert(
        "Dharwad is famous for Dharwad Peda and traditional North Karnataka food such as Jolada Rotti, chutneys and local curries!"
    );

}


/* ================= PLACE INFORMATION ================= */

function placeInfo(place) {

    const information = {

        "Dharwad Fort":
            "Dharwad Fort is an important historical landmark of the city.",

        "Sadhankeri":
            "Sadhankeri is known for its peaceful lake and green surroundings.",

        "D. R. Bendre Bhavan":
            "D. R. Bendre Bhavan celebrates the literary heritage associated with the famous poet D. R. Bendre.",

        "Regional Science Centre":
            "Regional Science Centre is a place where science learning becomes interesting and interactive."

    };

    alert(information[place]);

}


/* ================= SCROLL ANIMATION ================= */

const cards = document.querySelectorAll(
    ".feature-card, .food-card, .famous-card, .place-card, .person-card"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach((card) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});


/* ================= NAVBAR SCROLL EFFECT ================= */

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(13, 36, 25, 0.98)";

    } else {

        navbar.style.background = "rgba(20, 48, 35, 0.92)";

    }

});


/* ================= CLOSE MOBILE MENU ================= */

document.querySelectorAll(".navbar nav a").forEach(link => {

    link.addEventListener("click", () => {

        document
            .querySelector(".navbar nav")
            .classList.remove("active");

    });

});


// PLAN MY TRIP

function planTrip(days) {

    let result = document.getElementById("tripResult");

    if (days === "1 Day") {

        result.innerHTML =
            "<h3>One Day Dharwad Plan</h3>" +
            "<p>Morning: Visit Karnatak University and Dharwad Fort.</p>" +
            "<p>Afternoon: Enjoy Dharwad Peda and local food.</p>" +
            "<p>Evening: Visit Sadhankeri Park and Nuggikeri.</p>";

    } else if (days === "2 Days") {

        result.innerHTML =
            "<h3>Two Day Dharwad Plan</h3>" +
            "<p>Day 1: Explore historical and educational places.</p>" +
            "<p>Day 2: Explore food, parks, temples and cultural places.</p>";

    } else {

        result.innerHTML =
            "<h3>Three Day Dharwad Plan</h3>" +
            "<p>Explore Dharwad's famous places, food, education, culture and nearby attractions.</p>";
    }
}


// CHAT QUESTIONS

function askQuestion(topic) {

    let messages = document.getElementById("chatMessages");

    messages.innerHTML +=
        '<div class="user-message">' + topic + '</div>';

    let answer = "";

    if (topic === "Tourism") {
        answer = "You can explore Dharwad Fort, Nuggikeri, Sadhankeri Park and other famous places.";
    }

    else if (topic === "Food") {
        answer = "Dharwad is famous for Dharwad Peda, Jolada Rotti and traditional Khanavali food.";
    }

    else if (topic === "Shopping") {
        answer = "You can explore local markets and shopping areas in Dharwad for clothes, food and traditional products.";
    }

    else if (topic === "Education") {
        answer = "Dharwad is known as an educational hub with universities, colleges and research institutions.";
    }

    else if (topic === "Hospitals") {
        answer = "You can check the Hospitals section of Dharwada Search for hospitals and contact information.";
    }

    else if (topic === "Transport") {
        answer = "Dharwad has buses, auto-rickshaws, taxis and railway connectivity.";
    }

    messages.innerHTML +=
        '<div class="bot-message">' + answer + '</div>';

    messages.scrollTop = messages.scrollHeight;
}


// USER MESSAGE

function sendMessage() {

    let input = document.getElementById("userQuestion");

    let question = input.value.trim();

    if (question === "") {
        return;
    }

    let messages = document.getElementById("chatMessages");

    messages.innerHTML +=
        '<div class="user-message">' +
        question +
        '</div>';

    let answer =
        "I'm still learning! Try asking about Dharwad food, tourism, shopping, education, hospitals or transport.";

    let lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("food") ||
        lowerQuestion.includes("peda")) {

        answer =
            "Dharwad is famous for Dharwad Peda and traditional North Karnataka food.";
    }

    else if (lowerQuestion.includes("tourist") ||
             lowerQuestion.includes("place")) {

        answer =
            "You can visit Dharwad Fort, Nuggikeri, Sadhankeri Park and other attractions.";
    }

    else if (lowerQuestion.includes("hospital")) {

        answer =
            "Please visit the Hospitals section of Dharwada Search for hospital information.";
    }

    else if (lowerQuestion.includes("college") ||
             lowerQuestion.includes("education")) {

        answer =
            "Dharwad has many universities, colleges and educational institutions.";
    }

    else if (lowerQuestion.includes("shopping")) {

        answer =
            "You can explore Dharwad's local markets and shopping areas.";
    }

    messages.innerHTML +=
        '<div class="bot-message">' + answer + '</div>';

    input.value = "";

    messages.scrollTop = messages.scrollHeight;
}
