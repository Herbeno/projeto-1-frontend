let feedbackInitialized = false;
let lastFocus = null;

function abrirModal(trigger) {
  const modal = document.getElementById("modal-privacidade");
  const closeModalBtn = document.getElementById("fechar-modal");
  if (!modal) return;

  lastFocus = trigger || document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  closeModalBtn?.focus();
}

function fecharModal() {
  const modal = document.getElementById("modal-privacidade");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocus && typeof lastFocus.focus === "function") {
    lastFocus.focus();
  }
}

function mostrarToast() {
  const toast = document.getElementById("toast-cadastro");
  if (!toast) return;

  toast.classList.add("is-visible");
  setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4000);
}

export function initFeedback() {
  const modal = document.getElementById("modal-privacidade");
  const closeModalBtn = document.getElementById("fechar-modal");
  const modalOverlay = modal?.querySelector(".modal__overlay");
  const form = document.querySelector(".form-cadastro");

  document.querySelectorAll("#abrir-modal, #demo-modal").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";
    btn.addEventListener("click", () => abrirModal(btn));
  });

  const demoToastBtn = document.getElementById("demo-toast");
  if (demoToastBtn && !demoToastBtn.dataset.bound) {
    demoToastBtn.dataset.bound = "true";
    demoToastBtn.addEventListener("click", mostrarToast);
  }

  if (form && !form.dataset.bound) {
    form.dataset.bound = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const { validarFormulario } = await import("./validation.js");
      const {
        extrairDadosFormulario,
        salvarCadastro,
        limparRascunho,
        renderHistoricoCadastros,
      } = await import("./storage.js");

      if (validarFormulario(form)) {
        const dados = extrairDadosFormulario(form);
        salvarCadastro(dados);
        limparRascunho();
        renderHistoricoCadastros();
        form.reset();
        mostrarToast();
      }
    });
  }

  if (!feedbackInitialized) {
    closeModalBtn?.addEventListener("click", fecharModal);
    modalOverlay?.addEventListener("click", fecharModal);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal?.classList.contains("is-open")) {
        fecharModal();
      }
    });

    feedbackInitialized = true;
  }
}
