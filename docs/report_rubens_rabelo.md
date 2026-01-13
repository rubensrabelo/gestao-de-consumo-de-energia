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

#### 2.1.1. Estrutura das pastas

```ts
frontend/
├─ public/
│  └─ index.html
├─ src/
│  ├─ api/
│  │  └─ services/
│  │     ├─ base/
│  │     ├─ meter/
│  │     └─ dashboard/
│  │
│  ├─ components/      // UI reutilizável global (ex.: Header, NotificationToast)
│  │  ├─ Header/
│  │  ├─ Notification/
│  │  └─ ...
│  │
│  ├─ pages/           // Cada página encapsula seus próprios components e hooks
│  │  ├─ Home/
│  │  │  ├─ components/
│  │  │  └─ hooks/
│  │  │
│  │  └─ Dashboard/
│  │     ├─ components/
│  │     └─ hooks/
│  │
│  ├─ config/          // Configurações gerais, captura do .env
│  ├─ context/         // Ex.: NotificationContext, AuthContext
│  ├─ layouts/         // Layouts gerais (ex.: MainLayout)
│  ├─ router/          // Registro das rotas do frontend
│  │
│  ├─ types/           // Tipagem TypeScript para dados do sistema
│  │  ├─ domain/
│  │  ├─ dashboard/
│  │  └─ enums/
│  │
│  ├─ App.tsx
│  ├─ App.module.css
│  └─ main.tsx
├─ .env
├─ package.json
└─ tsconfig.json
```

#### 2.1.2. Observações:

* `api/services` → todas as chamadas HTTP ao backend.
* `config` → captura variáveis do `.env` e configurações gerais.
* `components` → UI reutilizável global, como Header, modais, charts, cards e notificações.
* `pages/*/components` → components específicos daquela página.
* `pages/*/hooks` → hooks específicos daquela página, sem poluir hooks globais.
* `context` → contexto global, como socket para notificações ou autenticação.
* `layouts` → componentes de layout, ex.: `MainLayout`.
* `router` → registro e gerenciamento das rotas do frontend.
* `types` → tipagem TypeScript para todos os dados do sistema.
* `App.module.css` → CSS global + reset + variáveis.


### 2.2 Back-end
- Implementado em **Node.js + TypeScript**
- Padrão de arquitetura **Repository-Service-Controller**
- Comunicação com **MongoDB** usando **Mongoose**
- Tratamento de erros centralizado
- Validação de dados de consumo e medidores

## 2.2.1. Estrutura das pastas:

```ts
backend/
├─ src/
│  ├─ api/
│  │  ├─ controllers/      // Recebem requisições HTTP, chamam os services
│  │  └─ routes/           // Definição das rotas da API
│  │
│  ├─ application/         
│  │  └─ services/         // Lógica de negócio, interage com domain e repositories
│  │
│  ├─ domain/
│  │  ├─ entities/         // Modelos de negócio (ex.: EnergyMeter, EnergyReading)
│  │  ├─ factories/        // Padrão Factory para criação de objetos complexos
│  │  ├─ observers/        // Implementação de observers (notificações, logs, etc.)
│  │  ├─ states/           // States ou status específicos de entidades
│  │  └─ strategies/       // Estratégias e regras de negócio variantes
│  │
│  ├─ infra/
│  │  ├─ repositories/     // Acesso ao banco (MongoDB)
│  │  │  └─ models/
│  │  ├─ database/         // Conexão e setup do MongoDB
│  │  └─ socket/           // Socket.IO para notificações em tempo real
│  │
│  ├─ shared/
│  │  └─ errors/           // Erros customizados para API (AppError)
│  │
│  ├─ config/              // Containers para injeção de dependências
│  │
│  ├─ app.ts               // Configuração do Express
│  └─ server.ts            // Inicialização do servidor + Socket.IO
├─ .env
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
└─ tsconfig.json

```

#### 2.2.2. Observações:

