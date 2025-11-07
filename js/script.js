(function () {
  const themeButtons = document.querySelectorAll("[data-theme-switch]");
  const root = document.documentElement;
  const LOCAL_KEY = "bikar_theme_v1";

  function setTheme(theme) {
    if (!theme) return;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(LOCAL_KEY, theme);
  }

  // Initialize
  const saved =
    localStorage.getItem(LOCAL_KEY) ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  setTheme(saved);

  themeButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const t =
        btn.getAttribute("data-theme-switch") ||
        btn.dataset.themeSwitch ||
        btn.getAttribute("data-theme");
      setTheme(t);
    })
  );

  // Mobile Drawer
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileClose = document.getElementById("mobileCloseBtn");
  const mobileCloseArea = document.getElementById("mobileDrawerCloseArea");

  function openDrawer() {
    mobileDrawer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    mobileDrawer.classList.add("hidden");
    document.body.style.overflow = "";
  }
  mobileBtn && mobileBtn.addEventListener("click", openDrawer);
  mobileClose && mobileClose.addEventListener("click", closeDrawer);
  mobileCloseArea && mobileCloseArea.addEventListener("click", closeDrawer);

  // Reveal stagger animation when in viewport
  const revealItems = document.querySelectorAll(".reveal-stagger");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(
            () => el.classList.add("show"),
            Number(el.dataset.delay) || 0
          );
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((i) => io.observe(i));

  // small accessibility: close drawer with escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
})();
