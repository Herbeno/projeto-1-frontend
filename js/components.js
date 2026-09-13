/** Dados de origem dos projetos exibidos na página. */
export const projetos = [
  {
    badge: "educacao",
    badgeLabel: "Educação",
    titulo: "Educação na comunidade",
    imagem: "projeto-educacao",
    alt: "Crianças em atividade de reforço escolar em sala comunitária",
    legenda: "Reforço escolar e letramento para crianças e adolescentes.",
    descricao:
      "Oficinas de reforço escolar, leitura e apoio a famílias com dificuldade de acesso digital aos serviços públicos.",
  },
  {
    badge: "alimentacao",
    badgeLabel: "Alimentação",
    titulo: "Cestas e cozinha solidária",
    imagem: "projeto-alimentacao",
    alt: "Voluntários organizando cestas básicas em depósito da ONG",
    legenda: "Distribuição mensal de alimentos e refeições em dias de mutirão.",
    descricao:
      "Campanhas de arrecadação, montagem de cestas e entrega em bairros priorizados pelo mapeamento social.",
  },
  {
    badge: "acolhimento",
    badgeLabel: "Acolhimento",
    titulo: "Acolhimento e orientação",
    imagem: "projeto-acolhimento",
    alt: "Atendimento de orientação social a família em espaço da ONG",
    legenda: "Escuta, encaminhamento e apoio a documentação.",
    descricao:
      "Atendimento psicossocial, encaminhamento a serviços públicos e apoio na regularização de documentos.",
  },
];

function cardTemplate(projeto) {
  return `
    <article class="card-projeto">
      <span class="badge badge--${projeto.badge}">${projeto.badgeLabel}</span>
      <h3>${projeto.titulo}</h3>
      <figure>
        <picture>
          <source srcset="img/${projeto.imagem}.webp" type="image/webp">
          <img src="img/${projeto.imagem}.jpg" alt="${projeto.alt}" width="400" height="260">
        </picture>
        <figcaption>${projeto.legenda}</figcaption>
      </figure>
      <p>${projeto.descricao}</p>
    </article>
  `;
}

/** Gera os cards dinamicamente e injeta no DOM. */
export function renderProjetos() {
  const container = document.getElementById("lista-projetos");
  if (!container) return;

  const html = projetos.map(cardTemplate).join("");
  container.innerHTML = html;
}
