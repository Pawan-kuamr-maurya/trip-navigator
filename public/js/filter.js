const scrollMenu = document.getElementById("scroll-menu");
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");

// Set scroll amount equal to one item width (adjust if needed)
const scrollAmount = 300;

scrollLeftBtn.addEventListener("click", () => {
  scrollMenu.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

scrollRightBtn.addEventListener("click", () => {
  scrollMenu.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      fetch("http://localhost:3000/api/location", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Latitude: latitude,
          Longitude: longitude,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          addtitle();
          fillelement(data);
          console.log("Data from server:", data);
        });
    },
    (error) => {
      console.error("Error occurred. Error code: " + error.code);
      // Handle errors accordingly (e.g., permissions issues, position unavailable, etc.)
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}


function addtitle(params) {
  const heading=document.querySelector("#nearplaceheading");
  heading.innerHTML="<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span style='color:red'> Tourist place near you </span>";
}


function fillelement(articles) {
  const container = document.querySelector(".nearplace");

  // Loop through articles and create HTML elements
  articles.forEach((article) => {
    const hyperlink = document.createElement("a");
    hyperlink.setAttribute("href", "/allthing/listing/" + article._id);
    
    const centerDiv = document.createElement("div");
    centerDiv.className = "center";
    
    const articleCard = document.createElement("div");
    articleCard.className = "article-card";
    
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    
    const dateP = document.createElement("p");
    dateP.className = "date";
    dateP.textContent = "near by you";
    
    const titleP = document.createElement("p");
    titleP.className = "title";
    titleP.textContent = article.title;
    
    const img = document.createElement("img");
    img.src = article.image;
    img.alt = "article-cover";
    
    // Append elements together
    contentDiv.appendChild(dateP);
    contentDiv.appendChild(titleP);
    articleCard.appendChild(contentDiv);
    articleCard.appendChild(img);
    centerDiv.appendChild(articleCard);
    hyperlink.appendChild(centerDiv);
    
    // Append hyperlink to container
    container.appendChild(hyperlink);
  });
}



let prevous=10;
window.onscroll = function() {
  // Check if the user has scrolled to the bottom of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("You've reached the bottom of the page!");
      fetchData();
      
      // You can call a function here to load more content or perform any action
  }
};


function fetchData() {
  // Construct the URL with the previous variable value
  const url = `http://localhost:3000/api/allthingnext/${prevous}`; // Replace with your actual API endpoint

  // Send the GET request
  fetch(url)
      .then(response => {
          // Check if the response is OK (status code 200-299)
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json(); // Parse the JSON from the response
      })
      .then(data => {
          // Print the data to the console

          prevous=prevous+10;
          console.log('Data received:', data);
          renderCards(data);

       


      })
      .catch(error => {
          // Handle any errors
          console.error('There was a problem with the fetch operation:', error);
      });
}

// Sample Data (You can replace this with your actual data)


// Function to render cards
function renderCards(data) {
    // Current date in milliseconds
    const currentDateUTC = new Date().getTime();
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    // Target container where cards will be appended
    const container = document.getElementById('row'); // Ensure there's an element with id "row" in your HTML

    // Loop through the data in reverse order
    for (let i = data.length - 1; i >= 0; i--) {
        const isOlderThanOneDay = (currentDateUTC - new Date(data[i].timestamp).getTime()) > oneDayInMillis;
        
        const newCardHTML = `
            <div class="col-12 col-sm-6 col-md-4 mb-4">
                <a class="homecard" href="/allthing/listing/${data[i]._id}">
                    <div class="card allcard h-100">
                        <img src="${data[i].image}" class="card-img-top" alt="..." style="height: 200px; object-fit: cover;">
                        ${isOlderThanOneDay ? '' :
                            `<img src='/image/new.png' class="new" alt="" srcset="">`}
                        <div class="card-body d-flex flex-column">
                            <i class="fa-solid fa-heart homelove">
                                ${data[i].reviews.length > 0 ? 
                                    (data[i].reviews.reduce((acc, el) => acc + el.rating, 0) / data[i].reviews.length) : 
                                    '0'}
                            </i>
                            <h5 class="card-title">${data[i].title}</h5>
                            <p class="card-text flex-grow-1">${data[i].state}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
        // Append to the container
        container.insertAdjacentHTML('beforeend', newCardHTML);
    }
}

// Call the function to render cards
