import { IUniqueIdentity, SourceIdentity } from "./SourceIdentity";


export abstract class QsrStoreIdentifier extends SourceIdentity {
    constructor(public readonly SiteUID: string) {
        super();
    }

    public get identity(): IUniqueIdentity {
        return {
            siteUID: this.SiteUID,
        };
    }

    public validate(): void {
        super.validate();
        if (this.SiteUID == null) {
            throw new Error("QsrStoreIdentifier: SiteUID is required");
        }
    }
}
