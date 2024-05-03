import { f } from "@marcj/marshal";
import { IUniqueIdentity, SourceIdentity } from "./SourceIdentity";

export class Store {
  constructor(
    @f public readonly id: string,
    @f public readonly name: string,
    @f public readonly latitude: number,
    @f public readonly longitude: number,
    @f public readonly address1: string,
    @f public readonly city: string,
    @f public readonly state: string,
    @f public readonly zipCode: string,
    @f public readonly phone: string,
    @f public readonly domainId: string,
    @f public address2?: string,
    @f public url?: string
  ) {
    this.address2 = typeof address2 === 'object' ? undefined : address2;
  }
}

export abstract class BrinkStoreIdentifier extends SourceIdentity {
  constructor(public readonly id: string, public readonly name: string) {
    super();
  }
  public get identity(): IUniqueIdentity {
    return {
      id: this.id?.replace(/[#/?]/g, ''), // store's id is the locationToken,
      name: this.name,
    };
  }
}

export class BrinkStore extends BrinkStoreIdentifier {
  constructor(@f.type(Store) public readonly store: Store) {
    super(store.id, store.name);
  }
}

