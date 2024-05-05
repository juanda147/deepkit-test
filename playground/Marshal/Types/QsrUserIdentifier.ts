import { QsrStoreIdentifier } from "./QsrStoreIdentifier";
import { IUniqueIdentity } from "./SourceIdentity";


export abstract class QsrUserIdentifier extends QsrStoreIdentifier {
    private _phoneNumber: string;
    constructor(PhoneNumber: string, SiteUID: string) {
        super(SiteUID);
        this._phoneNumber = PhoneNumber;
    }

    public validate(): void {
        super.validate();
        if (this._phoneNumber == null) {
            throw new Error("QsrUserIdentifier: PhoneNumber is required");
        }

        if (this.SiteUID == null) {
            throw new Error("QsrUserIdentifier: SiteUID is required");
        }
    }

    public get identity(): IUniqueIdentity {
        return {
            phoneNumber: this.PhoneNumber,
            ...super.identity,
        };
    }

    public set PhoneNumber(value: string) {
        this._phoneNumber = value;
    }

    public get PhoneNumber(): string {
        return this._phoneNumber;
    }
}
