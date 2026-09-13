function mascaraCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function mascaraTelefone(valor) {
  const n = valor.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return n.replace(/(\d{0,2})/, "($1");
  if (n.length <= 6) return n.replace(/(\d{2})(\d{0,4})/, "($1) $2");
  if (n.length <= 10) return n.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return n.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

function mascaraCEP(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{1,3})$/, "$1-$2")
    .slice(0, 9);
}

export function initMascaras() {
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  if (cpf && !cpf.dataset.bound) {
    cpf.dataset.bound = "true";
    cpf.addEventListener("input", () => {
      cpf.value = mascaraCPF(cpf.value);
    });
  }

  if (telefone && !telefone.dataset.bound) {
    telefone.dataset.bound = "true";
    telefone.addEventListener("input", () => {
      telefone.value = mascaraTelefone(telefone.value);
    });
  }

  if (cep && !cep.dataset.bound) {
    cep.dataset.bound = "true";
    cep.addEventListener("input", () => {
      cep.value = mascaraCEP(cep.value);
    });
  }
}
