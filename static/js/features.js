
/* =====================================================
   DHARWADA SEARCH - COMPLETE FEATURE JAVASCRIPT
===================================================== */


/* =====================================================
   COMMON HELPERS
===================================================== */

const $ = (id) => document.getElementById(id);

function makeMapLink(place) {
    return "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(place + ", Dharwad, Karnataka");
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


/* =====================================================
   EXISTING REGISTRATION POPUP
===================================================== */

window.addEventListener("load", () => {
    const popup = $("registrationPopup");

    if (popup) {
        setTimeout(() => {
            popup.style.display = "flex";
        }, 800);
    }
});

function closeRegistration() {
    if ($("registrationPopup")) {
        $("registrationPopup").style.display = "none";
    }
}

function registerUser(event) {
    event.preventDefault();
    alert("Registration successful! Welcome to Dharwad Search.");
    closeRegistration();
}

function goToMain() {
    $("mainWebsite")?.scrollIntoView({ behavior: "smooth" });
}


/* =====================================================
   EXISTING CATEGORY MENU
===================================================== */

function openCategories() {
    if ($("categoryPopup")) $("categoryPopup").style.display = "block";
    if ($("categoryOverlay")) $("categoryOverlay").style.display = "block";
}

function closeCategories() {
    if ($("categoryPopup")) $("categoryPopup").style.display = "none";
    if ($("categoryOverlay")) $("categoryOverlay").style.display = "none";
}


/* =====================================================
   EXISTING IMAGE SLIDER
===================================================== */

let slideIndex = 1;

function showSlides(number) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides.length) return;

    slideIndex = ((number - 1 + slides.length) % slides.length) + 1;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active-dot"));

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1]?.classList.add("active-dot");
}

function changeSlide(number) {
    showSlides(slideIndex + number);
}

function currentSlide(number) {
    showSlides(number);
}

showSlides(slideIndex);

setInterval(() => changeSlide(1), 5000);


/* =====================================================
   SHARED LOCAL PLACE DATA
   These are illustrative starting entries, not a
   verified directory or live map database.
===================================================== */

const placeData = [
    {
        name: "Dharwad Peda",
        category: "Food",
        description: "Explore the city's famous sweet and local food traditions.",
        location: "Dharwad Peda shops, Dharwad"
    },
    {
        name: "Local Khanavali",
        category: "Food",
        description: "Discover traditional North Karnataka meals.",
        location: "Khanavali restaurants, Dharwad"
    },
    {
        name: "Sadhankeri",
        category: "Tourist Places",
        description: "A familiar green space for a relaxed outing.",
        location: "Sadhankeri, Dharwad"
    },
    {
        name: "Nuggikeri Hanuman Temple",
        category: "Temples",
        description: "A well-known religious destination in the Dharwad area.",
        location: "Nuggikeri Hanuman Temple, Dharwad"
    },
    {
        name: "Dharwad Fort area",
        category: "Historical Places",
        description: "Explore Dharwad's historic heritage and surroundings.",
        location: "Dharwad Fort, Dharwad"
    },
    {
        name: "Karnatak University",
        category: "Colleges",
        description: "An important educational landmark.",
        location: "Karnatak University, Dharwad"
    },
    {
        name: "Karnatak College",
        category: "Colleges",
        description: "A prominent educational institution in the city.",
        location: "Karnatak College, Dharwad"
    },
    {
        name: "IIT Dharwad",
        category: "Colleges",
        description: "An institute for engineering, technology and research.",
        location: "IIT Dharwad, Karnataka"
    },
    {
        name: "Dharwad railway station",
        category: "Transport",
        description: "Rail connectivity for travel to and from Dharwad.",
        location: "Dharwad Railway Station"
    },
    {
        name: "Dharwad bus stand",
        category: "Transport",
        description: "A local bus transport point.",
        location: "Dharwad Central Bus Stand"
    },
    {
        name: "Local cafes",
        category: "Cafes",
        description: "Explore cafes and casual student hangout options.",
        location: "Cafes in Dharwad"
    },
    {
        name: "Local shopping areas",
        category: "Shopping",
        description: "Discover local shops and everyday shopping.",
        location: "Shopping areas, Dharwad"
    },
    {
        name: "Hotels in Dharwad",
        category: "Hotels",
        description: "Find accommodation options in the city.",
        location: "Hotels, Dharwad"
    },
    {
        name: "Hospitals in Dharwad",
        category: "Hospitals",
        description: "Find nearby healthcare facilities.",
        location: "Hospitals, Dharwad"
    },
    {
        name: "Dharwad cultural venues",
        category: "Cultural Places",
        description: "Explore cultural events, music and local arts.",
        location: "Cultural venues, Dharwad"
    }
];

