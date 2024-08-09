import { deserialize } from "@deepkit/type";

export class CommandMetadataUnknown {
  constructor(
    public readonly processorMetadata?: unknown,
    public readonly sourceIdentities?: unknown
  ) {}
}

export class CommandMetadataAny {
  constructor(
    public readonly processorMetadata?: any,
    public readonly sourceIdentities?: any
  ) {}
}

const placeOrderFromProviderCommandStubUnknown = {
  metadataUnknown: new CommandMetadataUnknown(
    {
      provider: "mock provider",
      traceparent: "aaa-aaaaaa-aaaaaaaa-aaaa",
      payloadId: "bbbb-bbbbbb-bb-bbbbb",
    },
    {
      user: {
        customerId: "99999",
        contactNumber: "0000000",
        firstName: "Nicolas",
      },
      vehicle: {
        customerId: "777777",
        contactNumber: "9999999",
        firstName: "Nicolas",
      },
    }
  ),
};

const placeOrderFromProviderCommandStubAny = {
  metadataAny: new CommandMetadataAny(
    {
      provider: "mock provider",
      traceparent: "aaa-aaaaaa-aaaaaaaa-aaaa",
      payloadId: "bbbb-bbbbbb-bb-bbbbb",
    },
    {
      user: {
        customerId: "99999",
        contactNumber: "0000000",
        firstName: "Nicolas",
      },
      vehicle: {
        customerId: "777777",
        contactNumber: "9999999",
        firstName: "Nicolas",
      },
    }
  ),
};

const CommandMetadataUnknownResult = deserialize<CommandMetadataUnknown>(
  placeOrderFromProviderCommandStubUnknown.metadataUnknown
);

const CommandMetadataAnyResult = deserialize<CommandMetadataAny>(
  placeOrderFromProviderCommandStubAny.metadataAny
);

console.log(CommandMetadataUnknownResult);
console.log(CommandMetadataAnyResult);
