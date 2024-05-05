import { f } from "@marcj/marshal";
import { QsrUserIdentifier } from "./QsrUserIdentifier";

export class GuestPhoneNumber {
  constructor(
    @f public readonly PhoneNumber?: string,
    @f public readonly PhoneNumberString?: string,
    @f public readonly Type?: string
  ) {}
}

export class Guest {
  constructor(
    @f public FirstName?: string,
    @f public IsAnonymous?: boolean,
    @f public LastName?: string,
    @f.array(GuestPhoneNumber) public PhoneNumbers?: Array<GuestPhoneNumber>,
    @f public NotificationType?: string
  ) {}

  public getMobileNumber(): string | undefined {
    return this.PhoneNumbers?.find((x) => x.Type?.toLowerCase().includes("mobile"))?.PhoneNumberString;
  }
}

export class QsrUser extends QsrUserIdentifier {
  constructor(@f.type(Guest) public Guest: Guest, @f public SiteUID: string, @f public CheckNumber: string) {
    super(Guest?.getMobileNumber() ?? '', SiteUID);
  }
}