* `api/controllers` → recebem requisições, chamam os services e retornam respostas HTTP.
* `application/services` → lógica de negócio, integra domain e infra.
* `infra/repositories` → abstração do banco de dados, separando persistência da lógica.
* `infra/database` → inicialização e conexão com MongoDB.
* `infra/socket` → gerenciamento de sockets para notificações em tempo real.
* `domain/entities` → entidades do sistema, contendo estado e regras básicas.
* `domain/factories` → padrão Factory para criar entidades complexas.
* `domain/observers` → implementação do padrão Observer, usado para logs e notificações.
* `domain/states` → estados ou status possíveis para as entidades.
* `domain/strategies` → implementação do padrão Strategy para regras variantes.
* `shared/errors` → erros customizados (ex.: `AppError`) para padronizar respostas da API.
* `config` → leitura de variáveis de ambiente.
* `app.ts` → configuração do Express e middlewares.
* `server.ts` → inicialização do HTTP server + integração com Socket.IO.

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

## 3. Aplicação da Injeção de Dependência (Backend)

No backend do sistema, a **injeção de dependência (Dependency Injection – DI)** foi utilizada para manter o código modular, desacoplado e mais fácil de testar. Essa abordagem permite que classes de alto nível (como **controllers** e **services**) dependam de abstrações ou instâncias concretas fornecidas externamente, em vez de criarem suas próprias dependências internamente.

### 3.1. Controllers e Services

As controllers no sistema não possuem lógica de negócio própria. Elas recebem via construtor instâncias de **services**, que por sua vez recebem suas dependências de **repositories**.

Exemplo do **Dashboard**:

```ts
// config/bootstrapDashboard.ts
import { DashboardRepository } from "../infra/repositories/DashboardRepository";
import { EnergyMeterRepository } from "../infra/repositories/EnergyMeterRepository";
import { DashboardService } from "../application/services/DashboardService";
import { DashboardController } from "../api/controllers/DashboardController";

// Instancia os repositórios
const dashboardRepository = new DashboardRepository();
const meterRepository = new EnergyMeterRepository();

// Injeta os repositórios no serviço
const dashboardService = new DashboardService(dashboardRepository, meterRepository);

// Injeta o serviço na controller
export const dashboardController = new DashboardController(dashboardService);
```

* `DashboardController` não precisa criar ou conhecer a implementação dos repositórios.
* `DashboardService` recebe os repositórios via construtor, mantendo o **acoplamento baixo**.
* Qualquer mudança na implementação dos repositórios (ex.: trocar MongoDB por PostgreSQL) não afeta os controllers.

### 3.2. Outros serviços do backend

O mesmo padrão é aplicado para medidores e leituras de energia:

```ts
// config/bootstrapEnergy.ts
import { EnergyMeterService } from "../application/services/EnergyMeterService";
import { EnergyReadingService } from "../application/services/EnergyReadingService";
import { EnergyMeterRepository } from "../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../infra/repositories/EnergyReadingRepository";
import { EnergyMeterController } from "../api/controllers/EnergyMeterController";
import { EnergyReadingController } from "../api/controllers/EnergyReadingController";

// Repositórios
const meterRepository = new EnergyMeterRepository();
const readingRepository = new EnergyReadingRepository();

// Services com injeção de dependência
const meterService = new EnergyMeterService(meterRepository);
const readingService = new EnergyReadingService(meterRepository, readingRepository);

// Controllers recebem os services via construtor
export const energyMeterController = new EnergyMeterController(meterService);
export const energyReadingController = new EnergyReadingController(readingService);
```

### 3.3. Benefícios da abordagem

1. **Desacoplamento**: Classes de alto nível não criam suas dependências diretamente, reduzindo o acoplamento entre camadas.
2. **Substituição fácil**: Implementações concretas podem ser substituídas sem alterar os controllers ou serviços. Ex.: trocar `EnergyMeterRepository` por outro tipo de persistência.
3. **Coerência e manutenção**: Toda a configuração das dependências é centralizada na pasta `config/`, tornando o projeto mais organizado e previsível.

---

## 4. Padrões de Projetos Aplicados

