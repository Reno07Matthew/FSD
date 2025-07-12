function renderPosts() {
  const grid = document.querySelector('.posts-grid');
  posts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="meta">${p.category} • ${p.date}</div>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <a href="${p.link}">Read More →</a>
    `;
    grid.appendChild(card);
  });
}

// Geolocation
function showLocationAndMap() {
  const out = document.getElementById('locationDisplay');
  const mapContainer = document.getElementById('map');

  if (!navigator.geolocation) {
    out.textContent = 'Geolocation is not supported by your browser.';
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    out.textContent = `Latitude: ${lat}, Longitude: ${lon}`;

    // Prevent re-initialization if already created
    if (mapContainer._leaflet_id != null) {
      mapContainer._leaflet_id = null;
      mapContainer.innerHTML = "";
    }

    // Create map
    const map = L.map('map').setView([lat, lon], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add marker with popup
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup('You are here!')
      .openPopup();
  }, () => {
    out.textContent = 'Unable to retrieve your location.';
  });
}
document.getElementById('feedbackForm').addEventListener('submit', e => {
  e.preventDefault();
  const nm = document.getElementById('name').value.trim();
  const cm = document.getElementById('comment').value.trim();
  if (!nm || !cm) return;
  console.log('Feedback:', { name: nm, comment: cm }); // Log correct values
  e.target.reset();
});

function showFeedback() {
  const container = document.getElementById('feedbackList');
  const data = JSON.parse(localStorage.getItem('feedback')) || [];
  container.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${item.nm}:</strong> ${item.cm}`;
    container.appendChild(div);
  });
}
// Init
window.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});
 
// Responsive nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});
