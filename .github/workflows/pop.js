// External popup.js file

// Function to open the popup
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Function to fetch user's location using ipgeolocation.io API
async function fetchUserLocation(apiKey) {
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the entire response for debugging

        // Check if the user's country is USA
        if (data.country_name === "United States") {
            setTimeout(openPopup, 5000); // Open popup after 5 seconds
        }

        // Display the country code in the location-info element
        document.getElementById('location-info').textContent = 'Your country code is: ' + data.country_code2; // country_code2 for 2-letter country code

    } catch (error) {
        console.error('Fetch error:', error); // Log specific error message
        document.getElementById('location-info').textContent = 'Error fetching location: ' + error.message; // Show error message
    }
}

// Function to load popup HTML structure dynamically
function loadPopupHtml() {
    const popupHtml = `
        <div id="popup" class="popup">
            <div class="popup-content">
                <h2>Join Our Facebook Group!</h2>
                <img src="https://via.placeholder.com/350x150.png?text=Facebook+Group+Banner" class="group-image" alt="Group Banner">
                <div class="group-info">
                    <p>Stay connected and enjoy exclusive content by joining our Facebook group. Engage with like-minded individuals, ask questions, and get updates!</p>
                </div>
                <a href="https://www.facebook.com/groups/lasrecetasdoradasdelaabuela" target="_blank" class="facebook-btn">Join Now</a>
                <button class="close-btn" onclick="closePopup()">Close</button>
                <p id="location-info"></p>
            </div>
        </div>
        <style>
            .popup { display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); justify-content: center; align-items: center; }
            .popup-content { background-color: white; padding: 20px; border-radius: 10px; width: 400px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); }
            .close-btn, .facebook-btn { padding: 10px; border: none; border-radius: 5px; margin-top: 15px; cursor: pointer; }
            .close-btn { background-color: #ff5e57; color: white; }
            .facebook-btn { background-color: #4267B2; color: white; text-decoration: none; }
            .group-image { width: 100%; border-radius: 10px; }
            .group-info { margin: 15px 0; }
            #location-info { margin-top: 20px; font-size: 16px; color: #333; }
        </style>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHtml);
}

// Function to initialize the popup and fetch location
function initPopup(apiKey) {
    loadPopupHtml();
    fetchUserLocation(apiKey);
}

// Execute initPopup function on page load
window.onload = function() {
    const apiKey = '6144c013ac9644ec898ff9bf02b0142d'; // Replace with your actual API key
    initPopup(apiKey);
};
