document.addEventListener("DOMContentLoaded", function() {
    const observationsContainer = document.getElementById("observations");

    // Define the iNaturalist API endpoint for observations
    const observationsEndpoint = 'https://api.inaturalist.org/v1/observations';

    // Latitude and longitude coordinates for your location (example: Bandra, Mumbai)
    const latitude = 19.0583;
    const longitude = 72.8303;
    const radius = 10; // Radius in kilometers (adjust as needed)

    // Make a GET request to retrieve observation data based on location
    fetch(`${observationsEndpoint}?lat=${latitude}&lng=${longitude}&radius=${radius}`)
        .then(response => response.json())
        .then(data => {
            // Display some information about the observations
            data.results.forEach(observation => {
                const observationDiv = document.createElement("div");
                observationDiv.classList.add("observation");

                const speciesName = observation.taxon && observation.taxon.name ? observation.taxon.name : 'Unknown';
                const observerName = observation.user ? observation.user.login : 'Unknown';
                const location = observation.place_guess || 'Unknown';
                const observationDate = observation.observed_on || 'Unknown';

                observationDiv.innerHTML = `
                    <h2>${speciesName}</h2>
                    <p>Observer: ${observerName}</p>
                    <p>Location: ${location}</p>
                    <p>Date: ${observationDate}</p>
                    <hr>
                `;

                observationsContainer.appendChild(observationDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
