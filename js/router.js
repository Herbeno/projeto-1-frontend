import { routes, loadTemplate } from "./templates.js";

/**
 * Router da SPA — intercepta navegação e injeta conteúdo no #app.
 */
export function createRouter({ outlet, onRouteChange }) {
  function parseHash() {
    const raw = window.location.hash.replace(/^#/, "") || "/";
    const [path, anchor] = raw.split("#");
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return { path: normalized, anchor: anchor || null };
  }

  function updateNav(routeKey) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const isActive = link.dataset.nav === routeKey;
      link.toggleAttribute("aria-current", isActive);
    });
  }

  async function render(path, anchor) {
    const route = routes[path];
    if (!route) {
      window.location.hash = "#/";
      return;
    }

    const html = await loadTemplate(route.template);

    outlet.className = route.mainClass || "";
    outlet.innerHTML = html;
    document.title = `ONG Esperança Solidária | ${route.title}`;

    updateNav(route.nav);

    if (anchor) {
      const target = document.getElementById(anchor);
      target?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    onRouteChange?.(route);
  }

  function navigate(path, anchor = null) {
    const hash = anchor ? `#${path}#${anchor}` : `#${path}`;
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      render(path, anchor);
    }
  }

  function handleLinkClick(event) {
    const link = event.target.closest("[data-link]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#/")) return;

    event.preventDefault();
    const raw = href.replace(/^#/, "");
    const [path, anchor] = raw.split("#");
    navigate(path.startsWith("/") ? path : `/${path}`, anchor || null);
  }

  function handleHashChange() {
    const { path, anchor } = parseHash();
    render(path, anchor);
  }

  function init() {
    document.addEventListener("click", handleLinkClick);
    window.addEventListener("hashchange", handleHashChange);

    if (!window.location.hash) {
      window.location.hash = "#/";
    } else {
      handleHashChange();
    }
  }

  return { init, navigate };
}
