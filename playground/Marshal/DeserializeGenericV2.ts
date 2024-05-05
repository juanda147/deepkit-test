import 'reflect-metadata';
import { deserialize, resolveReceiveType } from "@deepkit/type";
import { ClassType } from '@deepkit/core';
import { BrinkStore } from "./Types/BrinkStore";
import { INormalized, ISourceIdentity } from "./Types/SourceIdentity";
import { PosOrder, PosOrderNormalized } from "./Types/PosOrder";
import { plainToClass } from "@marcj/marshal";
import { StoreContext } from './Types/StoreContext';
import { QsrVehicle } from './Types/QsrVehicle';

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

const storeContextPayload = {
  id: '123',
  timezone: 'America/Los_Angeles',
  name: "Sharky's",
  phoneNumber: '+18053221441',
  apiId: 'ChIJh1J1c41J6IAREvLzEHdSHBY',
  longitude: -119.0718039,
  latitude: 34.2163531,
  features: {
    quoteTimeOverride: {
      configuration: {
        effectiveDurationInMinutes: 10,
        targetPercentileOfDurationUntilReady: 0.95,
        minimumDurationUntilReadyInSeconds: 300,
        maximumDurationUntilReadyInSeconds: 900,
      },
      isEnabled: true,
    },
    updateProviderPromiseTimeWithGuestPromiseTime: {
      isEnabled: true,
    },
  },
};

const storeContextDeserialzed = deserialize<StoreContext>(storeContextPayload);
console.log("Store Context with deepkit::----------------------------------");
console.log(storeContextDeserialzed.id);
console.log(storeContextDeserialzed.name);
console.log(storeContextDeserialzed.phoneNumber);
console.log(storeContextDeserialzed.longitude);
console.log(storeContextDeserialzed.features?.synchProviderWithQuoteTime?.configuration?.effectiveDurationInMinutes);
console.log(storeContextDeserialzed.features?.synchProviderWithQuoteTime?.isEnable());
console.log(storeContextDeserialzed.features?.synchProviderWithOriginPromiseTime?.isEnable());

const storeContextDeserializedWithMarshal = plainToClass(StoreContext, storeContextPayload);
console.log("Store Context with marshal:----------------------------------");
console.log(storeContextDeserializedWithMarshal.id);
console.log(storeContextDeserializedWithMarshal.name);
console.log(storeContextDeserializedWithMarshal.phoneNumber);
console.log(storeContextDeserializedWithMarshal.longitude);
console.log(storeContextDeserializedWithMarshal.features?.synchProviderWithQuoteTime?.configuration?.effectiveDurationInMinutes);
console.log(storeContextDeserializedWithMarshal.features?.synchProviderWithQuoteTime?.isEnable());
console.log(storeContextDeserializedWithMarshal.features?.synchProviderWithOriginPromiseTime?.isEnable());

const qsrPayload = {
  SiteUID: 'b453462e-80fe-4722-bf82-b4eb2becd99f',
  Guest: {
    FirstName: 'Geo',
    LastName: 'Alzate',
    Email: null,
    Notes: null,
    FoodAllergies: null,
    NotificationType: 'SMS',
    PhoneNumbers: [
      {
        PhoneNumberString: '+18053720119',
        PhoneNumber: 18053720119,
        Sort: 1,
        Type: 'Mobile',
      },
      {
        PhoneNumberString: '+57603291912',
        PhoneNumber: 57603291912,
        Sort: 2,
        Type: 'Whatever',
      },
    ],
    Addresses: [],
    CustomValues: [],
    IsAnonymous: false,
    IsSubscribedToEmailMarketing: false,
    IsSubscribedToQsrMarketing: false,
    IsSubscribedToSmsMarketing: false,
    Loyalty: null,
  },
  Vehicle: {
    Make: 'Ford',
    Model: 'Explorer',
    Color: 'White',
  },
  Courses: [
    {
      LastUpdateTime: '2021-08-18T12:15:22.955-07:00',
      CourseType: 'Entree',
      CourseStartTime: '2021-08-18T19:15:18.269+00:00',
      PosCourseNumbers: [0],
      QuoteTime: 480,
      ConfiguredQuote: {
        QuoteLabel: '5-10 min',
        ExactQuoteLabel: '10 minutes',
        PrintQuoteLabel: 'About 10 minutes',
        ExactQuoteMinutes: 10,
        MinMinutes: 6,
        MaxMinutes: 10,
      },
      DestinationType: 'CarryOut',
      DestinationName: 'Olo',
      Zones: [],
      EstimatedCompletionTime: '2021-08-18T19:23:18.269+00:00',
      IsVoid: false,
      KitchenStatus: {
        Status: 'Active',
        PreparationTime: 480,
        TimeStatus: 'Normal',
      },
      CourseName: '',
      CourseNumber: 1,
      CustomerName: 'Michael Leek',
      DestinationID: 40,
      GuestCount: 0,
      PagerID: 0,
      PaymentStates: [
        {
          Change: 0,
          PaymentState: 'Tendered',
          SubTotal: 25.5,
          Tax: 2.61,
          Tender: 0,
          Total: 28.11,
        },
      ],
      Server: {
        ID: 990,
        Name: 'Web',
      },
      TableName: '0',
      TableSection: '',
      TentNumber: 0,
      Terminal: 99,
      IsTraining: false,
      Comment: '',
    },
  ],
  CheckNumber: 30136,
  IsHeld: false,
};

const qsrPayloadDeserialized = deserializeSource(qsrPayload, QsrVehicle).source;
console.log("Qsr Vehicle with deepkit:----------------------------------");
console.log(qsrPayloadDeserialized.identity);
console.log(qsrPayloadDeserialized.PhoneNumber);
console.log(qsrPayloadDeserialized.SiteUID);
console.log(qsrPayloadDeserialized.CheckNumber);
console.log(qsrPayloadDeserialized.Vehicle?.Make);
console.log(qsrPayloadDeserialized.Vehicle?.Model);
console.log(qsrPayloadDeserialized.Vehicle?.Color);
console.log(qsrPayloadDeserialized.Guest?.FirstName);
console.log(qsrPayloadDeserialized.Guest?.LastName);
console.log(qsrPayloadDeserialized.Guest?.getMobileNumber());

const qsrPayloadDeserializedWithMarshal = plainToClass(QsrVehicle, qsrPayload);
console.log("Qsr Vehicle with marshal:----------------------------------");
console.log(qsrPayloadDeserializedWithMarshal.identity);
console.log(qsrPayloadDeserializedWithMarshal.PhoneNumber);
console.log(qsrPayloadDeserializedWithMarshal.SiteUID);
console.log(qsrPayloadDeserializedWithMarshal.CheckNumber);
console.log(qsrPayloadDeserializedWithMarshal.Vehicle?.Make);
console.log(qsrPayloadDeserializedWithMarshal.Vehicle?.Model);
console.log(qsrPayloadDeserializedWithMarshal.Vehicle?.Color);
console.log(qsrPayloadDeserializedWithMarshal.Guest?.FirstName);
console.log(qsrPayloadDeserializedWithMarshal.Guest?.LastName);
console.log(qsrPayloadDeserializedWithMarshal.Guest?.getMobileNumber());
