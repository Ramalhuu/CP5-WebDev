# Rick and Morty - Busca de Personagens

Este é um projeto web simples desenvolvido com React que permite buscar personagens da série Rick and Morty utilizando a [Rick and Morty API](https://rickandmortyapi.com/).

## Funcionalidades

- **Busca de Personagens:** Pesquise personagens pelo nome.
- **Exibição de Resultados:** Visualize uma lista de personagens que correspondem à sua busca.
- **Detalhes do Personagem:** Clique em um personagem para ver informações detalhadas, como espécie, status, gênero, origem e última localização conhecida.

# Acessar:

- link do vercel: [Acesso Vercel](cp-5-web-dev-eta.vercel.app)

## Tecnologias Utilizadas

- **Frontend:** React, Vite
- **Estilização:** Tailwind CSS, shadcn/ui
- **Ícones:** Lucide React
- **API:** [Rick and Morty API](https://rickandmortyapi.com/)

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

1.  **Navegue até o diretório do projeto:**

    ```bash
    cd rick-morty-search
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm run dev
    ```

    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

## Estrutura do Projeto

```
rick-morty-search/
├── public/
├── src/
│   ├── assets/  # Ativos estáticos como imagens
│   ├── components/
│   │   └── ui/  # Componentes de UI do shadcn/ui
│   ├── hooks/  # Hooks React personalizados
│   ├── lib/  # Funções utilitárias e bibliotecas
│   ├── App.css  # Estilos específicos da aplicação
│   ├── App.jsx  # Componente principal da aplicação
│   ├── index.css  # Estilos globais
│   └── main.jsx  # Ponto de entrada da aplicação
├── components.json  # Configuração do shadcn/ui
├── eslint.config.js  # Configuração do ESLint
├── index.html  # Ponto de entrada HTML
├── package.json  # Dependências e scripts do projeto
├── pnpm-lock.yaml  # Arquivo de lock de dependências
└── vite.config.js  # Configuração do bundler Vite
```

## Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## Integrantes 

-Felipe Ramalho RM562148
-Mikael         RM566507 
-Murilo Cruz    RM563743