O sistema aplica diversos **padrões de projeto** para tornar o código modular, testável e escalável. Abaixo, detalhamos cada padrão com exemplos concretos:


### 4.1 Repository

* Abstrai o acesso ao banco de dados, garantindo que a lógica de negócio não precise conhecer detalhes do MongoDB.
* Cada entidade possui seu próprio repositório:

  * `EnergyMeterRepository` → criação, busca por ID e listagem de medidores.
  * `EnergyReadingRepository` → registro e busca de leituras por medidor.
  * `DashboardRepository` → agregações para total, média e consumo diário.

```mermaid

```

### 4.2 Service

* Contém **lógica de negócio** e integra os repositórios e factories.
* Valida dados, aplica regras de negócio e prepara resultados para o controller.
* Exemplos:

  * `EnergyMeterService` → cria medidores, lista todos e valida tipos via `EnergyMeterFactoryProvider`.
  * `EnergyReadingService` → registra leituras, aplica a factory correspondente e atualiza estado do medidor.
  * `DashboardService` → agrega dados de consumo total, médio e diário.

```mermaid

```

### 4.4 Controller

* Recebe requisições HTTP e retorna respostas, separando a API da lógica de negócio.
* Valida entrada, trata erros e chama services.
* Exemplos:

  * `EnergyMeterController` → criar medidor, listar medidores.
  * `EnergyReadingController` → registrar leitura.
  * `DashboardController` → retorna dashboard de consumo agregado.
* Tratamento de erros padronizado via `AppError`.

```mermaid

```

### 4.4 Factory

* Cria objetos complexos sem expor a lógica de construção.
* Facilita a extensão do sistema com novos tipos de medidores ou estratégias.
* Estrutura:

  * `EnergyMeterFactory` → cria instâncias de `EnergyMeter` com observers, estado e analisador.
  * `ResidentialMeterFactory` e `SchoolMeterFactory` → encapsulam estratégias de cálculo específicas.
  * `EnergyMeterFactoryProvider` → provê a factory correta com base no tipo do medidor.
* Exemplo: a factory adiciona automaticamente os observers necessários:

```mermaid

```

### 4.5 Observer

* Permite que múltiplos componentes sejam notificados de eventos sem acoplamento direto.
* Aplicação:

  * Backend notifica logs, alertas e front-end via Socket.IO.
  * Observers registrados no `EnergyMeter` recebem eventos de mudanças de estado ou leituras.
* Exemplo de observer para front-end:

```mermaid

```

### 4.6 Strategy

* Permite algoritmos de cálculo intercambiáveis para diferentes tipos de medidores.
* Cada medidor possui uma estratégia de cálculo específica:

  * `ResidentialConsumptionStrategy` → soma direta das leituras.
  * `SchoolConsumptionStrategy` → soma das leituras com ajuste de 10%.
* O analisador do medidor (`EnergyMeterAnalyzer`) aplica a estratégia apropriada:

```mermaid

```

### 4.7 State

* Permite que `EnergyMeter` altere seu comportamento conforme o **estado de consumo**.
* Estados implementam regras próprias de transição e notificações:

  * `NormalState` → sem alerta, transita para `WarningState` se ultrapassar 500.
  * `WarningState` → alerta moderado, transita para `CriticalState` se ultrapassar 1000.
  * `CriticalState` → alerta crítico, notifica observadores.
* `ConsumptionStateProvider` gerencia instâncias únicas de cada estado.
* Aplicação no `EnergyMeter`:

```mermaid

```

### 4.8 Facade

* `EnergyMeter` atua como **facade**, unificando várias responsabilidades:

  * Armazenamento de leituras (`EnergyMeterReadings`)
  * Notificação de eventos (`EnergyMeterObservers`)
  * Cálculo de consumo (`EnergyMeterAnalyzer`)
  * Gerenciamento de estado (`EnergyMeterState`)
* Isso permite que front-end ou services interajam com **um ponto único**, sem precisar conhecer detalhes internos do medidor.

```mermaid

```

### 4.9 Context + Observer no Front-end

