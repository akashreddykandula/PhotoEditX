const toggleBtn = document.querySelector ('.dark-toggle');
const body = document.body;
const menuToggle = document.querySelector ('.menu-toggle');
const navLinks = document.querySelector ('.nav-links');

// Dark/Light Mode Toggle
toggleBtn.addEventListener ('click', () => {
  body.classList.toggle ('light-mode');
  toggleBtn.innerHTML = body.classList.contains ('light-mode')
    ? '<i class="ri-sun-line"></i>' // Sun icon for light mode
    : '<i class="ri-moon-line"></i>'; // Moon icon for dark mode
});

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Auto close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Existing dark mode + menu code stays

// Editor Controls
const upload = document.getElementById ('upload');
const photo = document.getElementById ('photo');
const brightness = document.getElementById ('brightness');
const contrast = document.getElementById ('contrast');
const saturation = document.getElementById ('saturation');
const blur = document.getElementById ('blur');
const downloadBtn = document.getElementById ('downloadBtn');

// Upload image
upload.addEventListener ('change', () => {
  const file = upload.files[0];
  if (file) {
    photo.src = URL.createObjectURL (file);
  }
});

// Apply filters
function applyFilters () {
  photo.style.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturation.value}%)
    blur(${blur.value}px)
  `;
}

[brightness, contrast, saturation, blur].forEach (slider => {
  slider.addEventListener ('input', applyFilters);
});

// Download edited image using Canvas
downloadBtn.addEventListener ('click', () => {
  const canvas = document.createElement ('canvas');
  const ctx = canvas.getContext ('2d');
  const img = new Image ();

  img.crossOrigin = 'anonymous'; // avoid CORS issues
  img.src = photo.src;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = photo.style.filter;
    ctx.drawImage (img, 0, 0, img.width, img.height);

    const link = document.createElement ('a');
    link.download = 'edited-photo.png';
    link.href = canvas.toDataURL ();
    link.click ();
  };
});

const grayscale = document.getElementById ('grayscale');
const sepia = document.getElementById ('sepia');
const hue = document.getElementById ('hue');
const invert = document.getElementById ('invert');
const opacity = document.getElementById ('opacity');

function applyFilters () {
  photo.style.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturation.value}%)
    blur(${blur.value}px)
    grayscale(${grayscale.value}%)
    sepia(${sepia.value}%)
    hue-rotate(${hue.value}deg)
    invert(${invert.value}%)
    opacity(${opacity.value}%)
  `;
}

// Add listeners
[
  brightness,
  contrast,
  saturation,
  blur,
  grayscale,
  sepia,
  hue,
  invert,
  opacity,
].forEach (slider => slider.addEventListener ('input', applyFilters));
// Contact form placeholder
document.querySelector ('.contact-form').addEventListener ('submit', e => {
  e.preventDefault ();
  alert ('Thanks for reaching out! 🚀 (Form backend not connected yet)');
});
const collageUpload = document.getElementById ('collageUpload');
const collageArea = document.getElementById ('collageArea');
const saveCollage = document.getElementById ('saveCollage');

// Upload multiple images
collageUpload.addEventListener ('change', () => {
  collageArea.innerHTML = ''; // clear placeholder
  Array.from (collageUpload.files).forEach (file => {
    const img = document.createElement ('img');
    img.src = URL.createObjectURL (file);
    img.style.top = Math.random () * 400 + 'px'; // random position
    img.style.left = Math.random () * 700 + 'px';
    img.draggable = true;
    collageArea.appendChild (img);

    // Drag functionality
    img.addEventListener ('mousedown', e => {
      let shiftX = e.clientX - img.getBoundingClientRect ().left;
      let shiftY = e.clientY - img.getBoundingClientRect ().top;

      function moveAt (pageX, pageY) {
        img.style.left = pageX - shiftX - collageArea.offsetLeft + 'px';
        img.style.top = pageY - shiftY - collageArea.offsetTop + 'px';
      }

      function onMouseMove (event) {
        moveAt (event.pageX, event.pageY);
      }

      document.addEventListener ('mousemove', onMouseMove);

      img.onmouseup = function () {
        document.removeEventListener ('mousemove', onMouseMove);
        img.onmouseup = null;
      };
    });

    img.ondragstart = () => false; // disable default drag ghost
  });
});

