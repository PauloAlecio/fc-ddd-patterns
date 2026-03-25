import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

describe("Customer events and handlers", () => {
  it("should register and execute handlers for CustomerCreatedEvent", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();

    const spyHandler1 = jest.spyOn(handler1, "handle");
    const spyHandler2 = jest.spyOn(handler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    const event = new CustomerCreatedEvent({ id: "1", name: "John Doe" });

    // Act
    eventDispatcher.notify(event);

    // Assert
    expect(spyHandler1).toHaveBeenCalled();
    expect(spyHandler2).toHaveBeenCalled();
  });

  it("should execute handler for CustomerAddressChangedEvent", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLogHandler();

    const spyHandler = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", handler);

    const event = new CustomerAddressChangedEvent({
      id: "1",
      name: "John Doe",
      address: "Street 1, 123, 13330-250 - São Paulo",
    });

    // Act
    eventDispatcher.notify(event);

    // Assert
    expect(spyHandler).toHaveBeenCalled();
  });

  it("should print console log messages when CustomerCreatedEvent handlers are executed", () => {
    // Arrange
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();
    const spyConsole = jest.spyOn(console, "log");

    const event = new CustomerCreatedEvent({ id: "1", name: "John Doe" });

    // Act
    handler1.handle(event);
    handler2.handle(event);

    // Assert
    expect(spyConsole).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated",
    );
    expect(spyConsole).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated",
    );

    spyConsole.mockRestore();
  });

  it("should print console log message when CustomerAddressChangedEvent handler is executed", () => {
    // Arrange
    const handler = new EnviaConsoleLogHandler();
    const spyConsole = jest.spyOn(console, "log");

    const event = new CustomerAddressChangedEvent({
      id: "1",
      name: "John Doe",
      address: "Street 1, 123, 13330-250 - São Paulo",
    });

    // Act
    handler.handle(event);

    // Assert
    expect(spyConsole).toHaveBeenCalledWith(
      "Endereço do cliente: 1, John Doe alterado para: Street 1, 123, 13330-250 - São Paulo",
    );

    spyConsole.mockRestore();
  });
});
