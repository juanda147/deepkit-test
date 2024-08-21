import { deserialize, serialize } from "@deepkit/type";

export declare enum CustomerLocatorType {
  TABLE_NUMBER = "TABLE_NUMBER",
  VEHICLE = "VEHICLE",
  GUEST_NAME = "GUEST_NAME",
  TICKET_NUMBER = "TICKET_NUMBER",
  CALLOUT_NUMBER = "CALLOUT_NUMBER",
  STALL_NUMBER = "STALL_NUMBER",
  LOCKER_NUMBER = "LOCKER_NUMBER",
}

export declare class Vehicle {
  readonly make: string;
  readonly model: string;
  readonly color: string;
  readonly isDefault: boolean;
  readonly year?: number | undefined;
  readonly imageUrl?: string | undefined;
  constructor(
    make: string,
    model: string,
    color: string,
    isDefault: boolean,
    year?: number | undefined,
    imageUrl?: string | undefined
  );
}

export class CustomerLocator {
  public readonly discriminator: string = "CustomerLocator";
  constructor(
    public readonly name: string,
    public readonly type: CustomerLocatorType
  ) {
    //super();
  }

  public deconstruct(): {
    userFullName?: string;
    tableNumber?: string;
    guestName?: string;
    calloutNumber?: string;
    vehicles?: Vehicle[];
    stallNumber?: string;
  } {
    const locatorOptions: {
      userFullName?: string;
      tableNumber?: string;
      guestName?: string;
      calloutNumber?: string;
      vehicles?: Vehicle[];
      stallNumber?: string;
    } = {};

    switch (this.type) {
      case CustomerLocatorType.CALLOUT_NUMBER:
        locatorOptions.calloutNumber = this.name;
        break;
      case CustomerLocatorType.GUEST_NAME:
        locatorOptions.userFullName = this.name;
        locatorOptions.guestName = this.name;
        break;
      case CustomerLocatorType.STALL_NUMBER:
        locatorOptions.stallNumber = this.name;
        break;
      case CustomerLocatorType.TABLE_NUMBER:
        locatorOptions.tableNumber = this.name;
        break;
      case CustomerLocatorType.VEHICLE: {
        const [make, color, model] = this.name.split(" ");
        locatorOptions.vehicles = [new Vehicle(make, model, color, true)];
        break;
      }
    }

    return locatorOptions;
  }
}

export class LockerLocator extends CustomerLocator {
  public readonly discriminator: string = "LockerLocator";
  constructor(
    public readonly lockerNumber: string,
    public readonly lockerSiteId: string,
    public readonly lockerOrderId: string,
    public readonly name: string,
    public readonly type: CustomerLocatorType
  ) {
    super(name, type);
  }

  /**
   * If we have a locker locator w/o pin, it means the locker system is in charge of unlocking the locker.
   * @returns Always false since the locker is not unlockable by pin but by the locker system when we get the open signal from the guest.
   */
  public hasPin(): boolean {
    return false;
  }
}

export class LockerLocatorWithPin extends LockerLocator {
  public readonly discriminator: string = "LockerLocatorWithPin";
  constructor(
    public readonly lockerNumber: string,
    public readonly pickupPin: string,
    public readonly name: string,
    public readonly type: CustomerLocatorType
  ) {
    super(lockerNumber, "", "", name, type);
  }

  /**
   * If we have a locker locator with pin, it means the guest is in charge of unlocking the locker with the pin.
   * @returns Always true since the locker is unlockable by pin.
   */
  public override hasPin(): boolean {
    return true;
  }
}

export class Order {
  private _customerLocator?:
    | CustomerLocator
    | LockerLocator
    | LockerLocatorWithPin = undefined;
  constructor() {}

  public get customerLocator():
    | CustomerLocator
    | LockerLocator
    | LockerLocatorWithPin
    | undefined {
    return this._customerLocator;
  }

  public set customerLocator(
    customerLocator:
      | CustomerLocator
      | LockerLocator
      | LockerLocatorWithPin
      | undefined
  ) {
    this._customerLocator = customerLocator;
  }
}

const payload = {
  _customerLocator: {
    name: "Juan C.",
    type: "GUEST_NAME",
    discriminator: "LockerLocator",
    lockerNumber: "2",
    lockerSiteId: "9b5fd673-0558-ee11-9937-000d3a618bcf",
    lockerOrderId: "335a2256-2f78-42b5-a79d-5e877fab534a",
  },
};

const order = new Order();
order.customerLocator({
  name: "Juan C.",
  type: "GUEST_NAME",
  discriminator: "LockerLocator",
  lockerNumber: "2",
  lockerSiteId: "9b5fd673-0558-ee11-9937-000d3a618bcf",
  lockerOrderId: "335a2256-2f78-42b5-a79d-5e877fab534a",
});
const customerLocator = serialize<Order>();
console.log(customerLocator);