const mapCategories = [
    "Tourist Places",
    "Food",
    "Cafes",
    "Shopping",
    "Hotels",
    "Hospitals",
    "Colleges",
    "Historical Places",
    "Cultural Places",
    "Temples",
    "Transport"
];


/* =====================================================
   1. INTERACTIVE EXPLORE DHARWAD MAP
===================================================== */

let activeMapCategory = "Tourist Places";

function renderMap(category) {
    activeMapCategory = category;

    const filters = $("mapFilters");
    const results = $("mapResults");
    const pins = $("mapPins");

    if (!filters || !results || !pins) return;

    filters.innerHTML = mapCategories.map(item => `
        <button class="${item === category ? "selected" : ""}"
                data-map-category="${escapeHTML(item)}">
            ${escapeHTML(item)}
        </button>
    `).join("");

    const matches = placeData.filter(place => place.category === category);

    results.innerHTML = matches.length
        ? matches.map((place, index) => `
            <article class="place-result">
                <h3>${escapeHTML(place.name)}</h3>
                <p>${escapeHTML(place.description)}</p>
                <div class="place-actions">
                    <a href="${makeMapLink(place.location)}"
                       target="_blank" rel="noopener">
                       View Location
                    </a>
                    <button data-add-trip="${escapeHTML(place.name)}">
                        Add to My Trip
                    </button>
                </div>
            </article>
        `).join("")
        : `<article class="place-result">
             <h3>${escapeHTML(category)}</h3>
             <p>Explore this category using the location search link.</p>
             <a href="${makeMapLink(category)}" target="_blank" rel="noopener">
                Search locations
             </a>
           </article>`;

    pins.innerHTML = matches.map((place, index) => {
        const left = 12 + ((index * 23) % 75);
        const top = 12 + ((index * 37) % 75);

        return `
            <button class="map-pin"
                style="left:${left}%;top:${top}%"
                title="${escapeHTML(place.name)}"
                data-pin-place="${escapeHTML(place.name)}">
                ${index + 1}
            </button>
        `;
    }).join("");
}

$("mapFilters")?.addEventListener("click", event => {
    const button = event.target.closest("[data-map-category]");
    if (button) renderMap(button.dataset.mapCategory);
});

$("mapPins")?.addEventListener("click", event => {
    const pin = event.target.closest("[data-pin-place]");
    if (!pin) return;

    const place = placeData.find(p => p.name === pin.dataset.pinPlace);
    if (place) window.open(makeMapLink(place.location), "_blank", "noopener");
});

renderMap(activeMapCategory);


/* =====================================================
   ADD TO MY TRIP
===================================================== */

let savedTripPlaces = [];

document.addEventListener("click", event => {
    const button = event.target.closest("[data-add-trip]");
    if (!button) return;

    const placeName = button.dataset.addTrip;

    if (!savedTripPlaces.includes(placeName)) {
        savedTripPlaces.push(placeName);
    }

    button.textContent = "Added ✓";
    button.disabled = true;

    renderSavedTrip();
});

function renderSavedTrip() {
    let box = $("savedTripBox");

    if (!box) {
        box = document.createElement("div");
        box.id = "savedTripBox";
        box.className = "detail-panel";

        $("tripResults")?.after(box);
    }

    if (!box) return;

    box.innerHTML = `
        <h3>My Saved Trip (${savedTripPlaces.length})</h3>
        ${savedTripPlaces.length
            ? `<ul>${savedTripPlaces.map(place =>
                `<li>${escapeHTML(place)}</li>`).join("")}</ul>`
            : "<p>You have not added any places yet.</p>"
        }
        <button class="feature-button" id="clearSavedTrip">
            Clear My Trip
        </button>
    `;
}

document.addEventListener("click", event => {
    if (event.target.id === "clearSavedTrip") {
        savedTripPlaces = [];
        document.querySelectorAll("[data-add-trip]").forEach(button => {
            button.disabled = false;
            button.textContent = "Add to My Trip";
        });
        renderSavedTrip();
    }
});


/* =====================================================
   2. ASK DHARWAD CHATBOT
===================================================== */

