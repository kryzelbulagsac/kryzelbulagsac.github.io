document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // SKILLS PROGRESS BAR
  // =========================

  const skillsSection = document.querySelector("#skills");
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            let value = parseInt(bar.getAttribute("aria-valuenow"), 10);

            bar.style.width = value + "%";
            bar.style.transition = "width 1.5s ease-in-out";
          });

          observer.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.5 },
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // =========================
  // PROFILE IMAGE HOVER EFFECT
  // =========================

  const profileImage = document.querySelector(".home-image img");

  if (profileImage) {
    profileImage.addEventListener("mousemove", function (e) {
      const rect = profileImage.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      profileImage.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    profileImage.addEventListener("mouseleave", function () {
      profileImage.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }
});