* O front-end se conecta ao backend via **Socket.IO**.
* O `NotificationContext` mantém uma lista de notificações e atualiza o componente `NotificationToast`.
* Usuário recebe mensagens em tempo real quando eventos de medidor acontecem (mudança de estado, alertas).
* Exemplo de uso:

## 5 Diagrama completo do sistema

### 5.1. Fluxo de consumo da Dashboard

#### 5.1.1. Digrama de Classes

```mermaid
classDiagram
    class DashboardController {
        - dashboardService: DashboardService
        + show(req: Request, res: Response)
    }

    class DashboardService {
        - dashboardRepository: DashboardRepository
        - meterRepository: EnergyMeterRepository
        + getMeterDashboard(meterId: string)
    }

    class DashboardRepository {
        + getConsumptionSummary(meterId: string)
        + getDailyConsumption(meterId: string)
    }

    class EnergyMeterRepository {
        + create(type: string)
        + findById(id: string)
        + findAll()
    }

    class BootstrapDashboard {
        - dashboardRepository: DashboardRepository
        - meterRepository: EnergyMeterRepository
        - dashboardService: DashboardService
        - dashboardController: DashboardController
    }

    class DashboardRoutes {
        + get("/meters/:meterId", dashboardController.show)
    }

    BootstrapDashboard --> DashboardRoutes : instantiates

    DashboardController --> DashboardService : depends on
    DashboardService --> DashboardRepository : depends on
    DashboardService --> EnergyMeterRepository : depends on

    BootstrapDashboard --> DashboardRepository : instantiates
    BootstrapDashboard --> EnergyMeterRepository : instantiates
    BootstrapDashboard --> DashboardService : instantiates
    BootstrapDashboard --> DashboardController : instantiates

    DashboardRoutes --> DashboardController : uses
```
---

#### 5.1.2 Diagramas de Sequências

```mermaid
sequenceDiagram
    participant Frontend
    participant Route as Dashboard Route
    participant Controller as DashboardController
    participant Service as DashboardService
    participant MeterRepo as EnergyMeterRepository
    participant DashboardRepo as DashboardRepository
    participant DB as MongoDB
    participant Config as Bootstrap/DI

    Note over Config: Configuração de DI
    Config->>MeterRepo: instancia EnergyMeterRepository
    Config->>DashboardRepo: instancia DashboardRepository
    Config->>Service: instancia DashboardService(DashboardRepo, MeterRepo)
    Config->>Controller: instancia DashboardController(Service)
    Config-->>Route: exporta Controller

    Frontend->>Route: GET /meters/:meterId
    Route->>Controller: dashboardController.show(req, res)
    Controller->>Service: getMeterDashboard(meterId)
    alt meterId vazio
        Service-->>Controller: lança AppError("Meter ID is required")
        Controller-->>Frontend: 400 Bad Request
    else meterId válido
        Service->>MeterRepo: findById(meterId)
        MeterRepo->>DB: busca medidor por ID
        DB-->>MeterRepo: retorna medidor ou null
        alt medidor não encontrado
            MeterRepo-->>Service: null
            Service-->>Controller: lança AppError("Energy meter not found")
            Controller-->>Frontend: 404 Not Found
        else medidor encontrado
            MeterRepo-->>Service: retorna medidor
            Service->>DashboardRepo: getConsumptionSummary(meterId)
            DashboardRepo->>DB: aggregate total e média
            DB-->>DashboardRepo: retorna summary
            DashboardRepo-->>Service: summary
            Service->>DashboardRepo: getDailyConsumption(meterId)
            DashboardRepo->>DB: aggregate diário
            DB-->>DashboardRepo: retorna diário
            DashboardRepo-->>Service: diário
            Service-->>Controller: dashboard completo
            Controller-->>Frontend: 200 OK + JSON
        end
    end

```

## 5.2. Fluxo de gerenciamento de Medidores de Energia

### 5.2.1. Diagrama de Classes

