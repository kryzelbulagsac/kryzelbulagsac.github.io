/* =====================================================
   3D GRAPHIC CAROUSEL
===================================================== */

const carouselStage = document.getElementById("carouselStage");

const graphicItems = document.querySelectorAll(".graphic-item");

const previousButton = document.getElementById("carouselPrev");

const nextButton = document.getElementById("carouselNext");

const counter = document.getElementById("carouselCounter");

/* =====================================================
   SETTINGS
===================================================== */

const totalItems = graphicItems.length;

let currentIndex = 0;

/*
   Number of cards visible on each side
   of the center card.

   2 = 5 cards visible:
   [2] [1] [CENTER] [1] [2]
*/

const visibleSideItems = 2;

/* =====================================================
   GET SPACING
===================================================== */

function getSpacing() {
  if (window.innerWidth <= 600) {
    return 115;
  }

  if (window.innerWidth <= 900) {
    return 150;
  }

  return 190;
}

/* =====================================================
   UPDATE CAROUSEL
===================================================== */

function updateCarousel() {
  const spacing = getSpacing();

  graphicItems.forEach((item, index) => {
    /*
       Calculate position relative
       to the current center card.
    */

    let offset = index - currentIndex;

    /*
       Make the carousel circular.

       This allows the first and last
       graphics to connect smoothly.
    */

    if (offset > totalItems / 2) {
      offset -= totalItems;
    }

    if (offset < -totalItems / 2) {
      offset += totalItems;
    }

    /* =================================================
       HIDE CARDS THAT ARE TOO FAR FROM CENTER
    ================================================= */

    if (Math.abs(offset) > visibleSideItems) {
      item.style.opacity = "0";
      item.style.visibility = "hidden";
      item.style.pointerEvents = "none";

      item.style.transform = `
        translateX(${offset > 0 ? 600 : -600}px)
        translateY(0)
        translateZ(-300px)
        rotateY(${offset > 0 ? 45 : -45}deg)
        scale(0.5)
      `;

      return;
    }

    /*
       Make visible again.
    */

    item.style.visibility = "visible";
    item.style.pointerEvents = "auto";

    /* =================================================
       HORIZONTAL POSITION
    ================================================= */

    const x = offset * spacing;

    /* =================================================
       3D ROTATION
    ================================================= */

    const rotateY = offset * -18;

    /* =================================================
       DEPTH
    ================================================= */

    const depth = 1 - Math.abs(offset) * 0.25;

    const translateZ = depth * 100;

    /* =================================================
       SCALE
    ================================================= */

    const scale = 1 - Math.abs(offset) * 0.1;

    /* =================================================
       OPACITY
    ================================================= */

    const opacity = 1 - Math.abs(offset) * 0.18;

    /* =================================================
       VERTICAL POSITION
    ================================================= */

    const y = Math.abs(offset) * 8;

    /* =================================================
       Z-INDEX
    ================================================= */

    const zIndex = 100 - Math.abs(offset);

    /* =================================================
       APPLY TRANSFORM
    ================================================= */

    item.style.transform = `
      translateX(${x}px)
      translateY(${y}px)
      translateZ(${translateZ}px)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;

    item.style.opacity = opacity;

    item.style.zIndex = zIndex;

    /* =================================================
       CENTER CARD
    ================================================= */

    if (offset === 0) {
      item.style.filter = "brightness(1.15)";

      item.style.boxShadow = "0 30px 70px rgba(0,0,0,0.7)";
    } else {
      item.style.filter = "brightness(0.75)";

      item.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5)";
    }
  });

  /* ===================================================
     UPDATE COUNTER
  =================================================== */

  counter.textContent = `${currentIndex + 1} / ${totalItems}`;
}

/* =====================================================
   NEXT
===================================================== */

function nextGraphic() {
  currentIndex++;

  if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  updateCarousel();
}

/* =====================================================
   PREVIOUS
===================================================== */

function previousGraphic() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  }

  updateCarousel();
}

/* =====================================================
   BUTTON EVENTS
===================================================== */

nextButton.addEventListener("click", nextGraphic);

previousButton.addEventListener("click", previousGraphic);

/* =====================================================
   CLICK CARD
===================================================== */

graphicItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;

    updateCarousel();
  });
});

/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextGraphic();
  }

  if (event.key === "ArrowLeft") {
    previousGraphic();
  }
});

/* =====================================================
   RESPONSIVE UPDATE
===================================================== */

window.addEventListener("resize", updateCarousel);

/* =====================================================
   INITIALIZE
===================================================== */

updateCarousel();
