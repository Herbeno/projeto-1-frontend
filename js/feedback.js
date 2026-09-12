document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-privacidade");
  const openModalBtns = document.querySelectorAll("#abrir-modal, #demo-modal");
  const closeModalBtn = document.getElementById("fechar-modal");
  const modalOverlay = modal?.querySelector(".modal__overlay");
  const form = document.querySelector(".form-cadastro");
  const toast = document.getElementById("toast-cadastro");
  const demoToastBtn = document.getElementById("demo-toast");
  let lastFocus = null;

  function abrirModal(trigger) {
    if (!modal) return;
    lastFocus = trigger || document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    closeModalBtn?.focus();
  }

  function fecharModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => abrirModal(btn));
  });

  closeModalBtn?.addEventListener("click", fecharModal);
  modalOverlay?.addEventListener("click", fecharModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      fecharModal();
    }
  });

  function mostrarToast() {
    if (!toast) return;
    toast.classList.add("is-visible");
    setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 4000);
  }

  demoToastBtn?.addEventListener("click", mostrarToast);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarToast();
  });
});
