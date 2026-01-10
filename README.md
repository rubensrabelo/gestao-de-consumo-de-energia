# 📌 Projeto Detalhado de Software

## Sistema de Gestão de Consumo de Energia (Residencial / Escolar)

---

## 1️⃣ Visão Geral do Sistema

### Objetivo

Desenvolver um sistema capaz de **registrar, analisar e classificar o consumo de energia elétrica**, gerando **alertas automáticos** quando o consumo ultrapassar limites definidos, auxiliando residências e instituições de ensino na redução de desperdícios.

### Justificativa

O consumo de energia geralmente é acompanhado apenas pelo valor da conta mensal, sem análise de padrões, picos ou tendências. Este sistema permite **análise contínua**, **classificação de risco** e **ações preventivas**, utilizando conceitos sólidos de engenharia de software.

---

## 2️⃣ Tecnologias Utilizadas

### Backend

* Node.js
* TypeScript
* Express (apenas para rotas)

### Frontend

* React + TypeScript

📌 **Observação importante para o relatório**

> Os frameworks utilizados são responsáveis apenas pela comunicação e interface. As regras de negócio e os padrões de projeto estão implementados de forma explícita no domínio da aplicação.

---

## 3️⃣ Arquitetura Geral

### Separação em Camadas

```
Frontend (React)
   ↓
Controllers / API
   ↓
Facade
   ↓
Domínio (Padrões de Projeto)
```

📌 **Framework não conhece o domínio**
📌 **Domínio não depende de framework**

---

## 4️⃣ Modelagem do Domínio (Classes Principais)

### 🔹 Entidades

#### `EnergyReading`

Representa uma leitura de consumo.

* id
* timestamp
* consumptionValue (kWh)

---

#### `EnergyMeter`

Representa um medidor de energia.

* id
* location
* readings[]
* currentState
* strategy

Responsabilidades:

* Registrar leitura
* Delegar cálculo de consumo
* Alterar estado conforme análise

---

## 5️⃣ Padrões de Projeto Aplicados (5 obrigatórios)

---

## 🟢 1. Strategy – Cálculo de Consumo

### Problema

O consumo pode ser analisado de maneiras diferentes dependendo do contexto (residencial, escolar, pico, média).

### Solução

Encapsular cada algoritmo de cálculo em uma estratégia.

### Estrutura

```ts
interface ConsumptionCalculationStrategy {
  calculate(readings: EnergyReading[]): number;
}
```

### Implementações

* `ResidentialConsumptionStrategy`
* `SchoolConsumptionStrategy`

### Onde foi aplicado

Dentro da classe `EnergyMeter`.

### Benefício

* Elimina condicionais
* Facilita extensão
* Código aberto para novos cálculos

---

## 🟢 2. State – Estado do Consumo

### Problema

O consumo muda de comportamento e regras conforme sua gravidade.

### Estados

* Normal
* Warning
* Critical

### Estrutura

```ts
interface ConsumptionState {
  handle(monitor: ConsumptionMonitor): void;
}
```

### Onde foi aplicado

Na transição automática de estados do consumo.

### Benefício

* Evita `if/else`
* Transições explícitas
* Código mais legível

---

## 🟢 3. Observer – Sistema de Alertas

### Problema

Múltiplos componentes precisam reagir a mudanças de consumo.

### Solução

Implementar observadores desacoplados.

### Estrutura

```ts
interface Observer {
  update(event: ConsumptionEvent): void;
}
```

### Observadores

* `AlertObserver`
* `HistoryObserver`

### Benefício

* Baixo acoplamento
* Fácil adicionar novos alertas
* Reatividade do sistema

---

## 🟢 4. Factory Method – Criação de Medidores

### Problema

Existem diferentes tipos de medidores com configurações distintas.

### Solução

Centralizar a criação dos objetos.

### Estrutura

```ts
abstract class EnergyMeterFactory {
  abstract createMeter(): EnergyMeter;
}
```

### Implementações

* `ResidentialMeterFactory`
* `SchoolMeterFactory`

### Benefício

* Controle da criação
* Código mais organizado
* Fácil manutenção

---

## 🟢 5. Facade – Interface do Sistema

### Problema

O frontend não deve lidar com a complexidade do domínio.

### Solução

Criar uma fachada que centraliza operações.

### Estrutura

```ts
class EnergyManagementFacade {
  registerReading(...)
  analyzeConsumption(...)
  getAlerts(...)
}
```

### Benefício

* Interface simples
* Reduz acoplamento
* Facilita testes

---

## 6️⃣ Diagramas

### 📘 Diagrama de Classes (classes obrigatórias)

Você vai desenhar:

* EnergyMeter
* EnergyReading
* ConsumptionCalculationStrategy
* ConsumptionState
* Observer
* EnergyMeterFactory
* EnergyManagementFacade

📌 **Relacionamentos importantes**

* Strategy → EnergyMeter
* State → ConsumptionMonitor
* Observer → Subject
* Factory → EnergyMeter
* Facade → todos

---

### 📙 Diagramas de Sequência

#### 🔹 Diagrama 1 – Registro de Leitura

```
Usuário → Frontend
Frontend → Controller
Controller → Facade
Facade → Factory
Factory → EnergyMeter
EnergyMeter → Strategy
EnergyMeter → State
State → Observer
```

---

#### 🔹 Diagrama 2 – Geração de Alerta

```
EnergyMeter → State
State → Observer
Observer → AlertService
```

---

## 7️⃣ Estrutura do Repositório

```
/backend
  /domain
    /entities
    /strategies
    /states
    /observers
    /factories
    /facade
  /controllers
  /routes

/frontend
/docs
  diagramas
  relatorio.pdf

README.md
```