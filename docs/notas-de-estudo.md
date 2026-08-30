# Notas de Estudo Técnico: Hairday

## 1. Arquitetura e organização do código

O projeto foi organizado como uma aplicação JavaScript modular, com `src/main.js` atuando como ponto de entrada. Esse arquivo importa os estilos, inicializa a configuração do `dayjs` e registra os módulos responsáveis pela interação da página.

A divisão de responsabilidades está distribuída da seguinte forma:

- `modules/form`: controla submissão, alteração de data, carregamento e seleção de horários.
- `modules/schedules`: busca, renderiza e cancela agendamentos.
- `services`: encapsula as requisições HTTP para a API.
- `utils`: concentra a lista de horários de funcionamento.
- `libs`: configura bibliotecas compartilhadas, como o locale do `dayjs`.
- `styles`: separa reset, estilos globais, formulário e agenda.

Essa estrutura reduz a concentração de regras no arquivo de entrada e permite que cada fluxo seja alterado com menor impacto nos demais módulos.

## 2. Fluxo de dados e eventos

O carregamento inicial é disparado por `DOMContentLoaded`, que chama `schedulesDay()`. A partir desse ponto, o fluxo principal é:

1. Ler a data do campo `#date`.
2. Buscar os registros pela camada de serviço.
3. Filtrar os agendamentos do dia com `dayjs`.
4. Renderizar os registros agrupados por período.
5. Gerar os horários disponíveis e indisponíveis.

A troca de data reutiliza o mesmo fluxo por meio de `selectedDate.onchange`, evitando duplicação da lógica de atualização.

Na submissão do formulário, o código:

- impede o comportamento padrão do navegador com `preventDefault()`;
- valida nome e horário selecionado;
- combina a data com a hora usando `dayjs`;
- cria um identificador baseado no timestamp atual;
- envia o novo registro para a API;
- recarrega a agenda e limpa o campo do cliente.

O cancelamento usa delegação de eventos: os listeners são registrados nos elementos `.period`, e o código identifica um clique no ícone de cancelamento com `event.target`. Essa escolha continua funcionando mesmo quando os itens da lista são recriados durante a renderização.

## 3. Regras de disponibilidade e datas

A lista base de horários fica em `utils/opening-hours.js`, mantendo a regra de funcionamento fora do código de renderização. Em `hours-load.js`, cada horário recebe dois critérios de disponibilidade:

- não pode aparecer entre os horários já usados no dia;
- não pode estar no passado quando a data selecionada é o dia atual.

O projeto usa `dayjs` para formatar datas, comparar dias e somar a hora escolhida à data. A configuração em `libs/dayjs.js` define o locale `pt-br`, enquanto o formato persistido é construído a partir de uma data selecionada e do horário escolhido.

A renderização também classifica os agendamentos por hora em manhã, tarde e noite. Antes de inserir novos elementos, os contêineres dos períodos são limpos, evitando duplicação visual após uma nova busca.

## 4. Integração com a API

A comunicação com o `JSON Server` foi isolada em funções de serviço:

- `schedule-fetch-by-day.js` executa `GET /schedules` e filtra os dados no cliente.
- `schedule-new.js` executa `POST /schedules` com `id`, `name` e `when` no corpo JSON.
- `schedules-cancel.js` executa `DELETE /schedules/:id`.

O endereço base fica centralizado em `services/api-config.js`. Essa separação evita espalhar URLs e detalhes de `fetch` pelos módulos de interface.

As operações assíncronas usam `async/await` e blocos `try/catch`, com mensagens de erro para falhas de consulta, criação e cancelamento. Como o endereço atual da API é `http://localhost:3333`, o frontend depende de uma instância local do `JSON Server`; o artefato publicado no GitHub Pages não recebe automaticamente uma API remota.

## 5. Build com Webpack e Babel

O Webpack usa `src/main.js` como entry point e produz `dist/main.js`. A configuração inclui:

- `HtmlWebpackPlugin` para gerar o HTML final a partir de `public/index.html`;
- `CopyWebpackPlugin` para copiar os assets para `dist/assets`;
- `style-loader` e `css-loader` para importar CSS pelos módulos JavaScript;
- `babel-loader` para transpilar arquivos JavaScript fora de `node_modules`.

O Babel utiliza `@babel/preset-env` com targets padrão. Isso permite escrever módulos JavaScript modernos e gerar uma saída compatível com os navegadores definidos pela configuração.

