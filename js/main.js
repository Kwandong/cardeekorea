const revealTargets = document.querySelectorAll(
  ".hero-text,.hero-image,.statement,.feature-copy,.feature-media,.side-copy,.side-image,.full-visual img,.overlay-copy,.section-head,.video-frame,.daily img,.daily div,.color-stage,.korea figure,.korea div,.quote,.buy"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

document.addEventListener("visibilitychange", () => {
  document.querySelectorAll("video").forEach((video) => {
    if (document.hidden) video.pause();
    else if (video.hasAttribute("autoplay")) video.play().catch(() => {});
  });
});

// Color swiper: pure JavaScript, no external library
(() => {
  const section = document.querySelector(".color-swiper-section");
  if (!section) return;

  const track = section.querySelector(".swiper-track");
  const slides = Array.from(section.querySelectorAll(".color-slide"));
  const prev = section.querySelector(".swiper-arrow.prev");
  const next = section.querySelector(".swiper-arrow.next");
  const dots = Array.from(section.querySelectorAll(".swiper-dots button"));
  const title = section.querySelector("#swiperColorTitle");
  const desc = section.querySelector("#swiperColorDesc");

  const colorTheme = {
    "Carbon Black": "#1F1F1F",
    "Burgundy Red": "#922F3B",
    "Deep Blue": "#2D465A"
  };

  let current = 0;

  function render(index) {
    current = (index + slides.length) % slides.length;

    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });

    const active = slides[current];

    if (title) {
      title.textContent = active.dataset.title;
      title.style.color = colorTheme[active.dataset.title] || "#222222";
    }

    if (desc) {
      desc.textContent = active.dataset.desc;
      desc.style.color = "#666666";
    }
  }

  prev?.addEventListener("click", () => render(current - 1));
  next?.addEventListener("click", () => render(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => render(i));
  });

  let startX = 0;
  let isDragging = false;

  track.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    isDragging = true;
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    const diff = event.clientX - startX;
    isDragging = false;

    if (Math.abs(diff) > 45) {
      render(diff < 0 ? current + 1 : current - 1);
    }
  });

  render(0);
})();

// Coming soon modal for purchase button
(() => {
  const buyBtn = document.getElementById("buyBtn");
  const modal = document.getElementById("buyModal");
  const closeBtn = document.getElementById("buyModalClose");
  const confirmBtn = document.getElementById("buyModalConfirm");

  if (!buyBtn || !modal) return;

  const openModal = () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    confirmBtn?.focus();
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    buyBtn.focus();
  };

  buyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener("click", closeModal);
  confirmBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
})();
