const translations = {
    ar: {
        title: "حساب الثلث الأخير من الليل",
        labelMaghrib: "وقت المغرب:",
        labelFajr: "وقت الفجر:",
        calculateButton: "احسب الثلث الأخير",
        toggleLanguage: "English",
        resultText: "يبدأ الثلث الأخير من الليل عند:" 
    },
    en: {
        title: "Calculate the Last Third of the Night",
        labelMaghrib: "Maghrib Time:",
        labelFajr: "Fajr Time:",
        calculateButton: "Calculate Last Third",
        toggleLanguage: "العربية",
        resultText: "The last third of the night starts at:" 
    }
};

let currentLang = "ar";

function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    updateLanguage();
    resetInputs();
}

function updateLanguage() {
    document.getElementById("title").innerText = translations[currentLang].title;
    document.getElementById("labelMaghrib").innerText = translations[currentLang].labelMaghrib;
    document.getElementById("labelFajr").innerText = translations[currentLang].labelFajr;
    document.getElementById("calculateButton").innerText = translations[currentLang].calculateButton;
    document.getElementById("toggleLanguage").innerText = translations[currentLang].toggleLanguage;
    document.body.className = currentLang;
    let timeInputs = document.querySelectorAll("input[type='time']");
    timeInputs.forEach(input => {
        input.setAttribute("lang", currentLang);
        input.setAttribute("dir", currentLang === "en" ? "ltr" : "rtl");
        input.setAttribute("step", "60");
    });
}

function calculateLastThird() {
    let maghribTime = document.getElementById("maghrib").value;
    let fajrTime = document.getElementById("fajr").value;

    if (!maghribTime || !fajrTime) {
        alert(currentLang === "ar" ? "يرجى إدخال وقتي المغرب والفجر" : "Please enter both Maghrib and Fajr times.");
        return;
    }

    let [maghribHours, maghribMinutes] = maghribTime.split(":").map(Number);
    let [fajrHours, fajrMinutes] = fajrTime.split(":").map(Number);

    let maghribDate = new Date();
    maghribDate.setHours(maghribHours, maghribMinutes, 0);

    let fajrDate = new Date();
    fajrDate.setHours(fajrHours, fajrMinutes, 0);

    if (fajrDate < maghribDate) {
        fajrDate.setDate(fajrDate.getDate() + 1);
    }

    let nightDuration = (fajrDate - maghribDate) / 3;
    let lastThirdTime = new Date(fajrDate - nightDuration);

    document.getElementById("result").innerText = translations[currentLang].resultText + ` ${formatTime(lastThirdTime)}`;
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    let formattedTime = `${hours}:${minutes} ${ampm}`;
    
    if (currentLang === "ar") {
        ampm = ampm === "AM" ? "صباحًا" : "مساءً";
        formattedTime = `${hours}:${minutes} ${ampm}`;
    }
    return formattedTime;
}

function resetInputs() {
    document.getElementById("maghrib").value = "";
    document.getElementById("fajr").value = "";
    document.getElementById("result").innerText = "";
}
