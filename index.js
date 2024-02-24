document.addEventListener("DOMContentLoaded", function() {
    const observationsContainer = document.getElementById("observations");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    // Define the iNaturalist API endpoints
    const observationsEndpoint = 'https://api.inaturalist.org/v1/observations';

    // Function to fetch observations based on longitude and latitude
    function fetchObservations(latitude, longitude) {
        // Make a GET request to retrieve observation data based on latitude and longitude
        fetch(`${observationsEndpoint}?lat=${latitude}&lng=${longitude}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous observations
                observationsContainer.innerHTML = '';

                // Display some information about the observations
                data.results.forEach(observation => {
                    const observationDiv = document.createElement("div");
                    observationDiv.classList.add("observation");

                    const speciesName = observation.taxon && observation.taxon.name ? observation.taxon.name : 'Unknown';
                    const observerName = observation.user ? observation.user.login : 'Unknown';
                    const location = observation.place_guess || 'Unknown';
                    const observationDate = observation.observed_on || 'Unknown';

                    // Get the first image associated with the observation, if available
                    const image = observation.photos && observation.photos.length > 0 ? observation.photos[0].url : '';

                    observationDiv.innerHTML = `
                        <h2>${speciesName}</h2>
                        ${image ? `<img src="${image}" alt="${speciesName}">` : ''}
                        <p>Observer: ${observerName}</p>
                        <p>Location: ${location}</p>
                        <p>Date: ${observationDate}</p>
                    `;

                    observationsContainer.appendChild(observationDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Event listener for search button click
    searchButton.addEventListener("click", function() {
        const latitude = parseFloat(searchInput.value.split(',')[0].trim());
        const longitude = parseFloat(searchInput.value.split(',')[1].trim());
        if (!isNaN(latitude) && !isNaN(longitude)) {
            fetchObservations(latitude, longitude);
        } else {
            console.error('Invalid latitude and longitude');
        }
    });

    // Optionally, you can also search for observations when the user presses Enter in the search input
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            const latitude = parseFloat(searchInput.value.split(',')[0].trim());
            const longitude = parseFloat(searchInput.value.split(',')[1].trim());
            if (!isNaN(latitude) && !isNaN(longitude)) {
                fetchObservations(latitude, longitude);
            } else {
                console.error('Invalid latitude and longitude');
            }
        }
    });
});
