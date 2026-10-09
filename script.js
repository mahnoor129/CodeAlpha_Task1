
const items = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const caption = document.getElementById("caption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = Array.from(items);
let currentIndex = 0;

// Filter images
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const category = button.dataset.category;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        items.forEach(function(item) {
            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });

        visibleItems = Array.from(items).filter(function(item) {
            return !item.classList.contains("hidden");
        });
    });
});

// Open image preview
items.forEach(function(item) {
    item.addEventListener("click", function() {
        visibleItems = Array.from(items).filter(function(image) {
            return !image.classList.contains("hidden");
        });

        currentIndex = visibleItems.indexOf(item);
        showImage();

        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    });
});

// Show selected image
function showImage() {
    const item = visibleItems[currentIndex];
    const img = item.querySelector("img");
    const title = item.querySelector("h3");

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    caption.textContent =
        title.textContent + " (" +
        (currentIndex + 1) + " of " +
        visibleItems.length + ")";
}

// Next image
nextBtn.addEventListener("click", function() {
    currentIndex =
        (currentIndex + 1) % visibleItems.length;

    showImage();
});

// Previous image
prevBtn.addEventListener("click", function() {
    currentIndex =
        (currentIndex - 1 + visibleItems.length) %
        visibleItems.length;

    showImage();
});

// Close preview
function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

// Close by clicking outside the image
lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", function(event) {
    if (!lightbox.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }
});