import { ClassType } from "@deepkit/core";
import { deserialize, resolveReceiveType } from "@deepkit/type";
import { INormalized } from "./Types/SourceIdentity";
import { NewProviderIdentityIntegrationEvent } from "./Types/NewProviderIdentityIntegrationEvent";

interface INormalizedVehicle extends INormalized {
  make: string;
  model: string;
  color: string;
  year?: number;
}

interface INormalizedUser extends INormalized {
  firstName: string;
  lastName?: string;
  phone: string;
  vehicle?: INormalizedVehicle;
}

export class NewProviderUserIntegrationEvent extends NewProviderIdentityIntegrationEvent<INormalizedUser> {}

const deserializeRequest = <T>(
  request: any,
  type?: ClassType<T>
): NewProviderUserIntegrationEvent => {
  request.data = deserialize(
    request.data,
    undefined,
    undefined,
    undefined,
    resolveReceiveType(type)
  );

  return request;
};

const payload = {
  orderId: "08607bec-ddd9-5582-9a31-824333cd0910",
  sourceIdentities: {
    order: {
      checkId: "23575",
      storeId: "3407",
    },
    store: {
      storeId: "3407",
    },
    user: {
      phoneNumber: "+573122145649",
    },
  },
  metadata: {
    provider: "posmicros3700",
    payloadId: "a66f124d-ee9a-484f-a424-3ade7138576a",
    source: "PROVIDER",
    metrics: {
      provider_signal_latency_in_seconds: -0.053,
      integration_service_messaging_latency_in_seconds: 1.095,
      integration_service_processing_latency_in_seconds: 2.341,
    },
  },
  normalization: {
    phone: "+573122145649",
    firstName: "Juan C",
    vehicle: {},
  },
  traceparent: "00-b8acd812ff4f3050ac90de6637d3e83f-7d0fc824b3db7fc2-00",
  raisedAt: "2024-08-09T16:20:42.3368569Z",
};

const deserializedPaylod =
  deserializeRequest<NewProviderUserIntegrationEvent>(payload);

console.log(deserializedPaylod);