```mermaid
classDiagram
    class EnergyMeterController {
        - service: EnergyMeterService
        + createMeter(req: Request, res: Response)
        + getAllMeters(req: Request, res: Response)
    }

    class EnergyMeterService {
        - meterRepository: EnergyMeterRepository
        + createMeter(type: string)
        + getAllMeters()
    }

    class EnergyMeterRepository {
        + create(type: string)
        + findById(id: string)
        + findAll()
    }

    class EnergyMeterFactoryProvider {
        + getFactory(type: string)
    }

    class BootstrapEnergy {
        - meterRepository: EnergyMeterRepository
        - meterService: EnergyMeterService
        - energyMeterController: EnergyMeterController
    }

    class EnergyMeterRoutes {
        + post("/meter", energyMeterController.createMeter)
        + get("/meters", energyMeterController.getAllMeters)
    }

    %% Relações de Instanciação (DI)
    BootstrapEnergy --> EnergyMeterRepository : instantiates
    BootstrapEnergy --> EnergyMeterService : instantiates
    BootstrapEnergy --> EnergyMeterController : instantiates
    BootstrapEnergy --> EnergyMeterRoutes : configures

    %% Relações de Dependência
    EnergyMeterController --> EnergyMeterService : depends on
    EnergyMeterService --> EnergyMeterRepository : depends on
    EnergyMeterService --> EnergyMeterFactoryProvider : validates type

    EnergyMeterRoutes --> EnergyMeterController : uses
```

---

### 5.2.2. Diagrama de Sequência – Criação de Medidor (`POST /meter`)

```mermaid
sequenceDiagram
    participant Frontend
    participant Route as EnergyMeter Route
    participant Controller as EnergyMeterController
    participant Service as EnergyMeterService
    participant Factory as EnergyMeterFactoryProvider
    participant Repo as EnergyMeterRepository
    participant DB as MongoDB
    participant Config as Bootstrap/DI

    Note over Config: Configuração de Injeção de Dependência
    Config->>Repo: instancia EnergyMeterRepository
    Config->>Service: instancia EnergyMeterService(Repo)
    Config->>Controller: instancia EnergyMeterController(Service)
    Config-->>Route: exporta Controller

    Frontend->>Route: POST /meter { type }
    Route->>Controller: createMeter(req, res)
    Controller->>Service: createMeter(type)

    alt tipo não informado
        Service-->>Controller: lança AppError("Meter type is required")
        Controller-->>Frontend: 400 Bad Request
    else tipo informado
        Service->>Factory: getFactory(type)
        alt tipo inválido
            Factory-->>Service: lança AppError("Invalid meter type")
            Service-->>Controller: erro
            Controller-->>Frontend: 400 Bad Request
        else tipo válido
            Factory-->>Service: factory válida
            Service->>Repo: create(type)
            Repo->>DB: salva EnergyMeter
            DB-->>Repo: retorna documento salvo
            Repo-->>Service: meter salvo
            Service-->>Controller: dados do medidor
            Controller-->>Frontend: 201 Created + JSON
        end
    end
```

---

### 5.2.3. Diagrama de Sequência – Listagem de Medidores (`GET /meters`)

```mermaid
sequenceDiagram
    participant Frontend
    participant Route as EnergyMeter Route
    participant Controller as EnergyMeterController
    participant Service as EnergyMeterService
    participant Repo as EnergyMeterRepository
    participant DB as MongoDB

    Frontend->>Route: GET /meters
    Route->>Controller: getAllMeters(req, res)
    Controller->>Service: getAllMeters()
    Service->>Repo: findAll()
    Repo->>DB: busca todos os medidores
    DB-->>Repo: lista de medidores
    Repo-->>Service: medidores
    Service-->>Controller: lista mapeada (id, type, createdAt)
    Controller-->>Frontend: 200 OK + JSON
```

## 5.3. Fluxo de registro de Leituras de Consumo

### 5.3.1. Diagrama de Classes

