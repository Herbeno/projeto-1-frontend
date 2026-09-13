const REGEX = {
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  telefone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  cep: /^\d{5}-\d{3}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

const MENSAGENS = {
  obrigatorio: "Este campo é obrigatório.",
  nome: "Informe pelo menos 3 caracteres.",
  email: "Informe um e-mail válido.",
  cpf: "CPF no formato 000.000.000-00.",
  telefone: "Telefone no formato (00) 00000-0000.",
  cep: "CEP no formato 00000-000.",
  rua: "Informe o nome da rua.",
  cidade: "Informe a cidade.",
  estado: "Selecione um estado.",
  tipo: "Selecione como deseja ajudar.",
};

function getMsgEl(campo) {
  const grupo = campo.closest("p, .form-radio-group");
  if (!grupo) return null;

  let msg = grupo.querySelector(".field-msg");
  if (!msg) {
    msg = document.createElement("span");
    msg.className = "field-msg";
    msg.setAttribute("aria-live", "polite");
    grupo.appendChild(msg);
  }
  return msg;
}

function marcarEstado(campo, valido, mensagem = "") {
  const msg = getMsgEl(campo);
  campo.classList.toggle("field--error", !valido);
  campo.classList.toggle("field--success", valido && campo.value.trim() !== "");

  if (msg) {
    msg.textContent = valido ? "" : mensagem;
    msg.className = valido ? "field-msg" : "field-msg field-msg--error";
  }
}

function validarCampo(campo) {
  const { id, value } = campo;
  const texto = value.trim();

  if (campo.type === "radio") {
    const grupo = document.querySelector('input[name="tipo"]:checked');
    const ok = Boolean(grupo);
    const container = document.querySelector(".form-radio-group");
    const msg = container?.querySelector(".field-msg") || (() => {
      const span = document.createElement("span");
      span.className = "field-msg";
      span.setAttribute("aria-live", "polite");
      container?.appendChild(span);
      return span;
    })();
    if (msg) {
      msg.textContent = ok ? "" : MENSAGENS.tipo;
      msg.className = ok ? "field-msg" : "field-msg field-msg--error";
    }
    return ok;
  }

  if (campo.required && !texto) {
    marcarEstado(campo, false, MENSAGENS.obrigatorio);
    return false;
  }

  let valido = true;
  let mensagem = "";

  switch (id) {
    case "nome":
      valido = texto.length >= 3;
      mensagem = MENSAGENS.nome;
      break;
    case "email":
      valido = REGEX.email.test(texto);
      mensagem = MENSAGENS.email;
      break;
    case "cpf":
      valido = REGEX.cpf.test(texto);
      mensagem = MENSAGENS.cpf;
      break;
    case "telefone":
      valido = REGEX.telefone.test(texto);
      mensagem = MENSAGENS.telefone;
      break;
    case "cep":
      valido = REGEX.cep.test(texto);
      mensagem = MENSAGENS.cep;
      break;
    case "rua":
      valido = texto.length >= 3;
      mensagem = MENSAGENS.rua;
      break;
    case "cidade":
      valido = texto.length >= 2;
      mensagem = MENSAGENS.cidade;
      break;
    case "estado":
      valido = texto !== "";
      mensagem = MENSAGENS.estado;
      break;
    default:
      valido = campo.checkValidity();
      mensagem = campo.title || MENSAGENS.obrigatorio;
  }

  marcarEstado(campo, valido, mensagem);
  return valido;
}

export function validarFormulario(form) {
  const campos = form.querySelectorAll("input, select, textarea");
  let valido = true;

  validarCampo(document.querySelector('input[name="tipo"]') || campos[0]);
  const tipoOk = document.querySelector('input[name="tipo"]:checked');
  if (!tipoOk) valido = false;

  campos.forEach((campo) => {
    if (campo.type === "radio") return;
    if (!validarCampo(campo)) valido = false;
  });

  const alerta = document.getElementById("form-alert");
  if (alerta) {
    alerta.hidden = valido;
    alerta.textContent = valido
      ? ""
      : "Revise os campos destacados em vermelho antes de enviar.";
  }

  return valido;
}

export function initValidation() {
  const form = document.querySelector(".form-cadastro");
  if (!form || form.dataset.validationBound) return;

  form.dataset.validationBound = "true";

  if (!document.getElementById("form-alert")) {
    const alerta = document.createElement("div");
    alerta.id = "form-alert";
    alerta.className = "alert alert--error";
    alerta.role = "alert";
    alerta.hidden = true;
    form.prepend(alerta);
  }

  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    if (campo.type === "radio") {
      campo.addEventListener("change", () => validarCampo(campo));
      return;
    }
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
      if (campo.classList.contains("field--error")) {
        validarCampo(campo);
      }
    });
  });

  form.addEventListener("reset", () => {
    form.querySelectorAll(".field--error, .field--success").forEach((el) => {
      el.classList.remove("field--error", "field--success");
    });
    form.querySelectorAll(".field-msg").forEach((msg) => {
      msg.textContent = "";
      msg.className = "field-msg";
    });
    const alerta = document.getElementById("form-alert");
    if (alerta) alerta.hidden = true;
  });
}
