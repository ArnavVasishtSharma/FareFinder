document.addEventListener("DOMContentLoaded", function () {
    
    gsap.registerPlugin(ScrollTrigger);
  
    
    gsap.utils.toArray("section").forEach((section, index) => {
      
      gsap.set(section, { opacity: 0, y: 50 });
  
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, 
          start: "top 80%", 
          end: "bottom 20%", 
          toggleActions: "play none none reverse", 
        },
      });
  
      
      tl.to(section, {
        opacity: 1,
        y: 0,
        duration: 1, 
        ease: "power2.out", 
      });
  
      
      if (section.id === "prices-section") {
        tl.from(".input-group", {
          opacity: 0,
          x: -50,
          stagger: 0.2, 
        });
      }
  
      if (section.id === "about") {
        tl.from(".social-icons-container", {
          opacity: 0,
          y: 50,
          stagger: 0.1, 
        });
      }
  
      if (section.id === "contact") {
        tl.from(".form-box", {
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "elastic.out(1, 1)", 
        });
      }
    });
  });

  function calculateDistance(originCoords, destinationCoords) {
    const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${originCoords.join(',')}:${destinationCoords.join(',')}/json?key=${apiKey}`;

    fetch(routeUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const distance = route.summary.lengthInMeters / 1000; // Convert meters to kilometers
                const duration = route.summary.travelTimeInSeconds / 60; // Convert seconds to minutes

                // Display distance and duration
                document.getElementById("distance").innerText = `Distance: ${distance.toFixed(2)} km`;
                document.getElementById("duration").innerText = `Duration: ${duration.toFixed(2)} minutes`;

                // Calculate fares for Uber, Ola, and Rapido
                const uberFare = calculateUberFare(distance, duration);
                const olaFare = calculateOlaFare(distance, duration);
                const rapidoFare = calculateRapidoFare(distance, duration);

                // Display the fares in a sorted list
                displayFares(uberFare, olaFare, rapidoFare);
            } else {
                alert("Could not calculate distance. Please check the locations and try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while calculating distance.");
        });
}

function calculateUberFare(distance, travelTime) {
    const ratePerKm = (Math.random() * (13 - 11) + 11).toFixed(2);
    const timeRate = (Math.random() * (4 - 1) + 1).toFixed(2);
    return (distance * ratePerKm) + (travelTime * timeRate);
}

function calculateOlaFare(distance, travelTime) {
    const ratePerKm = (Math.random() * (12 - 10) + 10).toFixed(2);
    const timeRate = (Math.random() * (4 - 1) + 1).toFixed(2);
    return (distance * ratePerKm) + (travelTime * timeRate);
}

function calculateRapidoFare(distance, travelTime) {
    const ratePerKm = (Math.random() * (12 - 9) + 9).toFixed(2);
    const timeRate = (Math.random() * (4 - 1) + 1).toFixed(2);
    return (distance * ratePerKm) + (travelTime * timeRate);
}

function displayFares(uberFare, olaFare, rapidoFare) {
    const fares = [
        { service: "Uber", fare: uberFare },
        { service: "Ola", fare: olaFare },
        { service: "Rapido", fare: rapidoFare }
    ];

    // Sort fares by the cheapest
    fares.sort((a, b) => a.fare - b.fare);

    // Clear previous results
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Display the sorted fares
    fares.forEach((fare) => {
        const fareElement = document.createElement("p");
        fareElement.innerText = `${fare.service}: ₹${fare.fare.toFixed(2)}`;
        resultDiv.appendChild(fareElement);
    });
}

function displayFares(uberFare, olaFare, rapidoFare) {
    const fareResultsDiv = document.getElementById("fare-results");
    const farePrices = document.querySelectorAll(".fare-price");

    // Update Uber fare
    farePrices[0].innerText = `₹${uberFare.toFixed(2)}`;

    // Update Ola fare
    farePrices[1].innerText = `₹${olaFare.toFixed(2)}`;

    // Update Rapido fare
    farePrices[2].innerText = `₹${rapidoFare.toFixed(2)}`;

    // Highlight the cheapest fare
    const fares = [
        { row: farePrices[0].parentElement, fare: uberFare },
        { row: farePrices[1].parentElement, fare: olaFare },
        { row: farePrices[2].parentElement, fare: rapidoFare }
    ];

    // Sort fares by price
    fares.sort((a, b) => a.fare - b.fare);

    // Highlight the cheapest fare
    fares.forEach((item, index) => {
        if (index === 0) {
            item.row.classList.add("cheapest"); // Highlight the cheapest fare
        } else {
            item.row.classList.remove("cheapest");
        }
    });

    // Show the fare table
    fareResultsDiv.classList.remove("hidden");
}