# Sistema de Monitoramento de Consumo de Energia

Este projeto tem como objetivo o desenvolvimento de um sistema para **monitoramento do consumo de energia elétrica**, permitindo o cadastro de medidores, registro de leituras e visualização dos dados por meio de dashboards.

O sistema foi desenvolvido com foco em **boas práticas de arquitetura**, aplicando princípios **SOLID**, **injeção de dependência** e **padrões de projeto**, visando facilitar a manutenção e a evolução do software.

---

## Tecnologias Utilizadas

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Socket.IO

### Frontend

* React
* TypeScript

---

## Arquitetura

O backend foi estruturado seguindo uma arquitetura em camadas:

* **Controllers**: responsáveis apenas pela comunicação HTTP
* **Services**: concentram as regras de negócio
* **Repositories**: acesso a dados
* **Domain**: entidades, estados, estratégias, observers e fábricas

Foram aplicados os padrões:

* **Repository**
* **Service**
* **Factory**
* **Strategy**
* **State**
* **Observer**

---

## 📚 Objetivo Acadêmico

Este projeto foi desenvolvido com fins acadêmicos, com ênfase no estudo e aplicação prática de:

* Arquitetura de software
* Princípios SOLID
* Padrões de projeto
* Boas práticas no desenvolvimento de APIs

