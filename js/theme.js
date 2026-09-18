const THEME_KEY = "ong-tema";

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  localStorage.setItem(THEME_KEY, tema);

  document.querySelectorAll(".theme-btn").forEach((btn) => {
    const ativo = btn.id === `theme-${tema}`;
    btn.setAttribute("aria-pressed", ativo ? "true" : "false");
  });
}

export function initTheme() {
  const salvo = localStorage.getItem(THEME_KEY);
  const preferido = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  aplicarTema(salvo || preferido);

  if (document.body.dataset.themeBound) return;
  document.body.dataset.themeBound = "true";

  document.getElementById("theme-light")?.addEventListener("click", () => aplicarTema("light"));
  document.getElementById("theme-dark")?.addEventListener("click", () => aplicarTema("dark"));
  document.getElementById("theme-contrast")?.addEventListener("click", () => aplicarTema("contrast"));
}