const chatAnswers = {
    explore:
        "Explore Dharwad's heritage, greenery, food, educational landmarks and cultural places. Try the Explore Dharwad map above.",
    food:
        "Dharwad is associated with Dharwad Peda and North Karnataka dishes such as Jolada Rotti and traditional Khanavali meals.",
    shopping:
        "Explore local shopping areas around the city. Use the Shopping category in the map to search for current locations.",
    tourism:
        "You can explore Sadhankeri, Nuggikeri and heritage attractions around Dharwad. Check opening details before visiting.",
    education:
        "Dharwad has educational institutions including Karnatak University, Karnatak College and IIT Dharwad.",
    hospitals:
        "Use the Hospitals category to search for healthcare facilities in Dharwad. For emergencies, contact local emergency services.",
    transport:
        "Dharwad is served by railway and bus transport. Check current routes and schedules before travelling.",
    students:
        "Students can explore libraries, educational areas, cafes, local food places and parks. Check opening hours and access rules.",
    one:
        "For a one-day visit, consider a morning heritage or nature stop, a local lunch, an afternoon cultural or educational visit, and an evening food or shopping experience.",
    peda:
        "Dharwad Peda is a well-known local sweet. Search for Dharwad Peda shops on the map to find current locations.",
    places:
        "Explore the Places section and the map for nature, heritage and religious attractions around Dharwad."
};

function getChatAnswer(message) {
    const text = message.toLowerCase();

    if (text.includes("hospital") || text.includes("doctor"))
        return chatAnswers.hospitals;
    if (text.includes("food") || text.includes("eat") ||
        text.includes("restaurant") || text.includes("peda"))
        return text.includes("peda") ? chatAnswers.peda : chatAnswers.food;
    if (text.includes("shop"))
        return chatAnswers.shopping;
    if (text.includes("college") || text.includes("education") ||
        text.includes("university"))
        return chatAnswers.education;
    if (text.includes("transport") || text.includes("bus") ||
        text.includes("train"))
        return chatAnswers.transport;
    if (text.includes("student") || text.includes("cafe") ||
        text.includes("hangout"))
        return chatAnswers.students;
    if (text.includes("one day") || text.includes("1 day"))
        return chatAnswers.one;
    if (text.includes("tourist") || text.includes("visit") ||
        text.includes("places"))
        return chatAnswers.places;
    if (text.includes("explore"))
        return chatAnswers.explore;

    return "I can help with Dharwad food, Peda, tourism, shopping, education, hospitals, transport and student places. Try one of the quick buttons!";
}

