// Estado da aplicação (Compartilhado entre os módulos)
export const tarefas = [];
export let estadoModal = {
    indiceEditando: null
};

export function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

export function carregarTarefas(renderCallback) {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas !== null) {
        const tarefasConvertidas = JSON.parse(tarefasSalvas);
        tarefas.push(...tarefasConvertidas);
        renderCallback(); // Renderiza a tela após carregar os dados
    }
}