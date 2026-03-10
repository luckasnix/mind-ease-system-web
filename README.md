# MindEase

Sistema de gestão cognitiva para bem-estar mental.

## Tecnologias utilizadas

Este projeto foi construído com:

- Vite
- TypeScript
- React
- Shadcn UI
- Tailwind CSS

## Pré-requisitos

- [Node.js](https://nodejs.org/) v24 ou superior
- npm (incluso com o Node.js)

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/luckasnix/mind-ease-system-web.git
cd mind-ease-system-web
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais do Supabase:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com os valores correspondentes ao seu projeto:

```env
VITE_SUPABASE_URL="https://<seu-projeto>.supabase.co"
VITE_SUPABASE_ANON_KEY="<sua-chave-anonima>"
```

As credenciais podem ser encontradas no painel do [Supabase](https://supabase.com/dashboard), em **Project Settings > API**.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Pré-visualiza o build de produção localmente |
| `npm run lint` | Executa o linter (ESLint) |
| `npm run typecheck` | Verifica os tipos TypeScript |
| `npm run ci` | Executa lint, typecheck e build em sequência |
