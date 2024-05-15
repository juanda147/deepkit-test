import { deserialize } from "@deepkit/type";
import { Order } from "./Types/Order";

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
