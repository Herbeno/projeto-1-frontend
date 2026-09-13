/**
 * Mapa de rotas e metadados das views da SPA.
 * O conteúdo HTML de cada página está em html/*.html.
 */
export const routes = {
  "/": {
    template: "html/inicio.html",
    title: "Início",
    mainClass: "layout-12",
    nav: "inicio",
  },
  "/projetos": {
    template: "html/projetos.html",
    title: "Projetos",
    mainClass: "",
    nav: "projetos",
  },
  "/cadastro": {
    template: "html/cadastro.html",
    title: "Cadastro",
    mainClass: "page-cadastro",
    nav: "cadastro",
  },
};

const cache = new Map();

export async function loadTemplate(path) {
  if (cache.has(path)) {
    return cache.get(path);
  }

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Não foi possível carregar o template: ${path}`);
  }

  const html = await response.text();
  cache.set(path, html);
  return html;
}
