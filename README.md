# Projeto Antenas (Front-End)

![logo](public/apple-touch-icon.png)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub](https://img.shields.io/github/license/mrocha98/projeto-antenas-react?color=%23)
![GitHub repo size](https://img.shields.io/github/repo-size/mrocha98/projeto-antenas-react?color=%23)
![GitHub language count](https://img.shields.io/github/languages/count/mrocha98/projeto-antenas-react?color=%23)
![GitHub top language](https://img.shields.io/github/languages/top/mrocha98/projeto-antenas-react?color=%23)

## Índice

- [Projeto Antenas (Front-End)](#projeto-antenas-front-end)
  - [Índice](#índice)
  - [🤔 O que é](#-o-que-é)
  - [⚽ Times](#-times)
    - [Padrões de Projetos (4º semestre)](#padrões-de-projetos-4º-semestre)
    - [Laboratório de Projeto Banco de Dados (5° semestre)](#laboratório-de-projeto-banco-de-dados-5-semestre)
  - [🔬 Tecnologias utilizadas](#-tecnologias-utilizadas)
  - [⚙️ Como executar a aplicação](#️-como-executar-a-aplicação)
  - [📸 Capturas de tela](#-capturas-de-tela)

## 🤔 O que é

Aplicação web onde empresas da área de tecnologia propõem desafios, o conteúdo é avaliado pelos professores da Fatec e então enviado para que os alunos proponham soluções.

Confira os outros repositórios:

- [Back-End](https://github.com/mrocha98/antenas-back)
- [Devops](https://github.com/mrocha98/antenas-devops)

## ⚽ Times

### Padrões de Projetos (4º semestre)

Professor Giuliano Bertoti

Alunos:

- Lucas Barcelos
- Matheus Rocha da Silva

### Laboratório de Projeto Banco de Dados (5° semestre)

Professor Eduardo Sakaue

Alunos:

- Bruno Akira Ota
- Carlos Henrique Monteiro Neto
- Leticia Macedo Prudente de Carvalho
- Matheus Rocha da Silva
- Thaís Bitencourt de Meneses
- Vanessa Bessa Diogenes Castellano
- Yan Rodrigues de Azevedo

## 🔬 Tecnologias utilizadas

- ReactJS
- React Hooks
- Material UI
- SASS

## ⚙️ Como executar a aplicação

Antes de tudo, instale as seguintes ferramentas:

1. [NodeJS](https://nodejs.org/en/) (se você utiliza Linux ou Mac, recomendamos o [NVM](https://github.com/nvm-sh/nvm))
2. [Yarn](https://yarnpkg.com/getting-started/install)

Clone o projeto no diretório de sua preferência:

```bash
git clone https://github.com/mrocha98/antenas-react
cd antenas-react
```

Crie o arquivo .env e copie o conteúdo do arquivo .env.example para dentro dele

```bash
cp -r .env.example .env
```

Instale as depêndencias do projeto

```bash
yarn install
```

Inicie a aplicação em modo de desenvolvimento

```bash
yarn start:dev
```

Seu navegador padrão abrirá uma nova guia com o projeto em execução!

OBS: Esste projeto utiliza uma ferramenta de padronização de commits. Não passe a flag `-m` na hora de commitar, basta utilizar `git commit` que a cli será ativada. Confira uma demonstração nesse vídeo:

[![Padronizando mensagens de commit do Git - RocketSeat](https://i.ytimg.com/vi/erInHkjxkL8/maxresdefault.jpg)](https://www.youtube.com/watch?v=erInHkjxkL8)

## 📸 Capturas de tela

![landing page](.github/images/landing-page.png)
Página inicial (landing page)

![account-creation](.github/images/account-creation.png)
Criação de conta

![dashboard](.github/images/dashboard.png)
Dashboard do aluno

![medals](.github/images/medals.png)
Página de medalhas

![project](.github/images/project.png)
Acompanhamento de projeto