function addChatMessage(message, type) {
    const box = $("chatMessages");
    if (!box) return;

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${type}`;
    bubble.textContent = message;

    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
}

function askChat(message) {
    if (!message.trim()) return;

    addChatMessage(message, "user");
    addChatMessage(getChatAnswer(message), "bot");
}

$("chatForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const input = $("chatInput");
    askChat(input.value);
    input.value = "";
});

document.querySelectorAll("[data-chat]").forEach(button => {
    button.addEventListener("click", () => askChat(button.dataset.chat));
});


/* =====================================================
   3. PLAN MY DHARWAD TRIP
===================================================== */

const tripIdeas = {
    History: [
        ["Morning", "Explore Dharwad's heritage and historic areas."],
        ["Afternoon", "Visit a local cultural or historical attraction."]
    ],
    Food: [
        ["Afternoon", "Enjoy a traditional North Karnataka meal."],
        ["Evening", "Try Dharwad Peda from a local shop."]
    ],
    Culture: [
        ["Afternoon", "Explore Kannada literature and music heritage."],
        ["Evening", "Look for a local cultural event."]
    ],
    Shopping: [
        ["Evening", "Explore local markets and traditional shopping."]
    ],
    Nature: [
        ["Morning", "Enjoy a nature walk at a suitable local green space."],
        ["Evening", "Relax outdoors, depending on weather."]
    ],
    "Religious Places": [
        ["Morning", "Visit a religious place respectfully and check timings."]
    ],
    Family: [
        ["Morning", "Choose a relaxed park or family-friendly attraction."],
        ["Evening", "Enjoy a local food experience."]
    ],
    Students: [
        ["Morning", "Explore an educational landmark."],
        ["Evening", "Discover cafes, libraries or student-friendly areas."]
    ]
};

$("generateTrip")?.addEventListener("click", () => {
    const duration = Number($("tripDuration").value);
    const interests = [...document.querySelectorAll(
        ".interest-grid input:checked"
    )].map(input => input.value);

    const selected = interests.length ? interests : ["Nature", "Food", "Culture"];
    const results = $("tripResults");

    const days = [];

    for (let day = 1; day <= duration; day++) {
        const dayInterests = selected.filter((_, index) =>
            index % duration === (day - 1)
        );

        const topics = dayInterests.length ? dayInterests : selected;
        let stops = [];

        topics.forEach(topic => {
            if (tripIdeas[topic]) {
                stops.push(...tripIdeas[topic]);
            }
        });

        if (stops.length === 0) {
            stops = [
                ["Morning", "Explore a local attraction."],
                ["Afternoon", "Enjoy local food."],
                ["Evening", "Relax or explore a shopping area."]
            ];
        }

        const uniqueStops = [...new Map(
            stops.map(stop => [stop[0] + stop[1], stop])
        ).values()];

        days.push(`
            <article class="trip-day">
                <h3>${duration === 1 ? "One-Day Dharwad Experience" : `Day ${day} — Dharwad Experience`}</h3>
                ${uniqueStops.map(stop => `
                    <div class="trip-stop">
                        <strong>${escapeHTML(stop[0])}</strong><br>
                        ${escapeHTML(stop[1])}
                    </div>
                `).join("")}
            </article>
        `);
    }

    results.innerHTML = days.join("") + `
        <p class="form-note">
            This is a suggested outline, not a timed or verified route.
            Check opening hours, travel time and current conditions.
        </p>
    `;
});


/* =====================================================
   4. DHARWAD FAMOUS FOR
===================================================== */

const famousTopics = [
    {
        title: "Music & Culture",
        icon: "🎶",
        detail: "Dharwad has a notable Hindustani classical music tradition and is associated with celebrated musicians.",
        related: "Explore the People and Culture sections."
    },
    {
        title: "Dharwad Peda",
        icon: "🍬",
        detail: "Dharwad Peda is a signature sweet associated with the city.",
        related: "Explore Food and local sweet shops."
    },
    {
        title: "Education",
        icon: "🎓",
        detail: "Dharwad is an educational centre with institutions serving different fields of study.",
        related: "Explore Karnatak University, Karnatak College and IIT Dharwad."
    },
    {
        title: "Art & Theatre",
        icon: "🎭",
        detail: "Kannada literature, theatre and performing arts contribute to Dharwad's cultural identity.",
        related: "Explore cultural venues and local events."
    },
    {
        title: "Culture & Heritage",
        icon: "🏛️",
        detail: "The city's heritage includes historic places, traditions and cultural landmarks.",
        related: "Explore the History and Places sections."
    },
    {
        title: "History",
        icon: "📜",
        detail: "Dharwad has a long history shaped by regional kingdoms and later administrations.",
        related: "Explore the History section."
    },
    {
        title: "Local Food",
        icon: "🥘",
        detail: "North Karnataka food traditions include Jolada Rotti and traditional meals.",
        related: "Explore the Food section."
    },
    {
        title: "Traditional Shopping",
        icon: "🛍️",
        detail: "Local markets offer everyday shopping and regional products.",
        related: "Explore the Shopping category."
    }
];

const famousCards = $("famousCards");

if (famousCards) {
    famousCards.innerHTML = famousTopics.map((topic, index) => `
        <button class="famous-card" data-famous="${index}">
            <span>${topic.icon}</span>
            <h3>${escapeHTML(topic.title)}</h3>
        </button>
    `).join("");
}

famousCards?.addEventListener("click", event => {
    const card = event.target.closest("[data-famous]");
    if (!card) return;

    const topic = famousTopics[Number(card.dataset.famous)];

    $("famousDetails").innerHTML = `
        <h3>${topic.icon} ${escapeHTML(topic.title)}</h3>
        <p>${escapeHTML(topic.detail)}</p>
        <p><strong>Explore:</strong> ${escapeHTML(topic.related)}</p>
    `;

    $("famousDetails").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// OPEN / CLOSE CHATBOX

function toggleChat() {

    let chatBox = document.getElementById("chatBox");

    if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
    } else {
        chatBox.style.display = "block";
    }
}


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
/* =====================================================
   5. VISITOR RECOMMENDATIONS
===================================================== */

const visitorIdeas = {
    Family: ["Parks and relaxed outings", "Family-friendly food places", "Cultural attractions"],
    Student: ["Colleges and educational landmarks", "Libraries and study areas", "Cafes and affordable food"],
    Professional: ["Educational and institutional landmarks", "Cafes for a break", "Local dining"],
    Couple: ["Relaxed public gardens", "Cafes", "Cultural attractions"],
    Photographer: ["Heritage architecture", "Green spaces", "City views and cultural locations"],
    Tourist: ["Historical places", "Nature attractions", "Local food and culture"],
    "Food Lover": ["Dharwad Peda", "Khanavali meals", "Local food areas"],
    "Culture Explorer": ["Music heritage", "Kannada literature", "Theatre and cultural venues"]
};

$("visitorOptions")?.addEventListener("click", event => {
    const button = event.target.closest("[data-visitor]");
    if (!button) return;

    document.querySelectorAll("[data-visitor]").forEach(item =>
        item.classList.toggle("selected", item === button)
    );

    const visitor = button.dataset.visitor;
    const recommendations = visitorIdeas[visitor] || [];

    $("visitorResults").innerHTML = `
        <article class="place-result">
            <h3>Your Dharwad Guide: ${escapeHTML(visitor)}</h3>
            <ul>
                ${recommendations.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
            </ul>
            <p>Use the map to search for current locations and details.</p>
        </article>
    `;
});
/* =====================================================
   9. GUESS DHARWAD QUIZ
===================================================== */

const quizQuestions = [
    {
        question: "Which sweet is strongly associated with Dharwad?",
        options: ["Dharwad Peda", "Mysore Pak", "Rasgulla", "Jalebi"],
        answer: 0
    },
    {
        question: "Which musical tradition is associated with Dharwad?",
        options: ["Hindustani classical music", "Flamenco", "Reggae", "Opera only"],
        answer: 0
    },
    {
        question: "Which institution is located in Dharwad?",
        options: ["Karnatak University", "IIT Madras", "Delhi University", "IIM Ahmedabad"],
        answer: 0
    },
    {
        question: "Which food is a North Karnataka staple?",
        options: ["Jolada Rotti", "Sushi", "Tacos", "Croissant"],
        answer: 0
    },
    {
        question: "Which is a religious place near Dharwad?",
        options: ["Nuggikeri Hanuman Temple", "Golden Temple", "Meenakshi Temple", "Somnath Temple"],
        answer: 0
    },
    {
        question: "Which area is associated with a green outing in Dharwad?",
        options: ["Sadhankeri", "India Gate", "Marine Drive Mumbai", "Charminar"],
        answer: 0
    },
    {
        question: "Dharwad is especially recognised as a centre for what?",
        options: ["Education and culture", "Desert safaris", "Ocean fishing", "Snow sports"],
        answer: 0
    },
    {
        question: "Which language has a strong literary tradition in Dharwad?",
        options: ["Kannada", "Icelandic", "Swahili", "Dutch"],
        answer: 0
    },
    {
        question: "Which is a transport option in Dharwad?",
        options: ["Railway", "Submarine", "Cable car across the sea", "Ski lift"],
        answer: 0
    },
    {
        question: "What can you explore in a local Khanavali?",
        options: ["Traditional meals", "Only ice cream", "Only bakery cakes", "Seafood boats"],
        answer: 0
    }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function showQuizQuestion() {
    const question = quizQuestions[quizIndex];

    $("quizProgress").textContent =
        `Question ${quizIndex + 1} of ${quizQuestions.length}`;

    $("quizQuestion").textContent = question.question;
    $("quizFeedback").textContent = "";
    $("nextQuestion").disabled = true;
    $("nextQuestion").textContent =
        quizIndex === quizQuestions.length - 1 ? "See My Score" : "Next Question";

    quizAnswered = false;

    $("quizAnswers").innerHTML = question.options.map((option, index) => `
        <button class="quiz-answer" data-answer="${index}">
            ${escapeHTML(option)}
        </button>
    `).join("");
}

$("quizAnswers")?.addEventListener("click", event => {
    const button = event.target.closest("[data-answer]");
    if (!button || quizAnswered) return;

    quizAnswered = true;

    const chosen = Number(button.dataset.answer);
    const correct = quizQuestions[quizIndex].answer;

    if (chosen === correct) {
        quizScore++;
        $("quizFeedback").textContent = "Correct! Well done.";
    } else {
        $("quizFeedback").textContent =
            "Not quite. The correct answer is: " +
            quizQuestions[quizIndex].options[correct];
    }

    document.querySelectorAll(".quiz-answer").forEach((answer, index) => {
        answer.disabled = true;
        if (index === correct) answer.classList.add("correct");
        if (index === chosen && chosen !== correct)
            answer.classList.add("incorrect");
    });

    $("nextQuestion").disabled = false;
});

$("nextQuestion")?.addEventListener("click", () => {
    if (!quizAnswered) return;

    quizIndex++;

    if (quizIndex < quizQuestions.length) {
        showQuizQuestion();
        return;
    }

    $("quizBox").hidden = true;
    $("quizFinal").hidden = false;

    $("quizFinal").innerHTML = `
        <h3>Your Dharwad Score: ${quizScore}/${quizQuestions.length}</h3>
        <p>
            ${quizScore >= 8
                ? "Wonderful! You know many things about Dharwad."
                : "Good try! Explore the website to learn more about Dharwad."}
        </p>
        <a href="#explore-map">Explore More About Dharwad →</a>
        <br><br>
        <button class="feature-button" id="restartQuiz">Play Again</button>
    `;
});

$("quizFinal")?.addEventListener("click", event => {
    if (event.target.id !== "restartQuiz") return;

    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    $("quizBox").hidden = false;
    $("quizFinal").hidden = true;

    showQuizQuestion();
});

showQuizQuestion();


/* =====================================================
   10. CONTACT / SUGGEST A PLACE
===================================================== */

$("suggestForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const name = $("suggestName").value.trim();
    const email = $("suggestEmail").value.trim();
    const category = $("suggestCategory").value;
    const message = $("suggestMessage").value.trim();

    const subject = encodeURIComponent("Dharwada Search - Place Suggestion");
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nSuggestion:\n${message}`
    );

    // Replace this address with your team's real contact email.
    const recipient = "yourteam@example.com";

    window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;
});
function searchPlace() {

    let place = document.getElementById("placeSearch").value;

    if (place == "") {
        alert("Please enter a place to search.");
        return;
    }

    let searchURL =
        "https://www.openstreetmap.org/search?query=" +
        encodeURIComponent(place + ", Dharwad, Karnataka");

    window.open(searchURL, "_blank");
}

