import { tarefas, estadoModal, salvarTarefas } from '../core/storage.js';

// Elementos do modal de edição
const modal = document.getElementById("edit-modal"); 
const editInput = document.getElementById("edit-task-input");
const editDescricaoInput = document.getElementById("edit-task-description");
const editCategoriaInput = document.getElementById("edit-task-category");
const editPrioridadeInput = document.getElementById("edit-task-priority"); 
const btnSalvarEdicao = document.getElementById("save-edit-btn");
const btnFecharModal = document.getElementById("close-modal-btn");

export function configurarModal(renderizarTarefasCallback) {
    // Salvar modificações do Modal
    btnSalvarEdicao.addEventListener("click", () => {
        if (estadoModal.indiceEditando !== null) {
            tarefas[estadoModal.indiceEditando].texto = editInput.value.trim();
            tarefas[estadoModal.indiceEditando].descricao = editDescricaoInput.value.trim();
            tarefas[estadoModal.indiceEditando].categoria = editCategoriaInput.value;
            tarefas[estadoModal.indiceEditando].prioridade = editPrioridadeInput.value;

            estadoModal.indiceEditando = null;
            modal.close(); 
            salvarTarefas();
            renderizarTarefasCallback(); 
        }
    });

    // Fecha o Modal sem salvar
    btnFecharModal.addEventListener("click", () => {
        estadoModal.indiceEditando = null;
        modal.close();
    });
}

// Abre o modal populando com os dados atuais da tarefa
export function abrirModalEdicao(indice, tarefa) {
    editInput.value = tarefa.texto;
    editDescricaoInput.value = tarefa.descricao;
    editCategoriaInput.value = tarefa.categoria;
    editPrioridadeInput.value = tarefa.prioridade;

    estadoModal.indiceEditando = indice;
    modal.showModal();
}