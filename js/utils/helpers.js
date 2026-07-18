const input = document.getElementById("task-input");
const descricaoInput = document.getElementById("task-description");
const categoriaInput = document.getElementById("task-category");
const prioridadeInput = document.getElementById("task-priority");

export function limparFormulario() {
    input.value = "";
    descricaoInput.value = "";
    categoriaInput.value = "Estudos"; // Defina o valor padrão do seu HTML select
    prioridadeInput.value = "Alta";   // Defina o valor padrão do seu HTML select
    input.focus();
}