function showFoodInfo(food) {

    let title = "";
    let subtitle = "";
    let description = "";
    let preparation = "";
    let location = "";
    let mapLocation = "";


    /* DHARWAD PEDA */

    if (food === "peda") {

        title = "🍬 Dharwad Peda";

        subtitle = "The Famous Sweet of Dharwad";

        description =
            "Dharwad Peda is one of the most famous traditional sweets associated with Dharwad and North Karnataka.";

        preparation =
            "Milk is slowly cooked and reduced until it becomes thick. Sugar is added and the mixture is cooked further until it develops its characteristic brown colour and texture. The peda is then shaped and coated with powdered sugar.";

        location =
            "Traditional Dharwad Peda shops can be found in areas such as Line Bazaar and other parts of Dharwad.";

        mapLocation = "Line Bazaar, Dharwad, Karnataka";
    }


    /* JOLADA ROTTI */

    else if (food === "rotti") {

        title = "🌾 Jolada Rotti";

        subtitle = "Traditional North Karnataka Food";

        description =
            "Jolada Rotti is a traditional flatbread made from jowar flour and is an important part of North Karnataka cuisine.";

        preparation =
            "Jowar flour is mixed with hot water to form a soft dough. The dough is shaped into a thin rotti and cooked on a hot tava.";

        location =
            "You can find Jolada Rotti in traditional Khanavali restaurants and North Karnataka food restaurants throughout Dharwad.";

        mapLocation = "Dharwad, Karnataka";
    }


    /* KHANAVALI */

    else if (food === "khanavali") {

        title = "🍛 Khanavali Food";

        subtitle = "Traditional Dharwad & North Karnataka Meals";

        description =
            "Khanavali refers to traditional eateries serving simple, homestyle North Karnataka meals.";

        preparation =
            "Traditional meals commonly include Jolada Rotti, vegetables, curries, dal, chutneys and other local preparations.";

        location =
            "Traditional Khanavali-style restaurants can be found in different areas of Dharwad city, such as basappa khanavali,etc";

        mapLocation = "Dharwad, Karnataka";
    }


    /* OTHER FOOD */

    else if (food === "rice") {

        title = "🍚 Local Dharwad Food";

        subtitle = "Popular Dishes of dharwada";

        description =
            "Dharwad has a rich food culture influenced by the traditional cuisine of North Karnataka.";

        preparation =
         "To make classic egg rice, sauté garlic, onions, and spring onion whites in a hot wok before tossing in cold , pre-cooked rice. Season the rice with soy sauce, salt, and pepper, then fold in softly scrambled eggs. brFinish by tossing in sesame oil and spring onion greens for a quick, aromatic meal.";

        location =
            "• Hotel Vimal, • Umar Egg Rice,• Sachin Egg Rice";

        mapLocation = "Dharwad, Karnataka";
    }

    else if (food === "girmit") {

    title = "🌶️ Girmit";

    subtitle = "A Popular North Karnataka Snack";

    description =
        "Girmit is a popular and spicy puffed-rice snack enjoyed in Dharwad and across North Karnataka. It is commonly served as an evening snack.";

    preparation =
        "Girmit is generally prepared using puffed rice mixed with onion, tomato, chilli, spices and other local ingredients. Sev or other crunchy toppings may be added before serving.";

    location =
        "You can find Girmit at local snack stalls, small eateries and street-food places across Dharwad.";

    mapLocation = "Dharwad, Karnataka";
}

    /* PUT INFORMATION INTO POPUP */

    document.getElementById("foodTitle").innerHTML = title;

    document.getElementById("foodSubtitle").innerHTML = subtitle;

    document.getElementById("foodDescription").innerHTML = description;

    document.getElementById("foodPreparation").innerHTML = preparation;

    document.getElementById("foodLocation").innerHTML = location;


    /* MAP BUTTON */

    document.getElementById("foodMapButton").onclick = function () {

        window.open(
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(mapLocation),
            "_blank"
        );

    };


    /* SHOW POPUP */

    document.getElementById("foodPopup").style.display = "flex";
}


