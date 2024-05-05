import { f } from "@marcj/marshal";
import { Guest } from "./QsrUser";
import { QsrUserIdentifier } from "./QsrUserIdentifier";
import { IUniqueIdentity } from "./SourceIdentity";

export abstract class QsrVehicleIdentifier extends QsrUserIdentifier {
  constructor(
    public Vehicle: GuestVehicle,
    public Guest: Guest,
    SiteUID: string
  ) {
    super(Guest?.getMobileNumber() ?? "", SiteUID);
  }

  public get identity(): IUniqueIdentity {
    return {
      make: this.Vehicle?.Make,
      model: this.Vehicle?.Model,
      color: this.Vehicle?.Color,
      ...super.identity,
    };
  }

  public validate(): void {
    super.validate();

    if (this.Vehicle.Make == null) {
      throw new Error("QsrVehicleIdentifier: Make is required");
    }

    if (this.Vehicle.Model == null) {
      throw new Error("QsrVehicleIdentifier: Model is required");
    }

    if (this.Vehicle.Color == null) {
      throw new Error(
        "QsrOrderQsrVehicleIdentifierIdentifier: Color is required"
      );
    }
  }
}

export class GuestVehicle {
  constructor(
    @f public Make?: string,
    @f public Model?: string,
    @f public Color?: string
  ) {}
}

export class QsrVehicle extends QsrVehicleIdentifier {
  constructor(
    @f.type(GuestVehicle) public Vehicle: GuestVehicle,
    @f.type(Guest) public Guest: Guest,
    @f public SiteUID: string,
    @f public CheckNumber: string
  ) {
    super(Vehicle, Guest, SiteUID);
  }
}
