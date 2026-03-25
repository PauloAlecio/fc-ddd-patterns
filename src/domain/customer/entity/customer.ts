import Address from "../value-object/address";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import EventInterface from "../../@shared/event/event.interface";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _events: EventInterface[] = [];

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.addEvent(new CustomerCreatedEvent({ id: this._id, name: this._name }));
  }

  static reconstitute(
    id: string,
    name: string,
    address: Address,
    active: boolean,
    rewardPoints: number,
  ): Customer {
    const customer = Object.create(Customer.prototype);
    customer._id = id;
    customer._name = name;
    customer._address = address;
    customer._active = active;
    customer._rewardPoints = rewardPoints;
    customer._events = [];
    return customer;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.addEvent(
      new CustomerAddressChangedEvent({
        id: this._id,
        name: this._name,
        address: `${address.street}, ${address.number}, ${address.zip} - ${address.city}`,
      }),
    );
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }

  private addEvent(event: EventInterface): void {
    this._events.push(event);
  }

  get events(): EventInterface[] {
    return this._events;
  }

  clearEvents(): void {
    this._events = [];
  }
}
