let menuInitialized = false;

function fecharMenuMobile() {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".menu-toggle");
  if (!nav || !toggle) return;

  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
}

export function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav && !toggle.dataset.bound) {
    toggle.dataset.bound = "true";
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
  }

  if (!menuInitialized) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("[data-link]");
      if (link) {
        fecharMenuMobile();
      }

      const btn = event.target.closest(".nav-dropdown-toggle");
      if (btn) {
        const parent = btn.closest(".nav-item-dropdown");
        const open = parent.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
    });

    menuInitialized = true;
  }
}
