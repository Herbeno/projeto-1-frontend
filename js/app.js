import { createRouter } from "./router.js";
import { initMenu } from "./menu.js";
import { initFeedback } from "./feedback.js";
import { initMascaras } from "./mascaras.js";

const outlet = document.getElementById("app");

function initPageFeatures(route) {
  initMenu();
  initFeedback();

  if (route.nav === "cadastro") {
    initMascaras();
  }
}

const router = createRouter({
  outlet,
  onRouteChange: initPageFeatures,
});

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  router.init();
});
