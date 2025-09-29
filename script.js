// navbar hamburger
const hamburger = document.getElementById("hamburger");
const navbarLeft = document.querySelector(".navbar-left");

hamburger.addEventListener("click", () => {
  navbarLeft.classList.toggle("active");
});

// Untuk Soundtrack
const slider = document.getElementById("text-slider");
const songName = document.getElementById("song-name");
const creatorName = document.getElementById("creator-name");
const singerName = document.getElementById("singer-name");

// Function to update text based on slider value
function updateText(value) {
  if (value == 0) {
    songName.textContent = "Komang";
    creatorName.textContent = "Pencipta: Raim Laode";
    singerName.textContent = "Penyanyi: Raim Laode";
  } else if (value == 1) {
    songName.textContent = "Lesung Pipi";
    creatorName.textContent = "Pencipta: Raim Laode";
    singerName.textContent = "Penyanyi: Raim Laode";
  } else if (value == 2) {
    songName.textContent = "Bersenja Gurau";
    creatorName.textContent = "Pencipta: Raim Laode & Ia ode Raimudin";
    singerName.textContent = "Penyanyi: Raim Laode";
  } else if (value == 3) {
    songName.textContent = "Ekspektasi";
    creatorName.textContent = "Pencipta: Raim Laode";
    singerName.textContent = "Penyanyi: Aruma";
  }
}

// Left arrow to decrease slider value
document.getElementById("left-arrow").addEventListener("click", function() {
    if (slider.value > 0) {
      slider.value--;
    } else {
      slider.value = 3; // Go back to 3 when at the minimum value
    }
    updateText(slider.value);
  });

// Right arrow to increase slider value
document.getElementById("right-arrow").addEventListener("click", function() {
    if (slider.value < 3) {
      slider.value++;
    } else {
      slider.value = 0; // Reset to 0 when reaching the maximum value
    }
    updateText(slider.value);
  });

// Function to automatically move the slider every 3 seconds
function autoSlide() {
  setInterval(() => {
    if (slider.value < 3) {
      slider.value++;
    } else {
      slider.value = 0;
    }
    updateText(slider.value);
  }, 3000); // Interval in milliseconds (3000ms = 3 seconds)
}

// Initialize text based on the initial slider value
updateText(slider.value);

// Start automatic sliding
autoSlide();

//Untuk Photo
let currentIndex = 0;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 270}px)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = dots.length - 1; // kembali ke akhir
  }
  updateSlider();
}

function nextSlide() {
  if (currentIndex < dots.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // kembali ke awal
  }
  updateSlider();
}

//Untuk PopUp Trailer
// Modal Video Logic
const modal = document.getElementById("videoModal");
const playButton = document.querySelector(".play-button");
const closeButton = document.querySelector(".close-button");
const trailerVideo = document.getElementById("trailerVideo");

playButton.addEventListener("click", function () {
  modal.style.display = "block";
  trailerVideo.src = "https://www.youtube.com/embed/BpvnEiG9bTE?autoplay=1"; // ganti sesuai URL trailer
  document.body.style.overflow = "hidden"; // Nonaktifkan scroll
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  trailerVideo.src = "";
  document.body.style.overflow = "auto"; // Aktifkan scroll kembali
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    trailerVideo.src = "";
    document.body.style.overflow = "auto"; // Aktifkan scroll kembali
  }
});
