import 'reflect-metadata';
import { deserialize, resolveReceiveType,  } from "@deepkit/type";
import { ClassType } from '@deepkit/core';
import { BrinkStore } from "./Types/BrinkStore";
import { INormalized, ISourceIdentity } from "./Types/SourceIdentity";
import { PosOrder, PosOrderNormalized } from "./Types/PosOrder";
import { plainToClass } from "@marcj/marshal";

const sourcePayload = {
  storeId: '3407',
  checkNumber: '73089',
  checkId: '1132123',
  checkNumberWithDate: '73089_20210107',
  originOrderId: '1038314277',
  placedAt: '2021-01-07T03:48:41.000Z',
  openedAt: '2021-01-07T03:48:41.000Z',
  startedAt: '2021-01-03T03:48:41.000Z',
  promiseAt: '2021-01-03T03:51:00.000Z',
  readyAt: '0001-01-01T08:00:00.000Z',
  preparedAt: '2021-01-02T19:53:45.000Z',
  origin: 'OLO',
  handoffMethod: 'Curbside',
  customerType: 'Customer',
  orderType: 'OL Order',
  guest: {
    firstName: 'Geo',
    phoneNumber: '+18053942793',
  },
};

const destinationPayload = {
  normalizedAt: '2021-01-07T03:48:41.000Z',
  storeId: '3407',
  id: '1132123',
};

class Output<S extends ISourceIdentity, N extends INormalized> {
  constructor(
    public source: S,
    public destination?: N
  ) {    
  }
}

const deserializeSource = <S extends ISourceIdentity, N extends INormalized>(
  sourcePayload: Record<string, unknown>, 
  sourceType: ClassType<S>,
  destinationPayload?: Record<string, unknown>, 
  destinationType?: ClassType<N>,
): Output<S, N> => {    
  const source = deserialize<S>(sourcePayload, undefined, undefined, undefined, resolveReceiveType(sourceType));
  
  let destination = undefined;
  if (destinationPayload) 
    destination = deserialize<N>(destinationPayload, undefined, undefined, undefined, resolveReceiveType(destinationType));  
  
  return new Output(source, destination);
};

const output = deserializeSource<PosOrder, PosOrderNormalized>(sourcePayload, PosOrder, destinationPayload, PosOrderNormalized);
console.log("Source:----------------------------------");
console.log(output.source.placedAt);
console.log(output.source.guest?.firstName);
console.log(output.source.guest?.phoneNumber);
console.log(output.source.identity);
console.log("Destination:-----------------------------");
console.log(output.destination?.normalizedAt);
console.log(output.destination?.storeId);
console.log(output.destination?.id);

const brinkPayload = {
  id: '11520666765314',
  number:  '2',
  customerId: '84e963cd-5afb-448f-a452-1e6b02b57f55',
  idEncoded: 'AAALRKQWACAC',
  businessDate: '2022-04-05T00:00:00',
  closedTime: '0001-01-01T00:00:00Z',
  openedTime:  '2022-04-05T14:44:55Z',
  modifiedTime: '2022-04-05T14:44:55Z',
  pickupTime:  '2022-04-05T14:54:55.000Z' ,
  isFutureOrder: 'false',
  netSales: '25.85',
  subTotal: '25.85',
  total: '27.79',
  tax: '1.94',
  grossSales: '27.79',
  entries: [
    {
      id: '1',
      itemId: '204327',
      description: 'BBQ Chicken',
      price: '8.95',
      grossSales: '9.62',
      ItemGrossSales: '9.62',
      itemNetSales: '8.95',
      netSales: '8.95',
      note: {
        $: {
          'i:nil': 'true',
        },
      },
      modifiers: [],
    },
    {
      id: '2',
      itemId: '204329',
      description: 'White Blanco',
      price: '7.95',
      grossSales: '8.55',
      ItemGrossSales: '8.55',
      itemNetSales: '7.95',
      netSales: '7.95',
      note: {
        $: {
          'i:nil': 'true',
        },
      },
      modifiers: [],
    },
    {
      id: '3',
      itemId: '1',
      description: 'Meat Eater',
      price: '8.95',
      grossSales: '9.62',
      ItemGrossSales: '9.62',
      itemNetSales: '8.95',
      netSales: '8.95',
      note: {
        $: {
          'i:nil': 'true',
        },
      },
      modifiers: [],
    },
  ],
  destinationId:'1',
  payments: [],
  discounts: [],
  customer: {
    id: '84e963cd-5afb-448f-a452-1e6b02b57f55',
    firstName: 'Ruben',
    lastName: 'Murillo',
    phoneNumber: '4152347650',
  },
  store: {
    id: 'MFuDJthYWUava2Om9dgtbw==',
    name: '* Darrin Heisey',
    latitude: '33.025114',
    longitude: '-117.082445',
    address1: '12154 Fairfax Towne Center',
    city: 'Fairfax',
    state: 'VA',
    zipCode: '22033',
    phone: '(703) 352-6226',
    domainId: 'store-domain-id',
    destinations: [
      {
        id: '1',
        name: 'For Here',
      },
      {
        id: '2',
        name: 'Take Out',
      },
      {
        id: '3',
        name: 'Pickup',
      },
      {
        id: '4',
        name: 'Delivery',
      },
      {
        id: '640287045',
        name: 'Uber Eats',
      },
    ],
    url: 'https://api8.brinkpos.net/',
  },
  identity: {
    id: '11520666765314',
    businessDate: '2022-04-05T00:00:00',
    locationToken: 'MFuDJthYWUava2Om9dgtbw==',
  },
};

const brinkPayloadDeserialized = deserializeSource(brinkPayload, BrinkStore).source;
console.log("Brink Store with deepkit:----------------------------------");
console.log(brinkPayloadDeserialized.identity);
console.log(brinkPayloadDeserialized.name);
console.log(brinkPayloadDeserialized.id);
console.log(brinkPayloadDeserialized.store?.address1);
console.log(brinkPayloadDeserialized.store?.id);
console.log(brinkPayloadDeserialized.store?.name);

const brinkPayloadDeserializedWithMarshal = plainToClass(BrinkStore, brinkPayload);
console.log("Brink Store with marshal:----------------------------------");
console.log(brinkPayloadDeserializedWithMarshal.identity);
console.log(brinkPayloadDeserializedWithMarshal.name);
console.log(brinkPayloadDeserializedWithMarshal.id);
console.log(brinkPayloadDeserializedWithMarshal.store?.address1);
console.log(brinkPayloadDeserializedWithMarshal.store?.id);
console.log(brinkPayloadDeserializedWithMarshal.store?.name);