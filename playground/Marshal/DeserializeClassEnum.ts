import { deserialize } from "@deepkit/type";

export class PresenceType {
  public readonly name: string | undefined;
  static readonly APP_CONNECTED: PresenceType;
  static readonly APP_DISCONNECTED: PresenceType;
  static readonly SMS_CONNECTED: PresenceType;
  static readonly SMS_DISCONNECTED: PresenceType;
  static readonly PROVIDER_CONNECTED: PresenceType;
  static readonly PROVIDER_DISCONNECTED: PresenceType;
  static readonly UNDETERMINED: PresenceType;
}

class Presence {
  constructor(public current: PresenceType) {}

  public updatedAt: Date = new Date(Date.now());
}

class PresenceSignals {
  ofUserPresence: Presence = new Presence(PresenceType.UNDETERMINED);
  ofStorePresence: Presence = new Presence(PresenceType.UNDETERMINED);
}

export class Order {
  constructor(
    public readonly storeId: string,
    public readonly companyId: string,
    public readonly originOrderId: string,
    public readonly timezone: string,
    public presenceSignals: PresenceSignals = new PresenceSignals()
  ) {}
}

const orderPayload = {
  storeId: "4c57a370-5c4a-4aa0-938f-539624e7119c",
  companyId: "ae51f73f-ac4c-4722-8b9e-a757e26edade",
  originOrderId: "e017a29f-e7fe-4346-9f5e-163d36eb7e8f",
  timezone: "America/Los_Angeles",
  _presenceSignals: {
    ofUserPresence: {
      current: {
        name: "UNDETERMINED",
      },
      updatedAt: "2024-05-14T22:58:48.036Z",
    },
    ofStorePresence: {
      current: {
        name: "UNDETERMINED",
      },
      updatedAt: "2024-05-14T22:58:48.036Z",
    },
  },
};

try {
  const deserializedOrder = deserialize<Order>(orderPayload);
  console.log(deserializedOrder);
} catch (error) {
  console.log(error);
}
