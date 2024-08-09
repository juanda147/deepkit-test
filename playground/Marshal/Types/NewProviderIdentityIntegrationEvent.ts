type IUniqueIdentity = Record<string, string | undefined>;

declare enum Provider {
  Olo = "olo",
  Omnivore = "omnivore",
  PosMicros3700 = "posmicros3700",
  Qsr = "qsr",
  Brink = "brink",
  Toast = "toast",
  Paytronix = "paytronix",
  QsrAgent = "qsragent",
  AlohaAgent = "alohaagent",
  Aloha = "aloha",
  Panasonic = "panasonic",
  Chekt = "chekt",
  Uber = "uber",
  DoorDash = "doordash",
  Grubhub = "grubhub",
  CheckMate = "checkmate",
  OtherThirdPartyDelivery = "otherthirdpartydelivery",
}

declare enum SignalSource {
  SMS_REPLY = "SMS_REPLY",
  SCHEDULED = "SCHEDULED",
  SCHEDULED_RANGE_BEGIN = "SCHEDULED_RANGE_BEGIN",
  SCHEDULED_RANGE_END = "SCHEDULED_RANGE_END",
  STORE_APP_USER = "STORE_APP_USER",
  CLIENT_APP_USER = "CLIENT_APP_USER",
  CLIENT_APP_USER_LOCATION = "CLIENT_APP_USER_LOCATION",
  PROVIDER = "PROVIDER",
  LOCKER = "LOCKER",
  UNDETERMINED = "UNDETERMINED",
}

interface SourceIdentities {
  order: IUniqueIdentity;
  store: IUniqueIdentity;
  user?: IUniqueIdentity;
  vehicle?: IUniqueIdentity;
  item?: IUniqueIdentity;
}

interface ProcessorEventMetadata {
  payloadId: string;
  provider: Provider;
  source: SignalSource;
  metrics?: Record<string, number>;
}

declare abstract class BaseEvent {
  readonly raisedAt: Date;
}

declare abstract class IntegrationEvent extends BaseEvent {
  traceparent?: string | undefined;
  constructor(traceparent?: string | undefined);
}

export interface INormalized {
  normalizedAt: Date;
}

export declare class NewProviderIdentityIntegrationEvent<
  T extends INormalized
> extends IntegrationEvent {
  metadata?: ProcessorEventMetadata;
  sourceIdentities?: SourceIdentities;
  normalization: T;
}
