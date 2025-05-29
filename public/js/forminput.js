const input = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');
const longitudeInput = document.getElementById('longitude');
const latitudeInput = document.getElementById('latitude');

input.addEventListener('input', function() {
    const query = input.value;
    if (query.length < 3) {  // we can not get suggestion untill we type  more than 3 text 
        suggestionsList.innerHTML = ''; // Clear suggestions
        return;
    }

    // Fetch suggestions from Nominatim  
    // *******encodeURIComponent encode normal string to url type  (my name is :=>pawan) (my%20name%20is%20%3A%3D%3Epawan)*********
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&limit=5&format=json`)
        .then(response => response.json())
        .then(data => {
            suggestionsList.innerHTML = ''; // Clear  each time previous suggestions  when you still typing
            data.forEach(location => {
                const li = document.createElement('li');
                li.textContent = location.display_name;// and  reprint new sggestion
                                       
                // Set latitude and longitude when the item is clicked
                li.addEventListener('click', () => {   //add click event on each suggestion
                    input.value = location.display_name; // Set input value
                    longitudeInput.value = location.lon;  // Set longitude
                    latitudeInput.value = location.lat;   // Set latitude
                    suggestionsList.innerHTML = ''; // Clear suggestions
                });

                suggestionsList.appendChild(li); // add this list to suggestion div
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}); 
