# FC DDD Patterns - Order Repository Implementation

Implementação completa do repositório de pedidos (OrderRepository) seguindo os padrões de **Domain Driven Design (DDD)** e **Test Driven Development (TDD)**.

Inclui também a implementação de **Domain Events** para o agregado Customer com eventos de criação e atualização de endereço.

## Objetivo

Completar a implementação da camada de infraestrutura de uma aplicação de vendas, garantindo que o repositório de pedidos funcione exatamente como definido em sua interface.

Implementar Domain Events (padrão DDD) para permitir reação automática a mudanças de estado do agregado Customer.

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
- **Domain Events**: Implementação de eventos de domínio para reação a mudanças de estado

## Domain Events - Customer

### Eventos Implementados

#### 1. **CustomerCreatedEvent**

- **Gatilho**: Disparado quando um novo Customer é criado
- **Handlers**:
  - `EnviaConsoleLog1Handler`: Imprime "Esse é o primeiro console.log do evento: CustomerCreated"
  - `EnviaConsoleLog2Handler`: Imprime "Esse é o segundo console.log do evento: CustomerCreated"

#### 2. **CustomerAddressChangedEvent**

- **Gatilho**: Disparado quando o endereço do Customer é alterado
- **Dados**: id, nome e novo endereço do cliente
- **Handler**:
  - `EnviaConsoleLogHandler`: Imprime "Endereço do cliente: {id}, {nome} alterado para: {endereco}"

### Estrutura de Arquivos

```
src/domain/customer/
├── entity/
│   ├── customer.ts                    # Entidade com suporte a eventos
│   └── customer.spec.ts               # Testes da entidade
├── event/
│   ├── customer-created.event.ts      # Evento de criação
│   ├── customer-address-changed.event.ts  # Evento de mudança de endereço
│   ├── customer-events.spec.ts        # Testes dos eventos
│   └── handler/
│       ├── envia-console-log-1.handler.ts
│       ├── envia-console-log-2.handler.ts
│       └── envia-console-log.handler.ts
```

### Como Usar

```typescript
import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";

// Cria dispatcher e registra handlers
const eventDispatcher = new EventDispatcher();
eventDispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog1Handler());
eventDispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog2Handler());
eventDispatcher.register(
  "CustomerAddressChangedEvent",
  new EnviaConsoleLogHandler(),
);

// Cria novo customer (dispara CustomerCreatedEvent)
const customer = new Customer("1", "John Doe");

// Dispara eventos
customer.events.forEach((event) => {
  eventDispatcher.notify(event);
});

// Mudar endereço (dispara CustomerAddressChangedEvent)
const address = new Address("Street 1", 123, "13330-250", "São Paulo");
customer.changeAddress(address);

// Dispara novo evento
eventDispatcher.notify(customer.events[1]);

// Limpa eventos após processar
customer.clearEvents();
```

### Testes dos Domain Events

```bash
# Rodar testes do Customer entity
npm test -- customer.entity.spec.ts

# Rodar testes dos eventos
npm test -- customer-events.spec.ts
```

## Status dos Testes

```
Test Suites: 13 passed, 13 total
Tests:       52 passed, 52 total
Snapshots:   0 total
```

### Testes Inclusos

- ✅ Customer entity tests (com Domain Events)
- ✅ Domain Events tests
- ✅ Order Repository tests
- ✅ Product Repository tests
- ✅ Customer Repository tests
- ✅ Event Dispatcher tests
- ✅ Factory tests

## Autor

Paulo Alécio

## Licença

MIT
