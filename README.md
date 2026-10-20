📋 Chamados IFRN
Sistema web para gerenciamento de chamados de manutenção, desenvolvido
com React e integrado a uma API REST.

O projeto permite consultar, filtrar, cadastrar, visualizar, editar e
excluir chamados de manutenção.
✨ Funcionalidades
- 📋 Listagem de chamados
- 🔎 Busca por título ou descrição
- 🎯 Filtros por:
  - Status
  - Tipo
  - Local
  - Prioridade
- ➕ Criação de novos chamados
- 👁️ Visualização dos detalhes de um chamado
- ✏️ Edição de chamados
- 🗑️ Exclusão de chamados com confirmação
- 📊 Exibição de informações como responsável, solução e datas
- 📱 Layout responsivo para diferentes tamanhos de tela
🛠️ Tecnologias utilizadas
- React
- Vite
- React Router DOM
- Axios
- JavaScript
- CSS

Entre os recursos utilizados estão:
GET    /chamados
GET    /chamados/{id}
POST   /chamados
PUT    /chamados/{id}
DELETE /chamados/{id}
GET    /tipos
GET    /locais
GET    /prioridades
A autenticação da API é realizada por meio da chave configurada na
variável de ambiente VITE_API_KEY.

🖥️ Principais telas
Chamados
Tela principal com busca, filtros e cards dos chamados cadastrados.
Novo chamado
Formulário para cadastrar um novo chamado informando título, descrição,
tipo, local e prioridade.
Detalhes do chamado
Exibe todas as informações do chamado, incluindo status, responsável,
solução e data de resolução quando disponível.
Edição
Permite alterar as informações de um chamado existente.
🔐 Segurança
Informações sensíveis, como chaves de API, não devem ser armazenadas
diretamente no código-fonte.

Imagens do Projeto:
<img width="1853" height="888" alt="image" src="https://github.com/user-attachments/assets/5b9ffba6-b111-49cd-aef2-4e2904f701f3" />
<img width="1850" height="878" alt="image" src="https://github.com/user-attachments/assets/0f94190f-56ee-408e-964a-48c718b3fcdf" />
<img width="1852" height="880" alt="image" src="https://github.com/user-attachments/assets/4299ffc3-d785-4a94-b388-e2ce6495c8c2" />


O projeto utiliza variáveis de ambiente e mantém arquivos .env fora do
controle de versão por meio do .gitignore.
👩‍💻 Autoria
Wygna Vitória Barbosa Ribeiro

Projeto desenvolvido para fins acadêmicos e de aprendizado em
desenvolvimento web.
⭐ Chamados IFRN --- Sistema de gerenciamento de manutenção