/* CLOSE POPUP */

function closeFoodInfo() {

    document.getElementById("foodPopup").style.display = "none";

}
function showVisitor(type) {

    let title = "";
    let description = "";
    let places = "";

    if (type === "family") {

        title = "Your Dharwad Guide: Family";

        description =
            "Perfect places for families, children and relaxed outings.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/greenery/sadhankeri-garden-1082016.webp">
                <h3>Sadhankeri Garden</h3>
                <p>A peaceful place for family outings.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/greenery/nuggikeri2.jpeg">
                <h3>Nuggikeri</h3>
                <p>A popular place for a family visit.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/greenery/nature.jpg">
                <h3>Dharwad Nature</h3>
                <p>Enjoy greenery and peaceful surroundings.</p>
            </div>
        `;
    }


    else if (type === "student") {

        title = "Your Dharwad Guide: Student";

        description =
            "Explore educational places, affordable food spots and places to relax with friends.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/education/kcd.jpg">
                <h3>KCD College</h3>
                <p>One of the well-known educational institutions.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/education/iit.avif">
                <h3>IIT Dharwad</h3>
                <p>A major educational institution in Dharwad.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/greenery/sadhankeri-garden-1082016.webp">
                <h3>Sadhankeri</h3>
                <p>A good place to relax with friends.</p>
            </div>
        `;
    }


    else if (type === "professional") {

        title = "Your Dharwad Guide: Professional";

        description =
            "Useful places for professionals, business visitors and working people.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/places/city.webp">
                <h3>Dharwad City</h3>
                <p>Explore important areas of the city.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/food/hoysala hotel.jpeg">
                <h3>Hotels</h3>
                <p>Comfortable places to stay during your visit.</p>
            </div>
        `;
    }


    else if (type === "photographer") {

        title = "Your Dharwad Guide: Photographer";

        description =
            "Discover scenic, historical and natural places that are great for photography.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/greenery/nature.jpg">
                <h3>Nature</h3>
                <p>Beautiful natural surroundings for photography.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/greenery/nuggikeri2.jpeg">
                <h3>Nuggikeri</h3>
                <p>Capture the temple and surrounding atmosphere.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/places/city.webp">
                <h3>Dharwad City</h3>
                <p>Great for city and street photography.</p>
            </div>
        `;
    }


    else if (type === "tourist") {

        title = "Your Dharwad Guide: Tourist";

        description =
            "Explore historical places, temples, gardens and attractions around Dharwad.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/greenery/nuggikeri2.jpeg">
                <h3>Nuggikeri Hanuman Temple</h3>
                <p>A popular religious and cultural attraction.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/places/murgamatt.png">
                <h3>Dharwad Fort</h3>
                <p>Explore Dharwad's historical heritage.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/greenery/sadhankeri-garden-1082016.webp">
                <h3>Sadhankeri Garden</h3>
                <p>A peaceful green attraction.</p>
            </div>
        `;
    }


    else if (type === "food") {

        title = "Your Dharwad Guide: Food Lover";

        description =
            "Taste the famous flavours of Dharwad and North Karnataka.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/food/peda2.webp">
                <h3>Dharwad Peda</h3>
                <p>The famous sweet of Dharwad.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/food/kadak-jowar-roti-3.jpg">
                <h3>Jolada Rotti</h3>
                <p>A traditional North Karnataka food.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/food/girmit.jpg">
                <h3>Girmit</h3>
                <p>A popular spicy local snack.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/food/kanavali.avif">
                <h3>Khanavali</h3>
                <p>Traditional North Karnataka meals.</p>
            </div>
        `;
    }


    else if (type === "culture") {

        title = "Your Dharwad Guide: Culture Explorer";

        description =
            "Discover the music, literature, heritage and cultural identity of Dharwad.";

        places = `
            <div class="visitor-place">
                <img src="/static/images/people/D R Bendre.jpg">
                <h3>D. R. Bendre</h3>
                <p>Explore the literary legacy of Dharwad.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/people/Gangubai hangal.jpg">
                <h3>Gangubai Hangal</h3>
                <p>A celebrated name in Indian classical music.</p>
            </div>

            <div class="visitor-place">
                <img src="/static/images/people/Mallikarjun_Mansur.jpg">
                <h3>Mallikarjun Mansur</h3>
                <p>Discover Dharwad's rich musical tradition.</p>
            </div>
        `;
    }


    document.getElementById("visitorTitle").innerHTML = title;

    document.getElementById("visitorDescription").innerHTML = description;

    document.getElementById("visitorPlaces").innerHTML = places;

    document.getElementById("visitorGuide").style.display = "block";
}

