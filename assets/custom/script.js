document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector("#skills"); // Change this to the actual ID of your skills section
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            let value = parseInt(bar.getAttribute("aria-valuenow"), 10); // Ensure it's a number
            bar.style.width = value + "%"; // Apply width correctly
            bar.style.transition = "width 1.5s ease-in-out"; // Smooth animation
          });
          observer.unobserve(skillsSection); // Stop observing after animation
        }
      });
    },
    { threshold: 0.5 } // Adjust this to control when the animation starts (50% visible)
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }
});
