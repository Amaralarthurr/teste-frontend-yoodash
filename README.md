# Teste Frontend Marvel Yoodash

## Funcionalidades

- **Listagem de Personagens**: Grid responsivo com 20 personagens por página
- **Busca**: Filtro por nome dos personagens
- **Favoritos**: Sistema de favoritos com limite de 5 personagens
- **Ordenação**: Ordenação alfabética A-Z / Z-A
- **Detalhes**: Página individual com informações detalhadas, quadrinhos e estatísticas
- **Responsivo**: Interface adaptável para desktop e mobile

## Tecnologias

- **Next.js** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Marvel API** - Dados dos personagens
- **LocalStorage** - Persistência de favoritos

## Instalação

# Clone o repositório

# Instale as dependências
npm install
npm install lucide-react

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o projeto
npm run dev

## Configuração

Adicione suas chaves da API Marvel no arquivo \`.env.local\`:

MARVEL_PUBLIC_KEY=sua_chave_publica
MARVEL_PRIVATE_KEY=sua_chave_privada

## Funcionalidades Principais

### Sistema de Favoritos
- Máximo de 5 personagens favoritos
- Persistência via localStorage
- Sincronização entre páginas
- Toggle visual para filtrar apenas favoritos

### Busca e Filtros
- Busca por nome com debounce
- Ordenação alfabética via API
- Filtro de favoritos com indicadores visuais

### Página de Detalhes
- Informações completas do personagem
- Galeria de quadrinhos (últimos 10)
- Estatísticas (quadrinhos, filmes, rating)
- Barra de busca integrada

---

## Considerações

Até certo ponto do desenvolvimento desse código, estava tudo funcionando perfeitamente. Todos os personagens da API, a pesquisa por nome, a paginação dos personagens, na página de cada personagem, seus últimos quadrinhos... tudo estava perfeito. umas 14 horas depois, fui olhar o código de novo apenas para ver se tudo estava funcionando, e de repente não funcionava mais, dizia algo sobre a chave da API. Tentei de todas as formas consertar, mas depois disso, não voltou mais a puxar os dados da API, então na página principal criei mocks dos primeiros 20 personagens para uma melhor experiência do usuário. Realmente estava tudo funcionando e parou do nada, espero que considere com carinho esse teste. Obrigado! 

## Resposta Técnica: Gerenciamento de Estado com Redux/Zustand

**Como você lidaria com o limite de 5 favoritos se estivesse usando Redux ou Zustand?**

Com **Redux**, eu criaria um slice específico para favoritos com actions como \`addFavorite\`, \`removeFavorite\` e \`toggleFavorite\`. O reducer verificaria o limite antes de adicionar novos favoritos, retornando o estado atual se o limite fosse excedido. Utilizaria middleware como Redux Persist para sincronizar com localStorage automaticamente, e selectors para computar estados derivados como \`canAddFavorite\` e \`favoritesCount\`.

Com **Zustand**, a implementação seria mais direta. Criaria um store com estado \`favorites: number[]\` e actions que encapsulam a lógica de limite. A função \`addFavorite\` verificaria \`favorites.length < 5\` antes de adicionar, e utilizaria o middleware \`persist\` para localStorage. Zustand oferece melhor developer experience com menos boilerplate, sendo ideal para este caso de uso específico onde não precisamos de toda a complexidade do Redux.

Ambas as soluções garantiriam consistência de estado, mas Zustand seria minha escolha pela simplicidade e performance, especialmente considerando que o sistema de favoritos é uma funcionalidade relativamente isolada que não requer o ecossistema completo do Redux.