// Save collage as image
saveCollage.addEventListener ('click', () => {
  html2canvas (collageArea).then (canvas => {
    const link = document.createElement ('a');
    link.download = 'collage.png';
    link.href = canvas.toDataURL ();
    link.click ();
  });
});
const stickerElements = document.querySelectorAll ('.sticker');

stickerElements.forEach (sticker => {
  sticker.addEventListener ('click', () => {
    const newSticker = document.createElement ('img');
    newSticker.src = sticker.src;
    newSticker.classList.add ('sticker-item');
    newSticker.style.top = Math.random () * 300 + 'px';
    newSticker.style.left = Math.random () * 500 + 'px';
    collageArea.appendChild (newSticker);

    // Drag functionality
    newSticker.addEventListener ('mousedown', e => {
      let shiftX = e.clientX - newSticker.getBoundingClientRect ().left;
      let shiftY = e.clientY - newSticker.getBoundingClientRect ().top;

      function moveAt (pageX, pageY) {
        newSticker.style.left = pageX - shiftX - collageArea.offsetLeft + 'px';
        newSticker.style.top = pageY - shiftY - collageArea.offsetTop + 'px';
      }

      function onMouseMove (event) {
        moveAt (event.pageX, event.pageY);
      }

      document.addEventListener ('mousemove', onMouseMove);

      newSticker.onmouseup = function () {
        document.removeEventListener ('mousemove', onMouseMove);
        newSticker.onmouseup = null;
      };
    });

    newSticker.ondragstart = () => false;
  });
});
const addTextBtn = document.getElementById ('addTextBtn');
const customText = document.getElementById ('customText');
const fontSelect = document.getElementById ('fontSelect');
const textColor = document.getElementById ('textColor');
const fontSize = document.getElementById ('fontSize');

addTextBtn.addEventListener ('click', () => {
  if (customText.value.trim () === '') return;

  const textElement = document.createElement ('div');
  textElement.classList.add ('text-item');
  textElement.innerText = customText.value;
  textElement.style.fontFamily = fontSelect.value;
  textElement.style.color = textColor.value;
  textElement.style.fontSize = fontSize.value + 'px';
  textElement.style.top = Math.random () * 200 + 'px';
  textElement.style.left = Math.random () * 400 + 'px';

  collageArea.appendChild (textElement);

  // Drag functionality
  textElement.addEventListener ('mousedown', e => {
    let shiftX = e.clientX - textElement.getBoundingClientRect ().left;
    let shiftY = e.clientY - textElement.getBoundingClientRect ().top;

    function moveAt (pageX, pageY) {
      textElement.style.left = pageX - shiftX - collageArea.offsetLeft + 'px';
      textElement.style.top = pageY - shiftY - collageArea.offsetTop + 'px';
    }

    function onMouseMove (event) {
      moveAt (event.pageX, event.pageY);
    }

    document.addEventListener ('mousemove', onMouseMove);

    textElement.onmouseup = function () {
      document.removeEventListener ('mousemove', onMouseMove);
      textElement.onmouseup = null;
    };
  });

  textElement.ondragstart = () => false;

  customText.value = ''; // reset input
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll ('.gallery-item img');
const lightbox = document.getElementById ('lightbox');
const lightboxImg = document.querySelector ('.lightbox-img');
const closeBtn = document.querySelector ('.lightbox .close');

galleryItems.forEach (img => {
  img.addEventListener ('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener ('click', () => {
  lightbox.style.display = 'none';
});

// Close lightbox on background click
lightbox.addEventListener ('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
// Pricing Toggle
const billingToggle = document.getElementById ('billingToggle');
const prices = document.querySelectorAll ('.price');

billingToggle.addEventListener ('change', () => {
  const yearly = billingToggle.checked;

  prices.forEach (price => {
    const monthlyVal = price.getAttribute ('data-monthly');
    const yearlyVal = price.getAttribute ('data-yearly');

    if (yearly) {
      price.innerHTML = `$${yearlyVal} <span>/yr</span>`;
    } else {
      price.innerHTML = `$${monthlyVal} <span>/mo</span>`;
    }
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll ('.faq-item');

faqItems.forEach (item => {
  const question = item.querySelector ('.faq-question');
  question.addEventListener ('click', () => {
    item.classList.toggle ('active');
  });
});
