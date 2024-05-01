import { deserialize, resolveReceiveType,  } from "@deepkit/type";
import { ClassType } from '@deepkit/core';

type IUniqueIdentity = Record<string, string | undefined>;

interface ISourceIdentity {
  identity: IUniqueIdentity;
  typeName: string;
}

export interface INormalized {
  normalizedAt: Date;
}

abstract class SourceIdentity implements ISourceIdentity {
  public readonly typeName: string;
  constructor() {
    this.typeName = this.constructor.name;
  }

  public get identity(): IUniqueIdentity {
    return {};
  }

  public toJSON(): unknown {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clone: any = Object.assign({}, this);

    //save the identity when we serialize
    clone.identity = this.identity;

    //toJSON requires that we return an object
    return clone;
  }
}


abstract class PosOrderIdentifier extends SourceIdentity {
  constructor(readonly checkId: string, readonly storeId: string) {
    super();
  }

  public get identity(): IUniqueIdentity {
    return {
      checkId: this.checkId,
      storeId: this.storeId,
    };
  }
}

class PosUser {
  constructor(public readonly phoneNumber: string, public readonly firstName: string) {}
}

class PosOrder extends PosOrderIdentifier {
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
    public readonly wantedAt?: Date,
  ) {
    super(checkId, storeId);
  }
}

class PosOrderNormalized implements INormalized {
  constructor(public normalizedAt: Date,
    public readonly storeId: string,
    public readonly id: string,
  ) {}
}

const sourcePayload = {
  storeId: '3407',
  checkNumber: '73089',
  checkId: '1132123',
  checkNumberWithDate: '73089_20210107',
  originOrderId: '1038314277',
  placedAt: '2021-01-07T03:48:41.000Z',
  openedAt: '2021-01-07T03:48:41.000Z',
  startedAt: '2021-01-03T03:48:41.000Z',
  promiseAt: '2021-01-03T03:51:00.000Z',
  readyAt: '0001-01-01T08:00:00.000Z',
  preparedAt: '2021-01-02T19:53:45.000Z',
  origin: 'OLO',
  handoffMethod: 'Curbside',
  customerType: 'Customer',
  orderType: 'OL Order',
  guest: {
    firstName: 'Geo',
    phoneNumber: '+18053942793',
  },
};

const destinationPayload = {
  normalizedAt: '2021-01-07T03:48:41.000Z',
  storeId: '3407',
  id: '1132123',
};

class Output<S extends ISourceIdentity, N extends INormalized> {
  constructor(
    public source: S,
    public destination: N
  ) {    
  }
}

const deserializeSource = <S extends ISourceIdentity, N extends INormalized>(
  sourcePayload: Record<string, unknown>, 
  sourceType: ClassType<S>,
  destinationPayload: Record<string, unknown>, 
  destinationType: ClassType<N>,
): Output<S, N> => {    
  const source = deserialize<S>(sourcePayload, undefined, undefined, undefined, resolveReceiveType(sourceType));
  const destination = deserialize<N>(destinationPayload, undefined, undefined, undefined, resolveReceiveType(destinationType));
  return new Output(source, destination);
};

const output = deserializeSource<PosOrder, PosOrderNormalized>(sourcePayload, PosOrder, destinationPayload, PosOrderNormalized);
console.log("Source:----------------------------------");
console.log(output.source.placedAt);
console.log(output.source.guest?.firstName);
console.log(output.source.guest?.phoneNumber);
console.log(output.source.identity);
console.log("Destination:-----------------------------");
console.log(output.destination.normalizedAt);
console.log(output.destination.storeId);
console.log(output.destination.id);

