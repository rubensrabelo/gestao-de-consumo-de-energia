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
│   │   ├── strategies/
│   │   ├── states/
│   │   ├── observers/
│   │   └── factories/
│   │
│   ├── application/
│   │   └── services/
│   │
│   ├── infra/
│   │   ├── database/
│   │   └── repositories/
│   │       └── mongo/
│   │
│   ├── api/
│   │   ├── controllers/
│   │   └── routes/
│   │
│   ├── shared/
│   │   └── errors/
│   │
│   ├── config/
│   │
│   │
│   ├── types/
│   │
```