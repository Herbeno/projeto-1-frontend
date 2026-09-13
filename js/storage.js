import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm";
import ptBr from "https://cdn.jsdelivr.net/npm/dayjs@1.11.13/locale/pt-br.js/+esm";

dayjs.locale(ptBr);

const CHAVE_RASCUNHO = "ong-cadastro-rascunho";
const CHAVE_CADASTROS = "ong-cadastros";

/** Extrai os dados do formulário como objeto JavaScript. */
export function extrairDadosFormulario(form) {
  const dados = {};
  const formData = new FormData(form);

  formData.forEach((valor, chave) => {
    dados[chave] = valor;
  });

  return dados;
}

/** Grava rascunho do formulário no localStorage. */
export function salvarRascunho(dados) {
  localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

/** Recupera rascunho salvo ou retorna null. */
export function carregarRascunho() {
  const salvo = localStorage.getItem(CHAVE_RASCUNHO);
  if (!salvo) return null;

  try {
    return JSON.parse(salvo);
  } catch {
    return null;
  }
}

/** Remove rascunho após envio bem-sucedido. */
export function limparRascunho() {
  localStorage.removeItem(CHAVE_RASCUNHO);
}

/** Adiciona cadastro validado à lista persistente. */
export function salvarCadastro(dados) {
  const lista = listarCadastros();
  const registro = {
    ...dados,
    id: Date.now(),
    dataEnvio: new Date().toISOString(),
  };

  lista.push(registro);
  localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(lista));
  return registro;
}

/** Recupera array de cadastros do localStorage. */
export function listarCadastros() {
  const salvo = localStorage.getItem(CHAVE_CADASTROS);
  if (!salvo) return [];

  try {
    const lista = JSON.parse(salvo);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

/** Restaura rascunho nos campos do formulário. */
export function restaurarFormulario(form, dados) {
  if (!dados) return;

  Object.entries(dados).forEach(([chave, valor]) => {
    const campo = form.elements[chave];
    if (!campo) return;

    if (campo.type === "radio") {
      const radio = form.querySelector(`input[name="${chave}"][value="${valor}"]`);
      if (radio) radio.checked = true;
      return;
    }

    campo.value = valor;
  });
}

/** Renderiza histórico de cadastros salvos na página. */
export function renderHistoricoCadastros() {
  const container = document.getElementById("historico-cadastros");
  const listaEl = document.getElementById("lista-cadastros");
  if (!container || !listaEl) return;

  const cadastros = listarCadastros();

  if (cadastros.length === 0) {
    container.hidden = true;
    return;
  }

  container.hidden = false;
  listaEl.innerHTML = cadastros
    .map(
      (item) => `
        <li>
          <strong>${item.nome}</strong> — ${item.tipo === "doador" ? "Doador(a)" : "Voluntário(a)"}
          <small>(${dayjs(item.dataEnvio).format("DD/MM/YYYY [às] HH:mm")})</small>
        </li>
      `
    )
    .join("");
}

/** Inicializa persistência: restaura rascunho e escuta alterações. */
export function initStorage() {
  const form = document.querySelector(".form-cadastro");
  if (!form || form.dataset.storageBound) return;

  form.dataset.storageBound = "true";

  const rascunho = carregarRascunho();
  restaurarFormulario(form, rascunho);
  renderHistoricoCadastros();

  form.addEventListener("input", () => {
    salvarRascunho(extrairDadosFormulario(form));
  });

  form.addEventListener("change", () => {
    salvarRascunho(extrairDadosFormulario(form));
  });
}
