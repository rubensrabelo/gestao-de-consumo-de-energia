# Projeto Sistema de Monitoramento de Consumo de Energia

**Autor:** Rubens Rabêlo Soares

## 1. Introdução

Este projeto tem como objetivo criar um sistema para monitoramento do consumo de energia elétrica, permitindo o cadastro de medidores, registro de leituras diárias e visualização de dados em dashboards com gráficos e resumos.  

O sistema foi desenvolvido utilizando **React + Typecript** para o front-end, **Node.js + Express** para a API e **MongoDB** como banco de dados. 

---

## 2. Arquitetura do Projeto

A arquitetura do sistema é dividida em três camadas principais:

### 2.1 Front-end
- Implementado em **React + TypeScript**
- Componentização de telas, cards e gráficos
- Uso do **Recharts** para visualização de consumo
- Modais para registro de leituras
- Router com `react-router-dom` para navegação entre telas

#### **2.1.1. Estrutura das pastas**

```
frontend/
├─ public/
│  └─ index.html
├─ src/
│  ├─ api/
│  │  └─ services/
│  │     ├─ base/
│  │     │  └─ http.ts
│  │     ├─ meter/
│  │     │  ├─ createMeter.ts
│  │     │  ├─ getAllMeters.ts
│  │     │  └─ registerReading.ts
│  │     └─ dashboard/
│  │        └─ getDashboard.ts
│  │
│  ├─ components/
│  │  ├─ Header/
│  │  │  ├─ Header.tsx
│  │  │  └─ Header.module.css
│  │  ├─ SummaryCard/
│  │  ├─ ConsumptionChart/
│  │  └─ RegisterReadingModal/
│  │
│  ├─ hooks/
│  │  └─ useDashboard.ts
│  │
│  ├─ pages/
│  │  ├─ Home/
│  │  │  └─ Home.tsx
│  │  └─ Dashboard/
│  │     └─ Dashboard.tsx
│  │
│  ├─ layouts/
│  │  └─ PublicLayout.tsx
│  │
│  ├─ types/
│  │  ├─ domain/
│  │  │  ├─ Meter.ts
│  │  │  └─ MeterForm.ts
│  │  └─ dashboard/
│  │     └─ EnergyDashboard.ts
│  │
│  ├─ App.tsx
│  ├─ App.module.css
│  └─ main.tsx
├─ .env
├─ package.json
└─ tsconfig.json
```

**2.1.2. Observações:**

* `api/services` → todas as chamadas HTTP.
* `components` → UI reutilizável, incluindo modais, charts e cards.
* `hooks` → lógica de consumo de dados (ex.: `useDashboard`).
* `types` → tipagem TypeScript para dados do sistema.
* `App.module.css` → CSS global + reset + variáveis.


### 2.2 Back-end
- Implementado em **Node.js + TypeScript**
- Padrão de arquitetura **Repository-Service-Controller**
- Comunicação com **MongoDB** usando **Mongoose**
- Tratamento de erros centralizado
- Validação de dados de consumo e medidores

## **2.2.1. Estrutura das pastas:**

```
backend/
├─ src/
│  ├─ api/
│  │  ├─ controllers/
│  │  │  ├─ DashboardController.ts
│  │  │  └─ MeterController.ts
│  │  └─ routes/
│  │     ├─ dashboardRoutes.ts
│  │     └─ meterRoutes.ts
│  │
│  ├─ application/
│  │  └─ services/
│  │     ├─ DashboardService.ts
│  │     └─ EnergyReadingService.ts
│  │
│  ├─ domain/
│  │  ├─ entities/
│  │  │  ├─ EnergyMeter.ts
│  │  │  └─ EnergyReading.ts
│  │  └─ factories/
│  │     └─ EnergyMeterFactoryProvider.ts
│  │
│  ├─ infra/
│  │  ├─ repositories/
│  │  │  ├─ DashboardRepository.ts
│  │  │  ├─ EnergyMeterRepository.ts
│  │  │  └─ EnergyReadingRepository.ts
│  │  └─ database/
│  │     └─ mongoose.ts
│  │
│  ├─ shared/
│  │  └─ errors/
│  │     └─ AppError.ts
│  │
│  ├─ config/
│  │  └─ envConfig.ts
│  │
│  └─ server.ts
├─ .env
├─ package.json
└─ tsconfig.json
```

**2.2.2. Observações:**

* `controllers` → recebem as requisições HTTP.
* `services` → lógica de negócio.
* `repositories` → acesso ao banco de dados (MongoDB).
* `entities` → modelos de negócio (ex.: EnergyMeter, EnergyReading).
* `factories` → criação de objetos complexos, padrão Factory.
* `shared/errors` → erros customizados para API.
* `config/envConfig.ts` → URL base e variáveis de ambiente.
* `database/mongoose.ts` → inicialização do MongoDB.

### 2.3 Banco de Dados
- **MongoDB** com coleções:
  - `energyMeters` → cadastro de medidores
  - `energyReadings` → registros de consumo
- Utilização de **ObjectId** para referência de medidores
- Agregações para cálculo de consumo total, médio e diário

### 2.4 Fluxo de Dados
1. Usuário insere o tipo de medidor Residêncial ou Escolar
2. Usuário acessa o dashboard de um medidor específico
3. Front-end requisita dados via API
4. Back-end busca informações no MongoDB
5. API retorna dados consolidados (total, média, diário)
6. Front-end renderiza gráficos e cards

---