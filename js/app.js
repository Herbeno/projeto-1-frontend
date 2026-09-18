import { createRouter } from "./router.js";
import { initMenu } from "./menu.js";
import { initFeedback } from "./feedback.js";
import { initMascaras } from "./mascaras.js";
import { renderProjetos } from "./components.js";
import { initValidation } from "./validation.js";
import { initStorage } from "./storage.js";
import { initTheme } from "./theme.js";

const outlet = document.getElementById("app");

function initPageFeatures(route) {
  initMenu();
  initFeedback();

  if (route.nav === "projetos") {
    renderProjetos();
  }

  if (route.nav === "cadastro") {
    initMascaras();
    initValidation();
    initStorage();
  }
}

const router = createRouter({
  outlet,
  onRouteChange: initPageFeatures,
});

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenu();
  router.init();
});
