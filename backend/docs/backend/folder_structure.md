# Estrutura de Pastas

```txt
backend/
├── docker-compose.yml
├── Dockerfile
├── .env
├── package.json
├── tsconfig.json
├── README.md
│
├── src/
│   ├── server.ts
│   ├── app.ts
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── EnergyMeter.ts
│   │   │   └── EnergyReading.ts
│   │   │
│   │   ├── strategies/
│   │   │   ├── ConsumptionCalculationStrategy.ts
│   │   │   ├── ResidentialConsumptionStrategy.ts
│   │   │   └── SchoolConsumptionStrategy.ts
│   │   │
│   │   ├── states/
│   │   │   ├── ConsumptionState.ts
│   │   │   ├── NormalState.ts
│   │   │   ├── WarningState.ts
│   │   │   └── CriticalState.ts
│   │   │
│   │   ├── observers/
│   │   │   ├── Observer.ts
│   │   │   ├── AlertObserver.ts
│   │   │   └── HistoryObserver.ts
│   │   │
│   │   ├── factories/
│   │   │   ├── EnergyMeterFactory.ts
│   │   │   ├── ResidentialMeterFactory.ts
│   │   │   └── SchoolMeterFactory.ts
│   │   │
│   │   └── facade/
│   │       └── EnergyManagementFacade.ts
│   │
│   ├── application/
│   │   └── services/
│   │       └── EnergyService.ts
│   │       └── DashboardService.ts
│   │
│   ├── infra/
│   │   ├── database/
│   │   │   └── mongo.ts
│   │   │
│   │   └── repositories/
│   │       ├── EnergyMeterRepository.ts
│   │       └── EnergyReadingRepository.ts
│   │       └── DashboardRepository.ts
│   │
│   ├── api/
│   │   ├── controllers/
│   │   │   └── EnergyController.ts
│   │   │   └── DashboardController.ts
│   │   │
│   │   └── routes/
│   │       └── energy.routes.ts
│   │       └── dashboard.routes.ts
│   │
│   ├── shared/
│   │   └── errors/
│   │       └── AppError.ts
```