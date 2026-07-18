# TaskFlow
O **TaskFlow** é um gerenciador de tarefas acadêmicas e pessoais projetado sob o conceito de *Dark Mode* minimalista de alto contraste. Focado em produtividade e usabilidade, o aplicativo oferece uma interface limpa, livre de poluição visual, ideal para organizar rotinas de estudos e projetos sem distrações.

### 🎨 Design e Interface (UI/UX)

* **Identidade Visual Moderna:** Construída em tons de grafite escuro com detalhes em roxo indigo neon, garantindo conforto visual para longas jornadas de uso.
* **Menu Lateral Retrátil (Sidebar):** Uma barra de navegação fluida que se oculta por completo por meio de transições CSS otimizadas, ampliando a área útil de foco do usuário.
* **Visualização Escaneável:** Organização em cartões (*cards*) que destacam prazos, prioridades e tags num relance de olhos.

### ⚙️ Funcionalidades e Engenharia

* **Filtro por Categorias:** Sistema baseado em *Data Attributes* integrado ao JavaScript, permitindo alternar instantaneamente a visualização entre "Todas as Tarefas" ou focos específicos (como *Estudos*, *Trabalho* e *Pessoal*).
* **Gerenciamento de Subtarefas:** Possibilidade de quebrar grandes metas em passos menores com *checklists* internos para cada tarefa principal.
* **Edição via Modal Semântico:** Uso da tag `<dialog>` para ajustar títulos, descrições e prioridades de forma isolada, rápida e sem recarregar a página.
* **Persistência com LocalStorage:** Salvamento automático no navegador para garantir que nenhum dado seja perdido ao fechar o aplicativo.

### 💻 Arquitetura do Projeto

Desenvolvido sob o princípio de **responsabilidade única**, o TaskFlow separa rigorosamente suas camadas: o HTML estrutura a semântica, o CSS gerencia o layout responsivo e as animações, e o JavaScript atua de forma modularizada (usando `import`/`export`). O uso de boas práticas como o *early return* garante um código limpo, rápido e escalável, pronto para futuras implementações.
