import { tarefas, salvarTarefas, carregarTarefas } from './core/storage.js';
import { limparFormulario } from './utils/helpers.js';
import { configurarModal, abrirModalEdicao } from './components/modal.js';
import { inicializarSidebar } from './components/sidebar.js';

let filtroCategoriaAtual = "todas"; 

// Elementos de criação
const input = document.getElementById("task-input");
const descricaoInput = document.getElementById("task-description");
const categoriaInput = document.getElementById("task-category");
const prioridadeInput = document.getElementById("task-priority");
const btn = document.getElementById("add-task-btn");
const lista = document.getElementById("task-list");

// Evento para adicionar nova tarefa
btn.addEventListener("click", () => {
    const textoTarefa = input.value.trim();
    const descricao = descricaoInput.value.trim();
    const categoria = categoriaInput.value;
    const prioridade = prioridadeInput.value;

    if (textoTarefa === "") {
        console.warn("Digite uma tarefa.");
        return;
    }

    tarefas.push({
        texto: textoTarefa,
        descricao: descricao,
        concluido: false,
        prioridade: prioridade,
        categoria: categoria,
        dataCriacao: new Date().toLocaleDateString("pt-BR"),
        subtarefas: [] 
    });

    salvarTarefas();
    renderizarTarefas();
    limparFormulario();
});

export function renderizarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        //console.log("Filtro do Botão clicado:", filtroCategoriaAtual);
        //console.log("Categoria salva na Tarefa:", tarefa.categoria);
        if (filtroCategoriaAtual.toLowerCase() === "todas") {
        // Não faz nada, deixa passar para renderizar
        } 
        // 2. Se NÃO for "todas", aí sim ele checa se a categoria da tarefa é diferente do filtro
        else if (tarefa.categoria.toLowerCase() !== filtroCategoriaAtual.toLowerCase()) {
        return; // Esconde a tarefa
        }

        const novaTarefa = document.createElement("li");
        novaTarefa.classList.add("task-item"); 
        if (tarefa.concluido) novaTarefa.classList.add("task-completed");
        
        const mainContent = document.createElement("div");
        mainContent.classList.add("task-main-content");

        const infoTarefa = document.createElement("div");
        infoTarefa.classList.add("task-info");
        
        const textoTarefa = document.createElement("span");
        textoTarefa.classList.add("task-text");
        textoTarefa.textContent = tarefa.texto;

        const descricao = document.createElement("p");
        descricao.classList.add("task-description");
        descricao.textContent = tarefa.descricao;

        const categoria = document.createElement("small");
        categoria.textContent = `Categoria: ${tarefa.categoria}`;

        const prioridade = document.createElement("small");
        prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

        const data = document.createElement("small");
        data.textContent = `Criada em: ${tarefa.dataCriacao}`;

        infoTarefa.appendChild(textoTarefa);
        if (tarefa.descricao) infoTarefa.appendChild(descricao); 
        infoTarefa.appendChild(categoria);
        infoTarefa.appendChild(prioridade);
        infoTarefa.appendChild(data);

        const acoes = document.createElement("div");
        acoes.classList.add("task-actions");

        const btnConcluido = document.createElement("input");
        btnConcluido.type = "checkbox";
        btnConcluido.checked = tarefa.concluido;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        
        btnConcluido.addEventListener("change", () => {
            tarefa.concluido = !tarefa.concluido;
            salvarTarefas();
            renderizarTarefas();
        });

        btnExcluir.addEventListener("click", () => {
            tarefas.splice(indice, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        // Chama o componente isolado do Modal
        btnEditar.addEventListener("click", () => {
            abrirModalEdicao(indice, tarefa);
        });

        acoes.appendChild(btnConcluido);
        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);

        mainContent.appendChild(infoTarefa);
        mainContent.appendChild(acoes);
        novaTarefa.appendChild(mainContent);

        // SEÇÃO DE SUBTAREFAS
        const subtaskSection = document.createElement("div");
        subtaskSection.classList.add("subtask-section");

        const subtaskList = document.createElement("ul");
        subtaskList.classList.add("subtask-list");

        tarefa.subtarefas.forEach((subtask, subIndice) => {
            const subtaskLi = document.createElement("li");
            if (subtask.concluido) subtaskLi.classList.add("subtask-completed");

            const subCheck = document.createElement("input");
            subCheck.type = "checkbox";
            subCheck.checked = subtask.concluido;
            subCheck.addEventListener("change", () => {
                subtask.concluido = !subtask.concluido;
                salvarTarefas();
                renderizarTarefas();
            });

            const subTexto = document.createElement("span");
            subTexto.textContent = subtask.texto;

            const btnDeleteSub = document.createElement("button");
            btnDeleteSub.textContent = "✕";
            btnDeleteSub.classList.add("btn-delete-sub");
            btnDeleteSub.addEventListener("click", () => {
                tarefa.subtarefas.splice(subIndice, 1);
                salvarTarefas();
                renderizarTarefas();
            });

            subtaskLi.appendChild(subCheck);
            subtaskLi.appendChild(subTexto);
            subtaskLi.appendChild(btnDeleteSub);
            subtaskList.appendChild(subtaskLi);
        });

        const subtaskForm = document.createElement("div");
        subtaskForm.classList.add("subtask-input-container");

        const subtaskInput = document.createElement("input");
        subtaskInput.type = "text";
        subtaskInput.placeholder = "+ Adicionar subtarefa";

        subtaskInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && subtaskInput.value.trim() !== "") {
                tarefa.subtarefas.push({
                    texto: subtaskInput.value.trim(),
                    concluido: false
                });
                salvarTarefas();
                renderizarTarefas();
            }
        });

        subtaskForm.appendChild(subtaskInput);
        subtaskSection.appendChild(subtaskList);
        subtaskSection.appendChild(subtaskForm);
        novaTarefa.appendChild(subtaskSection);

        lista.appendChild(novaTarefa);
    });
}

// INICIALIZAÇÃO DA APLICAÇÃO
inicializarSidebar((categoriaSelecionada) => {
    filtroCategoriaAtual = categoriaSelecionada;
    renderizarTarefas();
});

configurarModal(renderizarTarefas);
carregarTarefas(renderizarTarefas);