let indianVoice = null;

function loadVoices() {
    const voices = speechSynthesis.getVoices();

    indianVoice = voices.find(v =>
        v.lang.toLowerCase() === "en-in"
    );
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

document.addEventListener("click", function(event) {

    // Ignore buttons, links and form controls
    if (event.target.closest("button, a, input, textarea, select")) {
        return;
    }

    // Find the nearest text-containing element
    const element = event.target.closest(
        "h1, h2, h3, h4, h5, h6, p, li, span, label, strong, b, div"
    );

    if (!element) return;

    const text = element.innerText.trim();
    if (!text) return;

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    if (indianVoice) {
        speech.voice = indianVoice;
    }

    speechSynthesis.speak(speech);
});
// OPEN AND CLOSE CHATBOT

const mitraOpen = document.getElementById("mitraOpen");
const mitraPopup = document.getElementById("mitraPopup");
const mitraClose = document.getElementById("mitraClose");

mitraOpen.addEventListener("click", () => {
    mitraPopup.classList.add("active");
});

mitraClose.addEventListener("click", () => {
    mitraPopup.classList.remove("active");
});


// DISPLAY MESSAGES

function addMitraMessage(message, type) {
    const content = document.getElementById("mitraContent");

    const div = document.createElement("div");
    div.className = "mitra-message " + type;
    div.textContent = message;

    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
}


// TRIP PLANNER

function planTrip(duration) {

    addMitraMessage(duration, "user-message");

    let reply = "";

    if (duration === "Half Day") {
        reply = "Your half-day Dharwad trip! 🌿\n\n1. Start with Karnataka University and its green surroundings.\n2. Visit Sadhankeri Garden.\n3. Explore Dharwad Fort.\n4. Finish with delicious Dharwad Peda!";
    }

    else if (duration === "1 Day") {
        reply = "Your one-day Dharwad trip! 🌸\n\nMorning:\n1. Visit Karnataka University.\n2. Explore Dharwad Fort.\n\nAfternoon:\n3. Enjoy traditional Dharwad food.\n4. Visit Nuggikeri Hanuman Temple.\n\nEvening:\n5. Relax at Sadhankeri Garden.\n6. Try famous Dharwad Peda!";
    }

    else {
        reply = "Your two-day Dharwad trip! 🌳\n\nDAY 1:\n1. Karnataka University.\n2. Dharwad Fort.\n3. Sadhankeri Garden.\n4. Taste Dharwad Peda.\n\nDAY 2:\n1. Nuggikeri Hanuman Temple.\n2. Explore Dharwad's educational institutions.\n3. Experience local food and culture.\n4. Explore the city's shopping areas.";
    }

    setTimeout(() => {
        addMitraMessage(reply, "bot-message");
    }, 500);
}


// ASK QUESTIONS

function sendMitraMessage() {

    const input = document.getElementById("mitraInput");
    const question = input.value.trim();

    if (question === "") return;

    addMitraMessage(question, "user-message");

    let answer = "I can help you explore Dharwad! Ask me about food, tourist places, education, temples or trip planning.";

    const q = question.toLowerCase();

    if (q.includes("food") || q.includes("eat")) {
        answer = "Dharwad is famous for Dharwad Peda, Jolada Rotti, Girmit and traditional Khanavali food!";
    }

    else if (q.includes("place") || q.includes("tourist")) {
        answer = "You can explore Dharwad Fort, Nuggikeri Temple, Sadhankeri Garden and Karnataka University.";
    }

    else if (q.includes("college") || q.includes("education")) {
        answer = "Dharwad is known as an educational hub. You can explore Karnataka University, IIT Dharwad, and other educational institutions.";
    }

    else if (q.includes("temple")) {
        answer = "Nuggikeri Hanuman Temple is one of the well-known temples in Dharwad.";
    }

    else if (q.includes("hello") || q.includes("hi")) {
        answer = "Namaskara! 🌸 What would you like to explore in Dharwad?";
    }

    setTimeout(() => {
        addMitraMessage(answer, "bot-message");
    }, 500);

    input.value = "";
}


// SEND MESSAGE USING ENTER

document.getElementById("mitraInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMitraMessage();
    }
});