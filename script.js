const diveSitesData = {
    ginnie: {
        title: "Ginnie Springs",
        type: "Freshwater Spring System",
        depth: "Max Depth: 50 ft",
        desc: "Crystal-clear waters with massive limestone formations and an intricate cave network popular with technical divers.",
        img: "DOM-Ginnie.jpg",
        },
    grotto: {

        title: "Blue Grotto",
        type: "Freshwater Sinkhole",
        depth: "Max Depth: 100 ft",
        desc: "A pristine freshwater sinkhole featuring great visibility, a resident softshell turtle, and a fresh-air bell at 30 feet.",
        img: "Blue.Grotto.png"
    },
    spiegel: {
        title: "Spiegel Grove",
        type: "Ocean Wreck",
        depth: "Max Depth: 130 ft",
        desc: "A massive 510-foot long vessel resting in Key Largo. A world-famous destination for advanced and wreck-certified divers.",
        img: "Speg.Grove.png"
    },
    bufford: {
        title: "Buford Springs",
        type: "Freshwater Sink / Cave",
        depth: "Max Depth: 150 ft",
        desc: "A deep, challenging swamp sinkhole hidden within the Chassahowitzka Wildlife Management Area, reserved for advanced wilderness diving.",
        img: "buf.png"
    }
};
// REQUIREMENT 1: Cache element using selectElementById

const siteSelect = document.getElementById('dive-site-select');
const formElement = document.getElementById('dive-log-form');
const themeToggleBtn = document.getElementById('theme-toggle');
const diveClockDisplay = document.getElementById('dive-clock');


// REQUIREMENT 2: Cache elements using querySelector / querySelectorAll

const siteContainer = document.querySelector('#dynamic-site-container');
const allFormInputs = document.querySelectorAll('.form-group input');

//REQUIREMENT 4: Iterate over a collection of elements to accomplish a task

allFormInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.parentNode.classList.contains('has-error')) {
            this.parentNode.classList.remove('has-error');
            this.nextElementSibling.textContent = '';
        }
    });
});

// REQUIREMENT'S 7,8,10,11,12

window.setInterval(() => {
    const now = new Date();
    diveClockDisplay.textContent = now.toTimeString().split(' ')[0];
}, 1000);


siteSelect.addEventListener('change', function(e) {
    const selectedValue = e.target.value;
    siteContainer.innerHTML = ''; 
    
    if (!selectedValue || !diveSitesData[selectedValue]) return;
    
    const siteData = diveSitesData[selectedValue];
    const template = document.getElementById('site-card-template');
    const templateClone = template.content.cloneNode(true);
    
    templateClone.querySelector('.card-title').textContent = siteData.title;
    templateClone.querySelector('.card-type').textContent = `Type: ${siteData.type}`;
    templateClone.querySelector('.card-depth').textContent = siteData.depth;
    templateClone.querySelector('.card-desc').textContent = siteData.desc;
    
    const cardImg = templateClone.querySelector('.card-img');
    cardImg.setAttribute('src', siteData.img);
    cardImg.setAttribute('alt', `Telemetry render of ${siteData.title}`);
    
    siteContainer.appendChild(templateClone);
});

// REQUIREMENT 3,5,6,11,13 and 14 

formElement.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    let isFormValid = true;
    const nameInput = document.getElementById('diver-name');
    const depthInput = document.getElementById('dive-depth');
    
    if (nameInput.value.trim().length < 3) {
        isFormValid = false;
      
        nameInput.nextElementSibling.textContent = "CRITICAL: Name details must exceed 2 characters.";
        nameInput.parentNode.classList.add('has-error');
    }
    
    if (!depthInput.value || Number(depthInput.value) <= 0) {
        isFormValid = false;
        depthInput.nextElementSibling.textContent = "CRITICAL: Depth calculation metrics must exceed 0 FT.";
        depthInput.parentNode.classList.add('has-error');
    }
    
    const feedbackBox = document.getElementById('form-feedback');
    feedbackBox.innerHTML = ''; 
    
    if (isFormValid) {
        const successBanner = document.createElement('div');
        successBanner.classList.add('success-alert');
        successBanner.textContent = `DATA INGESTION COMPLETE: Logged ${depthInput.value} FT profiles for Diver [${nameInput.value.toUpperCase()}].`;
        
        feedbackBox.appendChild(successBanner);
        formElement.reset();
    }
});

// REQUIREMENT 9,12 
if (window.localStorage.getItem('deepWaterMode') === 'enabled') {
    document.body.classList.add('deep-water-theme');
    themeToggleBtn.textContent = "Switch to Surface Light Mode";
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('deep-water-theme');
    
    if (document.body.classList.contains('deep-water-theme')) {
        themeToggleBtn.textContent = "Switch to Surface Light Mode";
        window.localStorage.setItem('deepWaterMode', 'enabled');
    } else {
        themeToggleBtn.textContent = "Switch to Deep Water Mode";
        window.localStorage.setItem('deepWaterMode', 'disabled');
    }
});