```mermaid
classDiagram
    class EnergyReadingController {
        - service: EnergyReadingService
        + registerReading(req: Request, res: Response)
    }

    class EnergyReadingService {
        - meterRepository: EnergyMeterRepository
        - readingRepository: EnergyReadingRepository
        + registerReading(meterId: string, value: number)
    }

    class EnergyMeterRepository {
        + create(type: string)
        + findById(id: string)
        + findAll()
    }

    class EnergyReadingRepository {
        + save(meterId: string, value: number)
        + findByMeter(meterId: string)
    }

    class EnergyMeterFactoryProvider {
        + getFactory(type: string)
    }

    class EnergyMeter {
        + addReading(reading: EnergyReading)
    }

    class EnergyReading {
        + value: number
    }

    class BootstrapEnergy {
        - meterRepository: EnergyMeterRepository
        - readingRepository: EnergyReadingRepository
        - readingService: EnergyReadingService
        - energyReadingController: EnergyReadingController
    }

    class EnergyReadingRoutes {
        + post("/reading", energyReadingController.registerReading)
    }

    %% Instanciação (DI)
    BootstrapEnergy --> EnergyMeterRepository : instantiates
    BootstrapEnergy --> EnergyReadingRepository : instantiates
    BootstrapEnergy --> EnergyReadingService : instantiates
    BootstrapEnergy --> EnergyReadingController : instantiates
    BootstrapEnergy --> EnergyReadingRoutes : configures

    %% Dependências
    EnergyReadingController --> EnergyReadingService : depends on
    EnergyReadingService --> EnergyMeterRepository : depends on
    EnergyReadingService --> EnergyReadingRepository : depends on
    EnergyReadingService --> EnergyMeterFactoryProvider : uses
    EnergyReadingService --> EnergyMeter : creates
    EnergyMeter --> EnergyReading : aggregates

    EnergyReadingRoutes --> EnergyReadingController : uses
```

---

### 5.3.2. Diagrama de Sequência – Registro de Leitura (`POST /reading`)

```mermaid
sequenceDiagram
    participant Frontend
    participant Route as EnergyReading Route
    participant Controller as EnergyReadingController
    participant Service as EnergyReadingService
    participant MeterRepo as EnergyMeterRepository
    participant ReadingRepo as EnergyReadingRepository
    participant Factory as EnergyMeterFactoryProvider
    participant Domain as EnergyMeter
    participant DB as MongoDB
    participant Config as Bootstrap/DI

    Note over Config: Configuração de Injeção de Dependência
    Config->>MeterRepo: instancia EnergyMeterRepository
    Config->>ReadingRepo: instancia EnergyReadingRepository
    Config->>Service: instancia EnergyReadingService(MeterRepo, ReadingRepo)
    Config->>Controller: instancia EnergyReadingController(Service)
    Config-->>Route: exporta Controller

    Frontend->>Route: POST /reading { meterId, value }
    Route->>Controller: registerReading(req, res)
    Controller->>Service: registerReading(meterId, value)

    alt meterId ausente
        Service-->>Controller: lança AppError("Meter ID is required")
        Controller-->>Frontend: 400 Bad Request
    else value inválido (<= 0)
        Service-->>Controller: lança AppError("Consumption value must be greater than zero")
        Controller-->>Frontend: 400 Bad Request
    else dados válidos
        Service->>MeterRepo: findById(meterId)
        MeterRepo->>DB: busca medidor por ID
        DB-->>MeterRepo: retorna medidor ou null

        alt medidor não encontrado
            MeterRepo-->>Service: null
            Service-->>Controller: lança AppError("Energy meter not found")
            Controller-->>Frontend: 404 Not Found
        else medidor encontrado
            MeterRepo-->>Service: retorna dados do medidor
            Service->>Factory: getFactory(meterData.type)
            Factory-->>Service: factory válida
            Service->>Domain: cria EnergyMeter
            Service->>Domain: addReading(new EnergyReading(value))
            Domain-->>Service: análise de consumo + estados + observers
            Service->>ReadingRepo: save(meterId, value)
            ReadingRepo->>DB: persiste leitura
            DB-->>ReadingRepo: leitura salva
            ReadingRepo-->>Service: confirmação
            Service-->>Controller: sucesso
            Controller-->>Frontend: 201 Created
        end
    end
```
