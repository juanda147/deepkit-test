export type IUniqueIdentity = Record<string, string | undefined>;

export interface ISourceIdentity {
  identity: IUniqueIdentity;
  typeName: string;
}

export interface INormalized {
  normalizedAt: Date;
}

export abstract class SourceIdentity implements ISourceIdentity {
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
