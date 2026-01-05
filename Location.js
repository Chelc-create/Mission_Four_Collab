const findMeButton = document.getElementById("find-me");
const locationText = document.getElementById("location");
const mapEmbed = document.getElementById("map-embed");

findMeButton.addEventListener("click", () => {
  locationText.innerHTML =
    "finding your location...<div class='spinner-border'></div>";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      locationText.innerHTML = `Latitude: ${lat.toFixed(
        5
      )}, Longitude: ${lon.toFixed(5)}`;

      const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lon}&zoom=15`;
      mapEmbed.src = mapUrl;
    },
    // location not found
    () => {
      locationText.textContent = "Location not found";
    }
  );
});
