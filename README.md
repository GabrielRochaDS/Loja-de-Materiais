
# Loja de Materiais

Este é um projeto completo de uma aplicação web para uma loja de materiais, incluindo **frontend em React** e **backend em Spring Boot**. A aplicação permite listagem de produtos por categoria, sistema de favoritos e carrinho de compras, além de funcionalidades de autenticação.

---

## Estrutura do Projeto

```

Loja-de-Materiais/
├── apirestful/               # Spring Boot API
└── frontend/                 # React App

````

---

## Pré-requisitos

- Node.js 18+
- Java 17+
- Maven
- MySQL
- Git

---

## Frontend (React)

### Localização: `frontend/`

### Tecnologias

- React + TypeScript
- React Router
- Zustand (estado global)
- Bootstrap Icons
- Axios
- Zod (validação)
- Infinite Scroll

### Como Executar

```bash
cd frontend
npm install
npm run dev
````

O frontend estará disponível em: `http://localhost:5173`

### Funcionalidades

* Listagem de produtos e categorias
* Scroll infinito por categoria
* Sistema de favoritos (com verificação de login)
* Carrinho de compras
* Validação de formulários com Zod
* Integração com API REST do backend

---

## Backend (Spring Boot)

### Localização: `backend/`

### Tecnologias

* Java 17
* Spring Boot
* Spring Web, Data JPA, Security
* Lombok
* MySQL
* Maven

### ▶️ Como Executar

1. Configure o banco de dados em `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lojamateriais
spring.datasource.username=root
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
```

2. Execute a aplicação:

```bash
cd backend
./mvnw spring-boot:run
```

Ou pelo IntelliJ/Eclipse rodando `ApirestfulApplication.java`.

A API estará disponível em: `http://localhost:8080`

## Comunicação Frontend ↔ Backend

O frontend usa `Axios` para consumir os endpoints da API Spring Boot. Certifique-se de que a porta e o CORS estejam corretamente configurados no backend para aceitar requisições do frontend (`http://localhost:5173`).

---

## 🧪 Endpoints de Exemplo

| Método | Rota                       | Descrição                         |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/produtos`                | Lista todos os produtos           |
| GET    | `/categorias`              | Lista todas as categorias         |
| GET    | `/produtos/categoria/{id}` | Lista produtos por categoria      |
| POST   | `/usuarios`                | Cadastra novo usuário             |
| POST   | `/login`                   | Autentica usuário (JWT, opcional) |

---

## Organização das Pastas

### `frontend/`

```bash
components/      # Componentes reutilizáveis
pages/           # Páginas principais
store/           # Zustand (estado global)
hooks/           # Hooks personalizados
interfaces/      # Tipos e interfaces
```

### `backend/`

```bash
controller/      # Endpoints REST
model/           # Entidades JPA
repository/      # Spring Data JPA
service/         # Regras de negócio
```
