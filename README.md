# FluxoLog 📦

<p align="center">
  <a href="#">
    <img src="src/assets/logo-white.png" alt="FluxoLog Logo" width="200" style="background-color: #ffffff; padding: 15px; border-radius: 10px;">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
</p>

O **FluxoLog** é um sistema web completo para Gestão de Estoque e Controle Financeiro, desenvolvido com foco em arquitetura limpa, segurança e usabilidade. Ele permite que empresas se cadastrem, gerenciem seus produtos (CRUD) e acompanhem métricas financeiras em tempo real através de um painel interativo.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e boas práticas do mercado:

**Frontend:**
* React.js (Componentização e Rotas)
* CSS3 (Estilização responsiva e UI moderna)

**Backend:**
* Node.js com Express (API RESTful)
* Prisma ORM (Mapeamento Objeto-Relacional e modelagem de dados)
* Bcrypt (Criptografia de senhas para segurança)
* Swagger (Documentação interativa da API)
* Jest & Supertest (Testes automatizados de integração)

**Infraestrutura & Banco de Dados:**
* PostgreSQL (Banco de Dados Relacional)
* Docker & Docker Compose (Containerização do banco de dados)

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

---

## 🔧 Como Rodar o Projeto

Siga o passo a passo abaixo para executar o sistema na sua máquina local:

### 1. Subir o Banco de Dados
Na raiz do projeto (onde está o arquivo `docker-compose.yml`), abra o terminal e execute:
```bash
docker-compose up -d

(O banco PostgreSQL iniciará em segundo plano na porta 5435).
```

### 2: Iniciar o Servidor (Backend)
1.Abra o terminal na pasta server.

2.Instale as dependências: npm install

3.Sincronize o banco com o Prisma: npx prisma db push

4.Inicie o servidor:
```bash
node index.js
(Backend rodando em http://localhost:3005).
```
### 3. Iniciar a Interface (Frontend)
1.Abra um terminal na pasta raiz do React.

2.Instale as dependências: npm install

3.Inicie o sistema:
```bash
npm run dev
```
---
### 📖 Documentação da API (Swagger)

Nossa API é totalmente documentada e interativa. Com o backend rodando, você pode visualizar todos os endpoints e testar requisições diretamente pelo navegador.

👉 Acesse: http://localhost:3005/api-docs

---

### 🧪 Testes Automatizados (Jest)

O projeto possui uma suíte de testes de integração para garantir a confiabilidade das regras de negócio (validação de login, duplicidade, etc).

Para rodar os testes, acesse a pasta server e execute:
```bash
npm test
```