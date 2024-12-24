const jsonData = {
    "generators": [
        {
            "id": 1,
            "title": "מד לחץ דם",
            "img": "blood_pressure_monitor.jpg",
            "description": "מכשיר למדידת לחץ דם לצורך זיהוי מוקדם של בעיות לב וכלי דם.",
            "relevantClassification": "dailyUse"
        },
        {
            "id": 2,
            "title": "סטטוסקופ",
            "img": "stethoscope.jpg",
            "description": "מכשיר להאזנה לצלילי הלב, הריאות ואיברים פנימיים נוספים.",
            "relevantClassification": "dailyUse"
        },
        {
            "id": 3,
            "title": "מד חום דיגיטלי",
            "img": "digital_thermometer.jpg",
            "description": "כלי למדידת טמפרטורת גוף במדויק ובמהירות.",
            "relevantClassification": "dailyUse"
        },
        {
            "id": 4,
            "title": "מכשיר למדידת רמת סוכר",
            "img": "glucose_meter.jpg",
            "description": "מכשיר לבדיקה מהירה של רמת סוכר בדם לחולים בסיכון או סכרת.",
            "relevantClassification": "chronicCare"
        },
        {
            "id": 5,
            "title": "מחט אינפוזיה",
            "img": "infusion_needle.jpg",
            "description": "מחט המאפשרת העברת נוזלים או תרופות ישירות לווריד.",
            "relevantClassification": "emergencyCare"
        },
        {
            "id": 6,
            "title": "מכשיר החייאה נייד (AED)",
            "img": "aed.jpg",
            "description": "מכשיר לשימוש חירום במקרה של דום לב לביצוע שוק חשמלי.",
            "relevantClassification": "emergencyCare"
        },
        {
            "id": 7,
            "title": "מסכת חמצן",
            "img": "oxygen_mask.jpg",
            "description": "מסכה להזרמת חמצן לחולים הזקוקים לעזרה נשימתית.",
            "relevantClassification": "emergencyCare"
        },
        {
            "id": 8,
            "title": "ערכת תפירה רפואית",
            "img": "suture_kit.jpg",
            "description": "ערכת תפירה לסגירת חתכים ופצעים במהלך טיפול רפואי.",
            "relevantClassification": "emergencyCare"
        },
        {
            "id": 9,
            "title": "פנס רפואי",
            "img": "medical_flashlight.jpg",
            "description": "כלי לבדיקת אישונים ולתאורה באזורים חשוכים.",
            "relevantClassification": "dailyUse"
        },
        {
            "id": 10,
            "title": "מד סטורציה",
            "img": "pulse_oximeter.jpg",
            "description": "מכשיר למדידת רמת החמצן בדם ודופק.",
            "relevantClassification": "dailyUse"
        }
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    
    const itemsContainer = document.getElementById("itemsContainer");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popupImg");
    const closePopup = document.getElementById("closePopup");

    function renderItems(filterText = "") {
        itemsContainer.innerHTML = "";
        let foundResults = false;

        jsonData.generators.forEach(item => {
            if (!filterText || item.title.includes(filterText) || item.description.includes(filterText)) {
                foundResults = true;
                const card = document.createElement("div");
                card.className = "card";

                const imgContainer = document.createElement("div");
                imgContainer.className = "img-container";

                const img = document.createElement("img");
                img.src = `img/${item.img}`;
                img.alt = item.title;

                imgContainer.appendChild(img);

                const titleContainer = document.createElement("div");
                titleContainer.className = "title-container";

                const title = document.createElement("h5");
                title.innerText = item.title;

                const heartIcon = document.createElement("span");
                heartIcon.className = "heart-icon";
                heartIcon.addEventListener("click", function () {
                    heartIcon.classList.toggle("favorited");
                });

                titleContainer.appendChild(title);
                titleContainer.appendChild(heartIcon);

                const description = document.createElement("p");
                description.innerHTML = `
                    <strong>תיאור:</strong> ${item.description}<br>
                    <strong>סיווג:</strong> ${item.relevantClassification}
                `;

                const button = document.createElement("button");
                button.innerText = "הצג עוד פרטים";
                button.addEventListener("click", function () {
                    const isHidden = description.style.display === "none" || !description.style.display;
                    description.style.display = isHidden ? "block" : "none";
                    button.innerText = isHidden ? "הסתר פרטים" : "הצג עוד פרטים";
                });

                imgContainer.addEventListener("click", function () {
                    popupImg.src = img.src;
                    popup.style.display = "flex";
                });

                card.appendChild(imgContainer);
                card.appendChild(titleContainer);
                card.appendChild(button);
                card.appendChild(description);
                itemsContainer.appendChild(card);
            }
        });

        if (!foundResults) {
            const noResultsMessage = document.createElement("p");
            noResultsMessage.innerText = "לא נמצאו תוצאות";
            noResultsMessage.style.textAlign = "center";
            noResultsMessage.style.color = "#555";
            noResultsMessage.style.fontSize = "1.2em";
            itemsContainer.appendChild(noResultsMessage);
        }
    }

    renderItems();

    searchButton.addEventListener("click", function () {
        renderItems(searchInput.value.trim());
    });

    searchInput.addEventListener("input", function () {
        if (!this.value.trim()) {
            renderItems(); 
        }
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });
});

function toggleNav() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("open");
}

