# Big Burguer - Pedidos Hambúrgueres

Sistema completo de pedidos de hambúrgueres desenvolvido com Next.js, Prismic CMS e arquitetura atomic design.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Prismic CMS

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configuração do Banco de Dados Local

O projeto utiliza um banco de dados JSON local para simular uma API. Para rodar:

```bash
# Instalar json-server globalmente (se não tiver)
npm install -g json-server

# Rodar o banco na porta 3002
json-server --watch db.json --port 3002

# OU usar o script do projeto
npm run json-server
```

O banco ficará disponível em: `http://localhost:3002`

**⚠️ IMPORTANTE:** O servidor JSON deve estar rodando para que o carousel de produtos funcione corretamente!

### 3. Configuração do Prismic CMS

#### Acesso ao Prismic

- **Email:** testecolmeiaprismic@gmail.com
- **Senha:** Testecolmeia123@
- **URL:** https://bigburguer.prismic.io

#### Rodando o Slice Machine

```bash
# Iniciar o Slice Machine
npx slice-machine

# O Slice Machine ficará disponível em: http://localhost:9999
```

### 4. Executando o Projeto

```bash
# Rodar em modo desenvolvimento
npm run dev

# O projeto ficará disponível em: http://localhost:3000
```

## Arquitetura do Sistema

### Estrutura de Componentes (Atomic Design)

```
src/components/atomic/
├── atoms/           # Componentes básicos (Button, Input, etc.)
├── molecules/       # Combinação de atoms (CartItem, FormField, etc.)
├── organisms/       # Componentes complexos (Header, CartModal, etc.)
└── templates/       # Layouts de página (PageLayout, CheckoutPage, etc.)
```

### Principais Funcionalidades

1. **Sistema de Autenticação**
   - Login/Registro de usuários
   - Context API para gerenciamento de estado
   - Middleware de autenticação

2. **Carrinho de Compras**
   - Adicionar/remover produtos
   - Controle de quantidade
   - Persistência local
   - Modal de carrinho

3. **Sistema de Pedidos**
   - Checkout completo
   - Formulário de pagamento
   - Integração com Google Maps
   - Histórico de pedidos

4. **CMS com Prismic**
   - Gerenciamento de conteúdo do hero
   - Slice Machine para desenvolvimento
   - Preview de conteúdo

5. **Banco de Dados Local**
   - Simulação de API REST
   - Dados de produtos, usuários e pedidos
   - Endpoints para CRUD completo

### Tecnologias Utilizadas

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Prismic
- **Banco Local:** JSON Server
- **Estado:** Context API + React Query
- **Mapas:** Google Maps API
- **Validação:** Zod

### Estrutura de Pastas

```
src/
├── api/              # Endpoints da API
├── app/              # Páginas do Next.js
├── components/       # Componentes organizados por atomic design
├── contexts/         # Contextos React
├── hooks/            # Custom hooks
├── lib/              # Configurações e utilitários
├── providers/        # Providers React
├── schemas/          # Schemas de validação
├── services/         # Serviços de API
└── types/            # Definições de tipos TypeScript
```

## Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Executar build de produção
npm run lint         # Linter
npm run type-check   # Verificação de tipos
```

## Funcionalidades do Sistema

### Para Usuários

- Navegação por produtos
- Adição ao carrinho
- Processo de checkout
- Acompanhamento de pedidos
- Sistema de login/registro

### Para Administradores

- Gerenciamento de conteúdo via Prismic


## Banco de Dados

O arquivo `db.json` contém:

- **produtos:** Catálogo de hambúrgueres
- **usuarios:** Dados de login
- **pedidos:** Histórico de compras
- **contatos:** Mensagens de contato

### Endpoints da API Local

```
GET    /produtos      # Listar produtos
GET    /usuarios      # Listar usuários
GET    /pedidos       # Listar pedidos
POST   /pedidos       # Criar pedido
PUT    /pedidos/:id   # Atualizar pedido
```

## Customização

### Temas

O sistema suporta modo claro/escuro com toggle automático.

### Componentes

Todos os componentes seguem o padrão atomic design e podem ser facilmente customizados via Tailwind CSS.

## Troubleshooting

### Problemas Comuns

1. **Erro de conexão com Prismic**
   - Verificar credenciais
   - Confirmar acesso ao repositório

2. **Banco JSON não responde**
   - Verificar se está rodando na porta 3001
   - Confirmar arquivo db.json existe

3. **Slice Machine não inicia**
   - Verificar conexão com internet
   - Confirmar permissões do Prismic