O `webpack-dev-server` fornece desenvolvimento local na porta `3000`, com `hot` habilitado. O JSON Server é executado separadamente na porta `3333`, formando a dependência local entre frontend e API.

## 6. Qualidade de código e automação

O projeto possui configuração flat do ESLint (`eslint.config.mjs`) e integra `eslint-config-prettier` para evitar conflitos entre lint e formatação. Entre as regras configuradas estão:

- uso de `const`/`let` em vez de `var`;
- detecção de variáveis não utilizadas;
- prevenção de imports duplicados e código inalcançável;
- ordenação de imports;
- controle de usos de `console`.

O Prettier é usado nos scripts de verificação e formatação. O projeto também declara `lint-staged` e `Husky` no processo de preparação do repositório, embora o comportamento de hooks dependa dos arquivos de configuração presentes no ambiente Git.

Os scripts relevantes são:

- `npm run build`: gera o bundle de produção;
- `npm run dev`: inicia o servidor de desenvolvimento;
- `npm run server`: inicia o `JSON Server`;
- `npm run lint`: executa o ESLint;
- `npm run check`: executa lint e verificação do Prettier.

Não há testes automatizados implementados: o script `test` permanece como placeholder. Esse é um ponto de evolução para validar os serviços, as regras de disponibilidade e a renderização sem depender exclusivamente de verificações manuais no navegador.

## 7. Publicação contínua

O workflow `.github/workflows/pages.yml` automatiza a publicação no GitHub Pages quando há push em `main` ou `master`, além de permitir execução manual.

O pipeline:

1. instala as dependências com `npm ci` usando Node.js 22;
2. executa `npm run build`;
3. cria `dist/.nojekyll`;
4. envia `dist` como artefato do Pages;
5. realiza o deploy com `actions/deploy-pages`.

A separação entre build e deploy usa dois jobs, e o job de deploy depende da conclusão do job de build. O uso de `concurrency` cancela execuções anteriores do grupo quando uma nova publicação é iniciada.

## 8. Principais aprendizados técnicos

- Modularizar por responsabilidade torna o fluxo de eventos mais rastreável.
- Centralizar serviços HTTP reduz acoplamento entre DOM e API.
- Recalcular a interface após mutações mantém a lista e os horários sincronizados com os dados persistidos.
- Comparações de data e hora exigem uma biblioteca dedicada para reduzir inconsistências de parsing e formatação.
- Bundlers precisam tratar tanto o JavaScript quanto os imports de CSS e os assets estáticos.
- Um deploy de frontend estático precisa considerar separadamente a disponibilidade e a origem da API consumida.
- Lint, formatação e pipeline de build são verificações complementares; nenhum deles substitui testes de comportamento.

---

