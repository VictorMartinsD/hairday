<h1 align="center">Hairday</h1>

<div align="center">

[![Acessar Deploy](https://img.shields.io/badge/Acessar%20Deploy-GitHub%20Pages-blue?style=for-the-badge)](https://victormartinsd.github.io/hairday/)
[![Figma Design](https://img.shields.io/badge/Figma%20Design-811?style=for-the-badge&logo=figma&logoColor=white&color=FC4A1A)](https://www.figma.com/design/pmO2Viz6ts1i6V93KDJQ9B/Plataforma-de-agendamento--Community-?node-id=3-376&p=f&t=rE3TG5K9bkNAZaen-0)
[![Notas de Estudo](https://img.shields.io/badge/Notas%20de%20Estudo-Documentação-0ea5e9?style=for-the-badge)](./docs/notas-de-estudo.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

<div align="center">

## Sumário | Summary

| Português                                                 | English                                               |
| --------------------------------------------------------- | ----------------------------------------------------- |
| [Sobre o Projeto](#sobre-o-projeto)                       | [About the Project](#about-the-project)               |
| [Preview](#preview)                                       | [Preview](#preview-en)                                |
| [Visão de Produto](#visao-de-produto)                     | [Product Overview](#product-overview)                 |
| [Casos de Uso](#casos-de-uso)                             | [Use Cases](#use-cases)                               |
| [Funcionalidades](#funcionalidades)                       | [Features](#features)                                 |
| [Tecnologias](#tecnologias)                               | [Technologies](#technologies)                         |
| [Arquitetura](#arquitetura-e-decisoes-tecnicas)           | [Architecture](#architecture-and-technical-decisions) |
| [Como Rodar Localmente](#como-rodar-o-projeto-localmente) | [Run Locally](#run-locally)                           |
| [Limitações Conhecidas](#limitacoes-conhecidas)           | [Known Limitations](#known-limitations)               |
| [Aprendizados](#aprendizados)                             | [Learnings](#learnings)                               |

</div>

<a name="sobre-o-projeto"></a>

## Sobre o Projeto

Hairday é uma aplicação web para organizar agendamentos de atendimento por data e horário. O projeto permite consultar a agenda diária, identificar horários disponíveis, criar agendamentos e cancelar compromissos existentes.

O foco do projeto foi construir um fluxo de agenda simples, com atualização da disponibilidade após cada alteração e separação clara entre interface, regras de agenda e comunicação com a API. A aplicação usa uma API local simulada pelo JSON Server para persistir os registros durante o desenvolvimento.

<a name="preview"></a>

<h2 align="center">Preview</h2>

<div align="center">

<img width="1919" height="1079" alt="Interface do Hairday" src="https://github.com/user-attachments/assets/62bdbf6c-0696-4770-ab33-d5d26b061261" />

</div>

<a name="visao-de-produto"></a>

## Visão de Produto

O produto resolve a necessidade de controlar compromissos sem depender de conferências manuais de disponibilidade. O usuário seleciona uma data, visualiza os horários livres e registra o nome do cliente para manter a agenda diária organizada.

O público principal é o profissional autônomo ou responsável por um estabelecimento de serviços de cabelo. Para conhecer as regras de negócio, os fluxos e as limitações funcionais em detalhe, consulte a [Especificação do Produto](https://github.com/VictorMartinsD/hairday/blob/main/docs/PRODUCT_SPEC.md).

<a name="casos-de-uso"></a>

## Casos de Uso

- Organizar os atendimentos de um dia de trabalho.
- Verificar rapidamente quais horários ainda estão livres.
- Registrar um cliente em um horário disponível.
- Consultar a sequência de atendimentos por período do dia.
- Cancelar um compromisso que não será realizado.

<a name="funcionalidades"></a>

## Funcionalidades

- Seleção de data atual ou futura.
- Exibição de horários de atendimento entre 9h e 21h.
- Indisponibilidade visual de horários ocupados ou já passados.
- Criação de agendamentos com nome do cliente, data e horário.
- Consulta de agendamentos agrupados em manhã, tarde e noite.
- Cancelamento com confirmação do usuário.
- Atualização da agenda após criação, cancelamento ou troca de data.
- Layout responsivo para diferentes larguras de tela.

<a name="arquitetura-e-decisoes-tecnicas"></a>

## Arquitetura e Decisões Técnicas

O projeto usa módulos JavaScript organizados por responsabilidade. `main.js` reúne os imports de entrada; os módulos de formulário controlam submissão, troca de data e seleção de horários; os módulos de agenda controlam carregamento, renderização e cancelamento; e os serviços concentram as chamadas HTTP.

O Webpack reúne JavaScript, CSS e assets em um build para `dist`. O Babel transpila o JavaScript com `@babel/preset-env`, enquanto `HtmlWebpackPlugin` gera o HTML final e `CopyWebpackPlugin` copia os assets. O CSS está dividido por finalidade e usa Grid no desktop, com mudança para layout em coluna em telas menores.

### Estrutura do Projeto

```text
hairday/
├── .editorconfig                    # Regras de edição
├── .gitignore                       # Arquivos ignorados pelo Git
├── .prettierignore                  # Arquivos ignorados pelo Prettier
├── .prettierrc                      # Configuração do Prettier
├── babel.config.js                  # Configuração do Babel
├── eslint.config.mjs                # Configuração do ESLint
├── LICENSE                          # Licença MIT
├── package.json                     # Dependências e scripts npm
├── package-lock.json                # Lockfile de dependências
├── server.json                      # Base local do JSON Server
├── webpack.config.js                # Build e servidor de desenvolvimento
├── public/
│   ├── index.html                   # Template HTML e metadados
│   └── assets/
│       ├── afternoon.svg            # Ícone do período da tarde
│       ├── arrow-down.svg           # Ícone do seletor de data
│       ├── calendar.svg             # Ícone do campo de data
│       ├── cancel.svg               # Ícone de cancelamento
│       ├── logo.svg                 # Identidade visual
│       ├── morning.svg              # Ícone do período da manhã
│       ├── night.svg                # Ícone do período da noite
│       ├── person.svg               # Ícone do campo de cliente
│       └── scissors.svg             # Favicon
├── src/
│   ├── main.js                      # Entry point da aplicação
│   ├── libs/
│   │   └── dayjs.js                 # Locale pt-br do Day.js
│   ├── modules/
│   │   ├── page-load.js             # Carregamento inicial da agenda
│   │   ├── form/
│   │   │   ├── date-change.js       # Atualização ao trocar a data
│   │   │   ├── hours-click.js       # Seleção de horário disponível
│   │   │   ├── hours-load.js        # Geração dos horários
│   │   │   └── submit.js            # Validação e criação de agenda
│   │   └── schedules/
│   │       ├── cancel.js            # Fluxo de cancelamento
│   │       ├── load.js              # Carregamento da agenda diária
│   │       └── show.js              # Renderização por período
│   ├── services/
│   │   ├── api-config.js            # URL base da API
│   │   ├── schedule-fetch-by-day.js # Busca de agendas
│   │   ├── schedule-new.js          # Criação de agenda
│   │   └── schedules-cancel.js      # Exclusão de agenda
│   ├── styles/
│   │   ├── form.css                 # Formulário e horários
│   │   ├── global.css               # Layout global e responsividade
│   │   ├── reset.css                # Reset de estilos
│   │   └── schedule.css             # Lista de agendamentos
│   └── utils/
│       └── opening-hours.js         # Horários de funcionamento
├── docs/
│   ├── PRODUCT_SPEC.md              # Especificação funcional do produto
│   └── notas-de-estudo.md           # Registro técnico de aprendizado
└── .github/
	└── workflows/
		└── pages.yml                # Build e deploy no GitHub Pages
```

<a name="tecnologias"></a>

## Tecnologias e Ferramentas

### Core

| Tecnologia     | Versão    | Função e impacto                                            |
| -------------- | --------- | ----------------------------------------------------------- |
| **HTML5**      | Nativo    | Estrutura semântica da interface e dos formulários.         |
| **JavaScript** | ES6+      | Regras de agenda, eventos, validações e atualização do DOM. |
| **Day.js**     | `1.11.10` | Comparação, formatação e composição de datas e horários.    |

### Styling

| Tecnologia    | Versão       | Função e impacto                                                  |
| ------------- | ------------ | ----------------------------------------------------------------- |
| **CSS3**      | Nativo       | Layout, estados visuais, responsividade e estilos dos módulos.    |
| **Catamaran** | Google Fonts | Tipografia carregada pela página para manter consistência visual. |

### Infrastructure / API

| Tecnologia         | Versão           | Função e impacto                                                     |
| ------------------ | ---------------- | -------------------------------------------------------------------- |
| **JSON Server**    | `1.0.0-alpha.21` | API REST local para leitura, criação e cancelamento de agendamentos. |
| **GitHub Actions** | Nativo           | Automação de build e publicação no GitHub Pages.                     |
| **GitHub Pages**   | Nativo           | Hospedagem do artefato estático gerado pelo build.                   |

### Tooling

| Tecnologia      | Versão    | Função e impacto                                               |
| --------------- | --------- | -------------------------------------------------------------- |
| **Webpack**     | `5.109.2` | Empacotamento do JavaScript, CSS, HTML e assets em `dist`.     |
| **Babel**       | `7.29.7`  | Transpilação do JavaScript para targets padrão de navegadores. |
| **ESLint**      | `9.39.5`  | Verificação de qualidade e consistência do JavaScript.         |
| **Prettier**    | `3.7.4`   | Formatação e verificação de estilo dos arquivos.               |
| **Husky**       | `9.1.7`   | Integração declarada para automação de hooks do Git.           |
| **lint-staged** | `15.0.0`  | Execução de lint e formatação em arquivos staged.              |

Não há testes automatizados implementados; o script `test` ainda é um placeholder.

<a name="como-rodar-o-projeto-localmente"></a>

## Como Rodar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/VictorMartinsD/hairday.git
```

2. Entre no diretório do projeto:

```bash
cd hairday
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie a API local:

```bash
npm run server
```

5. Em outro terminal, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend é servido na porta `3000` e a API local na porta `3333`.

<a name="limitacoes-conhecidas"></a>

## Limitações Conhecidas

- Não possui autenticação ou perfis de usuário.
- Não suporta múltiplos profissionais ou estabelecimentos.
- Não possui edição de agendamentos existentes.
- Não possui cadastro de serviços, duração variável ou preços.
- Não possui histórico, busca por cliente ou relatórios.
- Não possui notificações ou lembretes.
- Trabalha apenas com intervalos fixos de uma hora, entre 9h e 21h.
- Não gerencia feriados, pausas ou exceções de funcionamento.
- O deploy estático depende de uma API disponível separadamente para persistir e consultar agendamentos.

<a name="aprendizados"></a>

## Aprendizados

O desenvolvimento reforçou a organização de uma aplicação JavaScript por responsabilidades, a separação entre módulos de interface e serviços HTTP e o uso de uma biblioteca dedicada para comparação e formatação de datas. Também consolidou a configuração de um pipeline com Webpack, Babel, lint, formatação e publicação automatizada.

Os principais desafios foram manter a disponibilidade coerente após mudanças de data e agendamento, reconstruir a agenda sem duplicar registros e tratar a comunicação assíncrona com a API.

> [!NOTE]
> Estas notas são um resumo técnico do projeto.
>
> O processo detalhado com todos os desafios resolvidos está documentado nos meus arquivos pessoais de estudo.
>
> [Veja as anotações completas deste projeto aqui](./docs/notas-de-estudo.md)

---

Desenvolvido por [Victor Martins](https://github.com/VictorMartinsD).<br>
Front-End Developer focado em aplicações web modernas e performance.

---

<div align="center">

## ENGLISH VERSION

</div>

<a name="about-the-project"></a>

## About the Project

Hairday is a web application for organizing service appointments by date and time. The project allows users to consult the daily schedule, identify available time slots, create appointments, and cancel existing commitments.

The project focused on building a direct scheduling flow, updating availability after every change, and separating the interface, scheduling rules, and API communication. The application uses a local API simulated by JSON Server to persist records during development.

<a name="preview-en"></a>

## Preview

See the images in the [Portuguese Preview section](#preview).

<a name="product-overview"></a>

## Product Overview

The product addresses the need to manage appointments without manually checking availability. The user selects a date, reviews open time slots, and enters a client's name to keep the daily schedule organized.

The primary audience is a self-employed professional or a person responsible for a hair service business. For detailed business rules, user flows, and functional limitations, see the [Product Specification](https://github.com/VictorMartinsD/hairday/blob/main/docs/PRODUCT_SPEC.md).

<a name="use-cases"></a>

## Use Cases

- Organize appointments for a working day.
- Quickly check which time slots are still open.
- Register a client in an available time slot.
- Review the appointment sequence by time of day.
- Cancel an appointment that will not take place.

<a name="features"></a>

## Features

- Select the current or a future date.
- Display service hours from 9:00 AM to 9:00 PM.
- Visually mark occupied or past time slots as unavailable.
- Create appointments with client name, date, and time.
- Review appointments grouped into morning, afternoon, and night.
- Cancel an appointment after user confirmation.
- Update the schedule after creation, cancellation, or date changes.
- Responsive layout for different screen widths.

<a name="architecture-and-technical-decisions"></a>

## Architecture and Technical Decisions

The project uses JavaScript modules organized by responsibility. `main.js` gathers the entry imports; form modules handle submission, date changes, and time selection; schedule modules handle loading, rendering, and cancellation; and services centralize HTTP calls.

Webpack bundles JavaScript, CSS, and assets into `dist`. Babel transpiles JavaScript with `@babel/preset-env`, while `HtmlWebpackPlugin` generates the final HTML and `CopyWebpackPlugin` copies assets. CSS is split by purpose and uses Grid on desktop, changing to a column layout on smaller screens.

### Project Structure

```text
hairday/
├── .editorconfig                    # Editor rules
├── .gitignore                       # Git-ignored files
├── .prettierignore                  # Prettier-ignored files
├── .prettierrc                      # Prettier configuration
├── babel.config.js                  # Babel configuration
├── eslint.config.mjs                # ESLint configuration
├── LICENSE                          # MIT License
├── package.json                     # Dependencies and npm scripts
├── package-lock.json                # Dependency lockfile
├── server.json                      # Local JSON Server database
├── webpack.config.js                # Build and development server
├── public/
│   ├── index.html                   # HTML template and metadata
│   └── assets/
│       ├── afternoon.svg            # Afternoon period icon
│       ├── arrow-down.svg           # Date selector icon
│       ├── calendar.svg             # Date field icon
│       ├── cancel.svg               # Cancellation icon
│       ├── logo.svg                 # Visual identity
│       ├── morning.svg              # Morning period icon
│       ├── night.svg                # Night period icon
│       ├── person.svg               # Client field icon
│       └── scissors.svg             # Favicon
├── src/
│   ├── main.js                      # Application entry point
│   ├── libs/
│   │   └── dayjs.js                 # Day.js pt-br locale
│   ├── modules/
│   │   ├── page-load.js             # Initial schedule loading
│   │   ├── form/
│   │   │   ├── date-change.js       # Update when the date changes
│   │   │   ├── hours-click.js       # Available hour selection
│   │   │   ├── hours-load.js        # Hour generation
│   │   │   └── submit.js            # Schedule validation and creation
│   │   └── schedules/
│   │       ├── cancel.js            # Cancellation flow
│   │       ├── load.js              # Daily schedule loading
│   │       └── show.js              # Rendering by period
│   ├── services/
│   │   ├── api-config.js            # API base URL
│   │   ├── schedule-fetch-by-day.js # Schedule lookup
│   │   ├── schedule-new.js          # Schedule creation
│   │   └── schedules-cancel.js      # Schedule deletion
│   ├── styles/
│   │   ├── form.css                 # Form and hours
│   │   ├── global.css               # Global layout and responsiveness
│   │   ├── reset.css                # Style reset
│   │   └── schedule.css             # Schedule list
│   └── utils/
│       └── opening-hours.js         # Opening hours
├── docs/
│   ├── PRODUCT_SPEC.md              # Product specification
│   └── notas-de-estudo.md           # Technical study notes
└── .github/
	└── workflows/
		└── pages.yml                # GitHub Pages build and deployment
```

<a name="technologies"></a>

### Technologies and Tools

#### Core

| Technology     | Version   | Function and impact                                            |
| -------------- | --------- | -------------------------------------------------------------- |
| **HTML5**      | Native    | Provides the semantic structure for the interface and forms.   |
| **JavaScript** | ES6+      | Handles scheduling rules, events, validation, and DOM updates. |
| **Day.js**     | `1.11.10` | Handles date and time comparison, formatting, and composition. |

#### Styling

| Technology    | Version      | Function and impact                                                    |
| ------------- | ------------ | ---------------------------------------------------------------------- |
| **CSS3**      | Native       | Defines layout, visual states, responsive behavior, and module styles. |
| **Catamaran** | Google Fonts | Provides the page typography for visual consistency.                   |

#### Infrastructure / API

| Technology         | Version          | Function and impact                                                             |
| ------------------ | ---------------- | ------------------------------------------------------------------------------- |
| **JSON Server**    | `1.0.0-alpha.21` | Provides the local REST API for reading, creating, and cancelling appointments. |
| **GitHub Actions** | Native           | Automates the build and GitHub Pages publication.                               |
| **GitHub Pages**   | Native           | Hosts the static artifact generated by the build.                               |

#### Tooling

| Technology      | Version   | Function and impact                                       |
| --------------- | --------- | --------------------------------------------------------- |
| **Webpack**     | `5.109.2` | Bundles JavaScript, CSS, HTML, and assets into `dist`.    |
| **Babel**       | `7.29.7`  | Transpiles JavaScript for the configured browser targets. |
| **ESLint**      | `9.39.5`  | Checks JavaScript quality and consistency.                |
| **Prettier**    | `3.7.4`   | Formats files and verifies formatting consistency.        |
| **Husky**       | `9.1.7`   | Provides the declared Git hook integration.               |
| **lint-staged** | `15.0.0`  | Runs linting and formatting on staged files.              |

No automated tests are implemented; the `test` script remains a placeholder.

<a name="run-locally"></a>

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/VictorMartinsD/hairday.git
```

2. Enter the project directory:

```bash
cd hairday
```

3. Install dependencies:

```bash
npm install
```

4. Start the local API:

```bash
npm run server
```

5. In another terminal, start the development server:

```bash
npm run dev
```

The frontend runs on port `3000` and the local API runs on port `3333`.

<a name="known-limitations"></a>

## Known Limitations

- No authentication or user profiles.
- No support for multiple professionals or businesses.
- Existing appointments cannot be edited.
- No service catalogue, variable duration, or pricing.
- No history, client search, or reports.
- No notifications or reminders.
- Only fixed one-hour slots from 9:00 AM to 9:00 PM are supported.
- No holiday, break, or operating-hours exception management.
- The static deployment depends on a separately available API to persist and retrieve appointments.

<a name="learnings"></a>

## Learnings

Development reinforced responsibility-based organization in a JavaScript application, separation between interface modules and HTTP services, and the use of a dedicated library for date comparison and formatting. It also consolidated the configuration of a pipeline with Webpack, Babel, linting, formatting, and automated publication.

The main challenges were keeping availability consistent after date and appointment changes, rebuilding the schedule without duplicate records, and handling asynchronous API communication.

> [!NOTE]
> These notes are a summary of the project's technical content.
>
> The detailed process, including all resolved challenges, is documented in my personal study files.
>
> [See the complete study notes for this project here](./docs/notas-de-estudo.md)

---

Developed by [Victor Martins](https://github.com/VictorMartinsD).<br>
Front-End Developer focused on modern web applications and performance.

---
