export function inicializarSidebar(aoFilterCategoria) {
    const btnMenu = document.getElementById("toggle-sidebar-btn");
    const sidebar = document.getElementById("sidebar");

    // Abre e fechar o menu
    btnMenu.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    }); 

    // capturar os botões da categoria
    const botoesMenu = document.querySelectorAll("#sidebar .nav-btn");

    botoesMenu.forEach(botao => {
        //Remove a classe 'active de todos os botões para limpar o destaque
        botao.addEventListener("click", () => {
            botoesMenu.forEach(b => b.classList.remove("active"));
            //adiciona destaque apenas no que foi clicado
            botao.classList.add("active");

            // Pega o valor do data-filter-category
            const categoriaSelecionada = botao.dataset.filterCategory;
            if (aoFilterCategoria && categoriaSelecionada) {
                aoFilterCategoria(categoriaSelecionada);
            }
        });
    });
}

