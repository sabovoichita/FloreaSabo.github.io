function initializePage() {
  const body = document.body;
  const headerHTML = `
    <header>
      <div id="header-info">
        <h1>Poezii</h1>
        <h2>de Floarea Sabo</h2>
      </div>
      <ul id="menu-bar">
        <li class="dropdown">
          <a href="#" class="dropbtn active">🔍 Poems</a>
          <div id="dropdown-content" class="dropdown-content">
            <!-- Titles will be inserted here -->
          </div>
        </li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </header>
  `;

  const footerHTML = `
    <footer>
      <div>
        <a href="https://www.facebook.com/floarea.sabo.35" target="_blank" id="contact">Facebook</a>
        <span> | &copy; Floarea Sabo</span>
      </div>
    </footer>
  `;

  const containerHTML = `
    <div class="container">
      <div class="carousel">
        <button id="prevBtn">Previous</button>
        <div id="poem-container" class="carousel-inner">
          <!-- Poems will be displayed here -->
        </div>
        <button id="nextBtn">Next</button>
      </div>
    </div>
  `;

  body.innerHTML = headerHTML + containerHTML + footerHTML;
}

var activePoem = 0;
const poems = [];

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  $("#" + id).style.display = "none";
}

function show(id) {
  $("#" + id).style.display = "block";
}

function updateCarousel() {
  const poemContainer = $("#poem-container");
  poemContainer.innerHTML = poems
    .map((poetry, index) => {
      const { title, content } = poetry;
      return `
        <div class="poem" id="poem-${index + 1}" style="display: ${
        index === activePoem ? "block" : "none"
      };">
          <div class="designPoetry">
            <h3><span class="nb">${index + 1}</span>${title}</h3>
            ${content.map((contentItem) => `<p>${contentItem}</p>`).join(" ")}
          </div>
          
        </div>
      `;
    })
    .join("");
}

function showPoetry(poetryNumber, poetry) {
  const dropdownContent = $("#dropdown-content");
  poems[poetryNumber - 1] = poetry;

  dropdownContent.innerHTML = poems
    .map((poetry, index) =>
      poetry
        ? `<a href="javascript:showPoem(${index})">${index + 1}. ${
            poetry.title
          }</a>`
        : ""
    )
    .join("");

  updateCarousel();
}

function loadPoetries(poetryNumber) {
  fetch(`poetries/${poetryNumber}.json`)
    .then((r) => r.json())
    .then((poetry) => {
      showPoetry(poetryNumber, poetry);
    })
    .catch((error) => {
      console.error(`Error loading lesson ${poetryNumber}:`, error);
    });
}

function showPoem(index) {
  activePoem = index;
  updateCarousel();
}

function initEvents() {
  const numberOfPoems = 8;
  for (let i = 1; i <= numberOfPoems; i++) {
    loadPoetries(i);
  }

  $("#prevBtn").addEventListener("click", () => {
    activePoem = (activePoem - 1 + poems.length) % poems.length;
    updateCarousel();
  });

  $("#nextBtn").addEventListener("click", () => {
    activePoem = (activePoem + 1) % poems.length;
    updateCarousel();
  });
}

// Initialize the page structure
initializePage();

// Load poems
initEvents();
