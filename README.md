# FC DDD Patterns - Order Repository Implementation

Implementação completa do repositório de pedidos (OrderRepository) seguindo os padrões de **Domain Driven Design (DDD)** e **Test Driven Development (TDD)**.

## Objetivo

Completar a implementação da camada de infraestrutura de uma aplicação de vendas, garantindo que o repositório de pedidos funcione exatamente como definido em sua interface.

## Tecnologias

- **Linguagem**: TypeScript
- **ORM**: Sequelize com TypeScript
- **Testing**: Jest
- **Banco de Dados**: SQLite (testes) / Configurável para produção
- **Arquitetura**: Domain Driven Design (DDD)

## Estrutura do Projeto

```
src/
├── domain/                    # Camada de Domínio
│   ├── @shared/              # Interfaces compartilhadas
│   ├── checkout/             # Bounded Context de Pedidos
│   ├── customer/             # Bounded Context de Clientes
│   └── product/              # Bounded Context de Produtos
└── infrastructure/           # Camada de Infraestrutura
    ├── customer/repository/
    ├── order/repository/     # OrderRepository implementado
    └── product/repository/
```

## Requisitos

- Node.js 16+
- npm 7+

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/PauloAlecio/fc-ddd-patterns.git
cd fc-ddd-patterns
```

2. Instale as dependências:

```bash
npm install
```

## Executar Testes

### Rodar todos os testes:

```bash
npm test
```

### Rodar apenas testes do OrderRepository:

```bash
npm test -- order.repository.spec.ts
```

### Rodar testes com cobertura:

```bash
npm test -- --coverage
```

## Compilar TypeScript

```bash
npm run tsc
```

## Implementação Entregue

### OrderRepository

Arquivo: `src/infrastructure/order/repository/sequilize/order.repository.ts`

#### Métodos Implementados:

1. **create(entity: Order): Promise<void>**
   - Cria um novo pedido no banco de dados
   - Persiste os items do pedido

2. **update(entity: Order): Promise<void>**
   - Atualiza um pedido existente
   - Remove items antigos e insere novos

3. **find(id: string): Promise<Order>**
   - Busca um pedido pelo ID
   - Reconstrói a entidade Order com todos os items

4. **findAll(): Promise<Order[]>**
   - Retorna todos os pedidos
   - Reconstrói entidades Order completas

### Testes

Arquivo: `src/infrastructure/order/repository/sequilize/order.repository.spec.ts`

- ✅ should create a new order
- ✅ should update an order
- ✅ should find an order by id
- ✅ should find all orders

## Padrões Aplicados

- **DDD (Domain Driven Design)**: Separação clara entre camadas de domínio e infraestrutura
- **Repository Pattern**: Abstração de dados com interface `RepositoryInterface<T>`
- **TDD (Test Driven Development)**: Toda implementação validada por testes automatizados
- **Entity Reconstruction**: Conversão correta de Models Sequelize para Entities do domínio

## Status dos Testes

```
Test Suites: 12 passed, 12 total
Tests:       43 passed, 43 total
```

## Autor

Paulo Alécio

## Licença

MIT
