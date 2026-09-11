/**
 * Máscaras de entrada para CPF, telefone e CEP.
 * A validação estrutural continua no HTML (pattern, required).
 */
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

document.addEventListener("DOMContentLoaded", () => {
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  if (cpf) {
    cpf.addEventListener("input", () => {
      cpf.value = mascaraCPF(cpf.value);
    });
  }

  if (telefone) {
    telefone.addEventListener("input", () => {
      telefone.value = mascaraTelefone(telefone.value);
    });
  }

  if (cep) {
    cep.addEventListener("input", () => {
      cep.value = mascaraCEP(cep.value);
    });
  }
});