Notas de estudo técnico por [Victor Martins](https://github.com/VictorMartinsD).

---

# Technical Study Notes: Hairday

## 1. Architecture and code organization

The project is organized as a modular JavaScript application, with `src/main.js` serving as the entry point. This file imports styles, initializes the `dayjs` configuration, and registers the modules responsible for page interaction.

Responsibilities are split across the following areas:

- `modules/form`: handles submission, date changes, hour loading, and hour selection.
- `modules/schedules`: fetches, renders, and cancels schedules.
- `services`: encapsulates HTTP requests to the API.
- `utils`: stores the opening-hours list.
- `libs`: configures shared libraries, such as the `dayjs` locale.
- `styles`: separates reset, global, form, and schedule styles.

This structure prevents the entry point from accumulating business and UI rules, allowing each flow to evolve with less impact on unrelated modules.

## 2. Data flow and events

Initial loading is triggered by `DOMContentLoaded`, which calls `schedulesDay()`. The main flow is:

1. Read the value from `#date`.
2. Fetch records through the service layer.
3. Filter schedules for the selected day with `dayjs`.
4. Render records grouped by period.
5. Generate available and unavailable hours.

Changing the date reuses the same update flow through `selectedDate.onchange`, avoiding duplicated refresh logic.

When the form is submitted, the code:

- prevents the browser's default behavior with `preventDefault()`;
- validates the client name and selected hour;
- combines the date and selected hour with `dayjs`;
- creates an identifier from the current timestamp;
- sends the new record to the API;
- reloads the schedule and clears the client field.

Cancellation uses event delegation: listeners are attached to `.period` elements, and the code detects clicks on the cancellation icon through `event.target`. This remains effective after schedule items are recreated during rendering.

## 3. Availability and date rules

The base hour list is kept in `utils/opening-hours.js`, which keeps the opening-hours rule outside the rendering code. In `hours-load.js`, each hour is evaluated using two availability criteria:

- it must not be included among the hours already booked for the day;
- it must not be in the past when the selected date is today.

The project uses `dayjs` to format dates, compare days, and add the selected hour to the selected date. The configuration in `libs/dayjs.js` sets the `pt-br` locale, while the persisted value is built from the selected date and hour.

Rendering also classifies schedules by hour into morning, afternoon, and night. Before inserting new elements, the period containers are cleared to prevent duplicate entries after a new fetch.

## 4. API integration

Communication with `JSON Server` is isolated in service functions:

- `schedule-fetch-by-day.js` performs `GET /schedules` and filters the response on the client.
- `schedule-new.js` performs `POST /schedules` with `id`, `name`, and `when` in the JSON body.
- `schedules-cancel.js` performs `DELETE /schedules/:id`.

The base URL is centralized in `services/api-config.js`. This prevents URLs and `fetch` details from being distributed throughout the UI modules.

Asynchronous operations use `async/await` and `try/catch` blocks, with error messages for query, creation, and cancellation failures. Because the current API address is `http://localhost:3333`, the frontend depends on a local `JSON Server` instance; the GitHub Pages artifact does not automatically provide a remote API.

## 5. Webpack and Babel build

Webpack uses `src/main.js` as its entry point and produces `dist/main.js`. The configuration includes:

- `HtmlWebpackPlugin` to generate the final HTML from `public/index.html`;
- `CopyWebpackPlugin` to copy assets into `dist/assets`;
- `style-loader` and `css-loader` to import CSS through JavaScript modules;
- `babel-loader` to transpile JavaScript files outside `node_modules`.

Babel uses `@babel/preset-env` with default targets. This allows modern JavaScript modules to be written while producing output compatible with the browsers selected by the configuration.

`webpack-dev-server` provides local development on port `3000`, with `hot` enabled. `JSON Server` runs separately on port `3333`, creating the local frontend-to-API dependency.

## 6. Code quality and automation

The project has a flat ESLint configuration (`eslint.config.mjs`) and integrates `eslint-config-prettier` to prevent lint and formatting conflicts. Configured rules include:

- using `const`/`let` instead of `var`;
- detecting unused variables;
- preventing duplicate imports and unreachable code;
- enforcing import ordering;
- controlling `console` usage.

Prettier is used by the verification and formatting scripts. The project also declares `lint-staged` and `Husky` in its repository preparation process, although hook behavior depends on the Git configuration files available in the environment.

Relevant scripts are:

- `npm run build`: creates the production bundle;
- `npm run dev`: starts the development server;
- `npm run server`: starts `JSON Server`;
- `npm run lint`: runs ESLint;
- `npm run check`: runs lint and the Prettier check.

No automated tests are implemented: the `test` script remains a placeholder. This is an opportunity for further work to validate services, availability rules, and rendering without relying exclusively on manual browser checks.

## 7. Continuous deployment

The `.github/workflows/pages.yml` workflow automates GitHub Pages publication on pushes to `main` or `master`, and it also supports manual execution.

The pipeline:

1. installs dependencies with `npm ci` using Node.js 22;
2. runs `npm run build`;
3. creates `dist/.nojekyll`;
4. uploads `dist` as a Pages artifact;
5. deploys it with `actions/deploy-pages`.

The separation between build and deploy uses two jobs, with the deploy job depending on the build job. The `concurrency` configuration cancels previous runs in the same group when a new publication starts.

## 8. Main technical learnings

- Responsibility-based modules make event flows easier to trace.
- Centralizing HTTP services reduces coupling between the DOM and the API.
- Rebuilding the interface after mutations keeps the schedule and available hours synchronized with persisted data.
- Date and time comparisons benefit from a dedicated library to reduce parsing and formatting inconsistencies.
- Bundlers must handle JavaScript, CSS imports, and static assets together.
- A static frontend deployment must separately account for the availability and origin of the API it consumes.
- Linting, formatting, and build pipelines complement one another; none replaces behavior tests.

---

Technical study notes by [Victor Martins](https://github.com/VictorMartinsD).
