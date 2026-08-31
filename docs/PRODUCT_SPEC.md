<h1 align="center">Especificação de Produto — Hairday</h1>

<div align="center">

## Sumário | Summary

| Português                                         | English                                     |
| ------------------------------------------------- | ------------------------------------------- |
| [Visão Geral do Produto](#visao-geral-do-produto) | [Product Overview](#product-overview)       |
| [Problema](#problema)                             | [Problem](#problem)                         |
| [Objetivo do Produto](#objetivo-do-produto)       | [Product Objective](#product-objective)     |
| [Usuário-Alvo](#usuario-alvo)                     | [Target User](#target-user)                 |
| [Funcionalidades](#funcionalidades)               | [Features](#features)                       |
| [Regras de Negócio](#regras-de-negocio)           | [Business Rules](#business-rules)           |
| [Fluxo do Usuário](#fluxo-do-usuario)             | [User Flow](#user-flow)                     |
| [MVP](#mvp)                                       | [MVP](#mvp-1)                               |
| [Decisões de Produto](#decisoes-de-produto)       | [Product Decisions](#product-decisions)     |
| [Limitações Atuais](#limitacoes-atuais)           | [Current Limitations](#current-limitations) |
| [Próximos Passos](#proximos-passos)               | [Next Steps](#next-steps)                   |
| [Métricas de Sucesso](#metricas-de-sucesso)       | [Success Metrics](#success-metrics)         |

</div>

<a id="visao-geral-do-produto"></a>

## 1. Visão Geral do Produto

Hairday é um sistema para organizar agendamentos de atendimento por data e horário. Ele concentra em uma única tela a criação de um atendimento e a consulta dos agendamentos do dia selecionado.

O produto resolve a necessidade de registrar compromissos de forma objetiva, identificar horários livres e consultar a agenda sem percorrer informações de dias diferentes. O valor entregue é a redução de conflitos de horário e a visualização imediata da programação diária.

<a id="problema"></a>

## 2. Problema

Sem uma agenda centralizada, o responsável pelos atendimentos precisa controlar manualmente os compromissos e verificar a disponibilidade por conta própria. Esse processo aumenta o risco de reservar um horário já ocupado, esquecer informações do cliente ou perder a visão da sequência de atendimentos do dia.

O problema precisa ser resolvido porque a disponibilidade de horários é uma regra central do serviço. Uma informação incorreta afeta diretamente a organização do atendimento e exige retrabalho para ser corrigida.

<a id="objetivo-do-produto"></a>

## 3. Objetivo do Produto

O sistema deve permitir que o responsável pela agenda:

- selecione uma data válida;
- identifique os horários disponíveis;
- registre o nome do cliente e o horário escolhido;
- consulte os atendimentos organizados ao longo do dia;
- cancele um atendimento quando necessário.

O resultado esperado é uma agenda diária atualizada, com menor esforço para encontrar disponibilidade e administrar alterações.

<a id="usuario-alvo"></a>

## 4. Usuário-Alvo

O usuário principal é o profissional autônomo ou responsável por um estabelecimento de serviços de cabelo que administra os próprios horários de atendimento.

- **Perfil:** pessoa que agenda e acompanha atendimentos de clientes.
- **Nível técnico:** usuário final, sem necessidade de conhecimento de programação.
- **Contexto de uso:** planejamento da agenda diária e registro de novos atendimentos.
- **Necessidade principal:** saber quais horários estão livres e manter os compromissos do dia organizados.

<a id="funcionalidades"></a>

## 5. Funcionalidades

### Consulta da agenda por data

O usuário seleciona uma data e o sistema apresenta os atendimentos correspondentes àquele dia. Os registros são separados em manhã, tarde e noite, com horário e nome do cliente.

### Identificação de disponibilidade

O sistema apresenta os horários dentro do período de funcionamento. Horários já ocupados ou que já passaram ficam identificados como indisponíveis e não podem ser escolhidos para um novo atendimento.

### Criação de agendamento

O usuário seleciona uma data, escolhe um horário livre, informa o nome do cliente e solicita o agendamento. O sistema valida os dados, confirma a criação e atualiza a agenda exibida.

### Cancelamento de agendamento

O usuário solicita o cancelamento de um atendimento existente. O sistema pede confirmação antes de remover o compromisso e, após a confirmação, atualiza a lista e libera o horário correspondente.

### Atualização após mudança de contexto

Quando a data selecionada muda ou um agendamento é criado ou cancelado, o sistema atualiza os horários e a lista de atendimentos para refletir a nova situação.

<a id="regras-de-negocio"></a>

## 6. Regras de Negócio

- A data inicial da agenda é o dia atual.
- O usuário não pode selecionar uma data anterior ao dia atual.
- O sistema considera horários de atendimento das 9h às 21h, em intervalos de uma hora.
- Um horário que já possui agendamento fica indisponível.
- Um horário que já passou no dia atual fica indisponível.
- O sistema exige um nome de cliente para concluir o agendamento.
- O sistema exige a seleção de um horário disponível para concluir o agendamento.
- Espaços vazios antes ou depois do nome do cliente não são considerados parte do dado cadastrado.
- O agendamento é associado à data e ao horário escolhidos.
- O cancelamento só ocorre depois da confirmação do usuário.
- Depois de criar ou cancelar um agendamento, a agenda do dia deve refletir a alteração.
- A agenda vazia é um estado válido: nesse caso, não há atendimentos listados e os horários futuros permanecem disponíveis.

<a id="fluxo-do-usuario"></a>

## 7. Fluxo do Usuário

1. O usuário acessa o Hairday.
2. O sistema abre a agenda no dia atual.
3. O sistema exibe os horários disponíveis e os atendimentos existentes, separados por período.
4. O usuário escolhe uma data igual ou posterior ao dia atual.
5. O sistema atualiza a disponibilidade e os atendimentos da data escolhida.
6. O usuário seleciona um horário disponível.
7. O usuário informa o nome do cliente.
8. O usuário solicita o agendamento.
9. O sistema valida os dados e confirma o novo atendimento.
10. O sistema atualiza a agenda e libera o formulário para o próximo registro.
11. Para remover um atendimento, o usuário seleciona a ação de cancelamento do registro.
12. O sistema solicita confirmação e, se ela for positiva, remove o atendimento e atualiza a disponibilidade.

<a id="mvp"></a>

## 8. MVP

O núcleo indispensável do produto é o gerenciamento da agenda diária:

1. consultar horários e atendimentos por data;
2. criar um atendimento em um horário disponível;
3. cancelar um atendimento existente.

Sem a possibilidade de registrar um horário e manter sua disponibilidade atualizada, o produto deixa de cumprir sua finalidade principal.

<a id="decisoes-de-produto"></a>

## 9. Decisões de Produto

- **Começar pelo dia atual:** reduz o número de etapas para a tarefa mais frequente e evita que o usuário precise configurar a data inicial.
- **Impedir datas anteriores:** evita registrar compromissos em períodos que já passaram e mantém a agenda orientada ao planejamento atual ou futuro.
- **Exibir horários ocupados como indisponíveis:** torna a disponibilidade visível antes da tentativa de agendamento e reduz conflitos de horário.
- **Separar a agenda por períodos do dia:** facilita a leitura e a localização de um atendimento dentro da rotina diária.
- **Exigir confirmação no cancelamento:** reduz a chance de remover um compromisso por engano.
- **Atualizar a agenda após cada alteração:** mantém a informação exibida coerente com a ação recém-concluída e evita que o usuário precise recarregar a página manualmente.
- **Manter a criação em um fluxo curto:** combina data, horário e nome em uma tarefa direta, adequada a uma operação repetida ao longo do dia.

<a id="limitacoes-atuais"></a>

## 10. Limitações Atuais

- Não há autenticação ou perfis de usuário.
- Não há suporte explícito a múltiplos profissionais ou estabelecimentos.
- Não há cadastro de serviços, duração variável ou preço do atendimento.
- Não há edição de um agendamento já criado.
- Não há histórico, relatórios ou busca por cliente.
- Não há notificações ou lembretes para o cliente.
- Não há indicação específica para a ausência de resultados em um período.
- A disponibilidade está limitada a intervalos fixos de uma hora entre 9h e 21h.
- O produto não apresenta recursos de gerenciamento de feriados, pausas ou exceções de funcionamento.
- A operação publicada depende da disponibilidade do serviço que mantém os agendamentos; o cenário atual não oferece uma experiência completa de agenda compartilhada na internet.

<a id="proximos-passos"></a>

## 11. Próximos Passos

- Adicionar autenticação e perfis para separar agendas e permissões.
- Permitir múltiplos profissionais e configurações de horário por estabelecimento.
- Incluir edição de agendamentos.
- Permitir configurar duração, tipo e preço dos serviços.
- Adicionar busca por nome e histórico de atendimentos.
- Criar estados explícitos para agenda vazia e indisponibilidade temporária.
- Implementar feriados, pausas e exceções de funcionamento.
- Adicionar lembretes e confirmações para clientes.
- Melhorar a experiência em dispositivos móveis.
- Disponibilizar uma camada de dados remota para uso compartilhado e persistente.

<a id="metricas-de-sucesso"></a>

## 12. Métricas de Sucesso

O sucesso do produto pode ser avaliado por comportamentos diretamente relacionados ao objetivo da agenda:

- Usuários concluem um agendamento com nome, data e horário válidos.
- Usuários encontram um horário disponível sem precisar repetir a consulta.
- A taxa de tentativas de agendamento recusadas por dados incompletos diminui.
- A taxa de conflitos de horário permanece nula.
- Usuários conseguem cancelar um atendimento sem remoções acidentais.
- O tempo entre a abertura da agenda e a conclusão do agendamento diminui.
- A proporção de agendas consultadas que resulta em uma decisão de agendamento ou cancelamento aumenta.
- Usuários retornam para consultar ou atualizar a agenda de dias diferentes conforme sua rotina de atendimento.

---

Documento de produto elaborado por [Victor Martins](https://github.com/VictorMartinsD).

Este documento descreve a visão funcional e estratégica do sistema.

---

<h1 align="center">Product Specification — Hairday</h1>

<a id="product-overview"></a>

## 1. Product Overview

Hairday is a system for organizing service appointments by date and time. It brings appointment creation and daily schedule consultation together in a single screen.

The product addresses the need to record appointments clearly, identify open time slots, and review the schedule without navigating through unrelated days. The value delivered is a lower risk of time conflicts and an immediate view of the day's appointments.

<a id="problem"></a>

## 2. Problem

Without a centralized schedule, the person responsible for appointments must manage commitments manually and verify availability independently. This increases the risk of booking an occupied time slot, forgetting client information, or losing visibility into the sequence of appointments for the day.

The problem needs to be addressed because time-slot availability is a core service rule. Incorrect information directly affects appointment organization and creates rework.

<a id="product-objective"></a>

## 3. Product Objective

The system should allow the schedule owner to:

- select a valid date;
- identify available time slots;
- record the client's name and selected time;
- review appointments organized throughout the day;
- cancel an appointment when necessary.

The expected result is an up-to-date daily schedule that requires less effort to find availability and manage changes.

<a id="target-user"></a>

## 4. Target User

The primary user is a self-employed professional or service-business operator who manages hair appointments and client schedules.

- **Profile:** person who books and monitors client appointments.
- **Technical level:** end user with no programming knowledge required.
- **Usage context:** daily schedule planning and new appointment registration.
- **Primary need:** know which time slots are open and keep the day's appointments organized.

<a id="features"></a>

## 5. Features

### Schedule consultation by date

The user selects a date and the system shows the appointments for that day. Records are separated into morning, afternoon, and night, with the time and client name.

### Availability identification

The system shows the time slots within the service hours. Already booked or past slots are identified as unavailable and cannot be selected for a new appointment.

### Appointment creation

The user selects a date, chooses an open time slot, enters the client's name, and requests the appointment. The system validates the information, confirms creation, and updates the displayed schedule.

### Appointment cancellation

The user requests cancellation of an existing appointment. The system asks for confirmation before removing the commitment and, after confirmation, updates the list and releases the corresponding time slot.

### Update after context changes

When the selected date changes or an appointment is created or cancelled, the system updates the time slots and appointments to reflect the new situation.

<a id="business-rules"></a>

## 6. Business Rules

- The schedule initially opens on the current day.
- The user cannot select a date before the current day.
- The system considers service hours from 9:00 AM to 9:00 PM in one-hour intervals.
- A time slot with an existing appointment is unavailable.
- A time slot that has already passed on the current day is unavailable.
- The system requires a client name to complete an appointment.
- The system requires an available time slot to complete an appointment.
- Leading and trailing spaces in the client name are not considered part of the stored value.
- An appointment is associated with the selected date and time.
- Cancellation occurs only after user confirmation.
- After creating or cancelling an appointment, the daily schedule must reflect the change.
- An empty schedule is a valid state: no appointments are listed and future time slots remain available.

<a id="user-flow"></a>

## 7. User Flow

1. The user opens Hairday.
2. The system opens the schedule on the current day.
3. The system shows available time slots and existing appointments, separated by period.
4. The user chooses a date equal to or later than the current day.
5. The system updates availability and appointments for the selected date.
6. The user selects an available time slot.
7. The user enters the client's name.
8. The user requests the appointment.
9. The system validates the information and confirms the new appointment.
10. The system updates the schedule and prepares the form for the next entry.
11. To remove an appointment, the user selects the cancellation action for the record.
12. The system requests confirmation and, when confirmed, removes the appointment and updates availability.

<a id="mvp-1"></a>

## 8. MVP (Minimum Viable Product)

The indispensable product core is daily schedule management:

1. consult time slots and appointments by date;
2. create an appointment in an available time slot;
3. cancel an existing appointment.

Without the ability to record a time slot and keep its availability current, the product no longer fulfils its primary purpose.

<a id="product-decisions"></a>

## 9. Product Decisions

- **Start on the current day:** reduces the number of steps for the most frequent task and avoids requiring initial date setup.
- **Prevent past dates:** avoids recording appointments in periods that have already passed and keeps the schedule focused on current or future planning.
- **Show occupied time slots as unavailable:** makes availability visible before an appointment attempt and reduces time conflicts.
- **Separate the schedule by periods of the day:** makes scanning easier and helps users locate an appointment within the daily routine.
- **Require confirmation before cancellation:** reduces accidental appointment removal.
- **Update the schedule after every change:** keeps displayed information consistent with the completed action and avoids requiring a manual page reload.
- **Keep creation in a short flow:** combines date, time, and client name into a direct task suitable for repeated daily operations.

<a id="current-limitations"></a>

## 10. Current Limitations

- There is no authentication or user profile support.
- There is no explicit support for multiple professionals or businesses.
- There is no service catalogue, variable duration, or price information.
- Existing appointments cannot be edited.
- There is no history, reporting, or client search.
- There are no client notifications or reminders.
- There is no specific empty-state message for periods without appointments.
- Availability is limited to fixed one-hour intervals from 9:00 AM to 9:00 PM.
- The product has no holiday, break, or operating-hours exception management.
- The deployed operation depends on the availability of the service that stores appointments; the current scenario does not provide a complete shared online scheduling experience.

<a id="next-steps"></a>

## 11. Next Steps

- Add authentication and profiles to separate schedules and permissions.
- Support multiple professionals and business-specific opening hours.
- Allow existing appointments to be edited.
- Add configurable service duration, type, and price.
- Add client search and appointment history.
- Create explicit states for an empty schedule and temporary unavailability.
- Implement holidays, breaks, and operating-hours exceptions.
- Add client reminders and confirmations.
- Improve the experience on mobile devices.
- Provide a remote data layer for shared and persistent use.

<a id="success-metrics"></a>

## 12. Success Metrics

Product success can be evaluated through behaviors directly related to the schedule's objective:

- Users complete an appointment with valid name, date, and time information.
- Users find an available time slot without repeating the consultation.
- The rate of appointment attempts rejected because of incomplete information decreases.
- The time-conflict rate remains zero.
- Users can cancel an appointment without accidental removals.
- The time from opening the schedule to completing an appointment decreases.
- The proportion of schedule consultations that results in an appointment or cancellation decision increases.
- Users return to consult or update schedules for different days as part of their service routine.

---

Product document prepared by [Victor Martins](https://github.com/VictorMartinsD).

This document describes the functional and strategic vision of the system.
