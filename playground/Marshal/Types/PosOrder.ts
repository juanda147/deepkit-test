import { INormalized } from "./SourceIdentity";
import { PosOrderIdentifier } from "./PosOrderIdentifier";

class PosUser {
  constructor(public readonly phoneNumber: string, public readonly firstName: string) { }
}
export class PosOrder extends PosOrderIdentifier {
  constructor(
    public readonly storeId: string,
    public readonly checkNumber: string,
    public readonly checkId: string,
    public readonly guestLocator: string,
    public readonly checkNumberWithDate: string,
    public readonly originOrderId: string,
    public readonly placedAt: Date,
    public readonly openedAt: Date,
    public readonly startedAt: Date,
    public readonly origin: string,
    public readonly handoffMethod: string,
    public readonly customerType: string,
    public readonly orderType: string,
    public readonly enteredByEmployee: string,
    public readonly grandTotal: number,
    public readonly subTotal: number,
    public readonly taxTotal: number,
    public readonly paymentTotal: number,
    public readonly serviceTotal: number,
    public readonly paymentStatus: string,
    public readonly tableNumber?: string,
    public readonly closedAt?: Date,
    public readonly promiseAt?: Date,
    public readonly preparedAt?: Date,
    public readonly readyAt?: Date,
    public readonly guest?: PosUser,
    public readonly originProvider?: string,
    public readonly wantedAt?: Date
  ) {
    super(checkId, storeId);
  }
}
export class PosOrderNormalized implements INormalized {
  constructor(public normalizedAt: Date,
    public readonly storeId: string,
    public readonly id: string
  ) { }
}
