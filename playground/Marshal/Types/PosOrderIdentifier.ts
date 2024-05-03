import { SourceIdentity, IUniqueIdentity } from "./SourceIdentity";

export abstract class PosOrderIdentifier extends SourceIdentity {
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
