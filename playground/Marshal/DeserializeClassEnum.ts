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
    public _presenceSignals: PresenceSignals = new PresenceSignals()
  ) {}
}

// const orderPayload = {
//   storeId: "4c57a370-5c4a-4aa0-938f-539624e7119c",
//   companyId: "ae51f73f-ac4c-4722-8b9e-a757e26edade",
//   originOrderId: "e017a29f-e7fe-4346-9f5e-163d36eb7e8f",
//   timezone: "America/Los_Angeles",
//   presenceSignals: {
//     ofUserPresence: {
//       current: {
//         name: "UNDETERMINED",
//       },
//       updatedAt: "2024-05-14T22:58:48.036Z",
//     },
//     ofStorePresence: {
//       current: {
//         name: "UNDETERMINED",
//       },
//       updatedAt: "2024-05-14T22:58:48.036Z",
//     },
//   },
// };

const orderPayload = {
  _id: {
    value: "9254b0d2-2012-474f-9d70-c0c17d68d538",
  },
  _domainEvents: [
    {
      raisedAt: "2024-05-20T20:08:12.372Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.373Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.374Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.374Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.374Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.375Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.375Z",
    },
    {
      raisedAt: "2024-05-20T20:08:12.376Z",
    },
  ],
  storeId: "9b0be422-c5d2-4786-9a97-1d3ce4250449",
  companyId: "ad79b6b9-362b-48b4-b41f-49c467fd330e",
  _origin: "DIGITAL",
  originOrderId: "c6d68738-2d58-44f7-b13e-2dd2df30e5e3",
  userType: "consumer",
  timezone: "America/Los_Angeles",
  _userStatus: "UNDETERMINED",
  _handoffLocation: "CURBSIDE",
  _ticket: {
    _id: {
      value: "135e06fa-944a-4387-a85f-ab323f4c8891",
    },
    _number: "123",
    totals: {
      subTotal: 10,
      taxTotal: 10,
      grandTotal: 10,
      feesTotal: 0,
      discountTotal: 0,
      tip: undefined,
    },
    courses: [
      {
        id: "0f6c91ab-5ad0-4e57-b8af-cc1a80c8ebeb",
        number: "1",
        paymentStatus: "UNKNOWN",
        kitchenStatus: "UNKNOWN",
        items: [
          {
            id: "8ca0a681-0392-461e-ae35-b9c15dfdc86e",
            code: "",
            name: "Organic Tractor Soda/Iced Tea",
            quantity: 2,
            basePrice: 1,
            subTotal: 2,
            kitchenStatus: "UNKNOWN",
            image: undefined,
            comments: undefined,
            modifiers: undefined,
            categoryId: "1ec95f65-d15b-4cb7-8140-ddec7fcb9d8e",
          },
          {
            id: "8ca0a681-0392-461e-ae35-b9c15dfdc86e",
            code: "",
            name: "Organic Tractor Soda/Iced Tea",
            quantity: 2,
            basePrice: 1,
            subTotal: 2,
            kitchenStatus: "UNKNOWN",
            image: undefined,
            comments: undefined,
            modifiers: undefined,
            categoryId: "1ec95f65-d15b-4cb7-8140-ddec7fcb9d8e",
          },
        ],
        startTime: undefined,
      },
    ],
  },
  _originProvider: "uber",
  _paymentStatus: "UNKNOWN",
  storeStatus: "ACTIVE",
  _configuration: {
    promising: {
      changeThresholdInSeconds: 60,
    },
    acceptableLatencyAtOpenInMinutes: 5,
    isBetaTester: false,
    isMessagingEnabled: true,
    features: {
      guestMayReschedule: undefined,
      updateProviderPromiseTimeWithCurbitPromiseTime: undefined,
      quoteTimeOverride: undefined,
      observationConstraint: undefined,
      survey: undefined,
      startOrderInProvider: undefined,
      manualFireOnlyForAsapOrders: undefined,
      handoffSwitching: undefined,
      promising: undefined,
      prediction: undefined,
      ignorables: undefined,
      guestArrival: undefined,
      scheduledSignalSourceOverride: undefined,
      smsProviderOverride: undefined,
    },
  },
  _ignorableRule: "UNDETERMINED",
  _originPromiseAt: undefined,
  _kitchenPromiseAt: undefined,
  _wantAt: "2024-05-20T20:28:12.368Z",
  _userId: "b3afa200-8be6-4628-898a-d7cd9922e995",
  metadata: undefined,
  _providerSystemType: undefined,
  _sourceOfTruth: undefined,
  _providerIdentifiers: [],
  _etag: undefined,
  _auth: undefined,
  _startStrategy: "SCHEDULED",
  _promise: {
    at: "2024-05-20T20:28:12.368Z",
    timezone: "America/Los_Angeles",
    priorPromiseAt: "2024-05-20T20:28:12.368Z",
    breakThresholdInSeconds: 60,
    change: {
      beforeAt: "2024-05-20T20:28:12.368Z",
      afterAt: "2024-05-20T20:28:12.368Z",
      breakThresholdInSeconds: 60,
    },
  },
  _presenceSignals: {
    ofUserPresence: {
      current: {
        name: "UNDETERMINED",
      },
      updatedAt: "2024-05-20T20:08:12.369Z",
      _history: [],
    },
    ofStorePresence: {
      current: {
        name: "UNDETERMINED",
      },
      updatedAt: "2024-05-20T20:08:12.369Z",
      _history: [],
    },
  },
  _milestones: {
    _user: {
      _onboardedAt: undefined,
      _awaitingAt: undefined,
      _promptingAt: undefined,
      _leavingAt: undefined,
      _enrouteAt: undefined,
      _arrivingAt: undefined,
      _parkedAt: undefined,
      _enteredZoneAt: undefined,
      _exitedZoneAt: undefined,
      _departedAt: undefined,
    },
    _order: {
      _delays: [],
      _openedAt: "2024-05-20T20:08:12.369Z",
      _openedAtLatencyInSeconds: 0,
      _confirmedAt: undefined,
      _confirmedAtLatencyInSeconds: undefined,
      _startedAt: "2024-05-20T20:26:12.368Z",
      _startedAtLatencyInSeconds: -1079.992,
      _startedAtSynthetic: "2024-05-20T20:25:42.368Z",
      _startedAtSyntheticLatencyInSeconds: -1049.994,
      _preparedAt: undefined,
      _preparedAtLatencyInSeconds: undefined,
      _preparedAtSynthetic: undefined,
      _preparedAtSyntheticLatencyInSeconds: undefined,
      _readiedAt: undefined,
      _readiedAtLatencyInSeconds: undefined,
      _readiedAtSynthetic: undefined,
      _readiedAtSyntheticLatencyInSeconds: undefined,
      _deliveredAtSynthetic: undefined,
      _deliveredAtSyntheticLatencyInSeconds: undefined,
      _deliveredAt: undefined,
      _deliveredAtLatencyInSeconds: undefined,
      _deliveringAt: undefined,
      _deliveringAtLatencyInSeconds: undefined,
      _firstDelayedAt: undefined,
      _lastDelayedAt: undefined,
      _canceledByUserAt: undefined,
      _canceledByUserAtLatencyInSeconds: undefined,
      _canceledByProviderAt: undefined,
      _canceledByProviderAtLatencyInSeconds: undefined,
    },
  },
  _scheduledSignals: {
    _progress: {
      start: {
        completedEvent: "ORDER_STARTED",
        _firedAt: "2024-05-20T20:26:12.368Z",
        _landedAt: "2024-05-20T20:08:12.376Z",
        eventName: "ORDER_STARTED",
        _expectedAt: "2024-05-20T20:25:42.368Z",
        dwellConstraint: undefined,
        _rangeBeginLandedAt: "2024-05-20T20:08:12.373Z",
        _rangeBeginFiredAt: "2024-05-20T20:25:42.368Z",
        _rangeEndLandedAt: "2024-05-20T20:08:12.374Z",
        _rangeEndFiredAt: "2024-05-20T20:25:42.368Z",
        _history: {},
        _expectedRange: {
          beginAt: "2024-05-20T20:25:42.368Z",
          endAt: "2024-05-20T20:25:42.368Z",
        },
        _expectedAtUncoerced: "2024-05-20T20:25:42.368Z",
        _uncoercedDwellInSeconds: 0,
        _dwellInSecondsMin: 0,
        _dwellInSecondsMax: 0,
      },
      prepare: {
        completedEvent: "ORDER_PREPARED",
        _firedAt: undefined,
        _landedAt: undefined,
        eventName: "ORDER_PREPARED",
        _expectedAt: "2024-05-20T20:27:42.368Z",
        dwellConstraint: undefined,
        _rangeBeginLandedAt: undefined,
        _rangeBeginFiredAt: undefined,
        _rangeEndLandedAt: undefined,
        _rangeEndFiredAt: undefined,
        _history: {},
        _expectedRange: {
          beginAt: "2024-05-20T20:25:52.368Z",
          endAt: "2024-05-20T20:30:42.368Z",
        },
        _expectedAtUncoerced: "2024-05-20T20:27:42.368Z",
        _uncoercedDwellInSeconds: 120,
        _dwellInSecondsMin: 10,
        _dwellInSecondsMax: 300,
      },
      ready: {
        completedEvent: "ORDER_READIED",
        _firedAt: undefined,
        _landedAt: undefined,
        eventName: "ORDER_READIED",
        _expectedAt: "2024-05-20T20:28:12.368Z",
        dwellConstraint: undefined,
        _rangeBeginLandedAt: undefined,
        _rangeBeginFiredAt: undefined,
        _rangeEndLandedAt: undefined,
        _rangeEndFiredAt: undefined,
        _history: {},
        _expectedRange: {
          beginAt: "2024-05-20T20:27:52.368Z",
          endAt: "2024-05-20T20:28:42.368Z",
        },
        _expectedAtUncoerced: "2024-05-20T20:28:12.368Z",
        _uncoercedDwellInSeconds: 30,
        _dwellInSecondsMin: 10,
        _dwellInSecondsMax: 60,
      },
      prepareAndReady: {
        completedEvent: "ORDER_PREPARED_AND_READIED",
        _firedAt: undefined,
        _landedAt: undefined,
        eventName: "ORDER_PREPARED_AND_READIED",
        _expectedAt: "2024-05-20T20:28:12.368Z",
        dwellConstraint: undefined,
        _rangeBeginLandedAt: undefined,
        _rangeBeginFiredAt: undefined,
        _rangeEndLandedAt: undefined,
        _rangeEndFiredAt: undefined,
        _history: {},
        _expectedRange: {
          beginAt: "2024-05-20T20:26:02.368Z",
          endAt: "2024-05-20T20:31:42.368Z",
        },
        _expectedAtUncoerced: "2024-05-20T20:28:12.368Z",
        _uncoercedDwellInSeconds: 150,
        _dwellInSecondsMin: 20,
        _dwellInSecondsMax: 360,
      },
      deliver: {
        completedEvent: "ORDER_DELIVERED",
        _firedAt: undefined,
        _landedAt: undefined,
        eventName: "ORDER_DELIVERED",
        _expectedAt: "2024-05-20T20:28:42.368Z",
        dwellConstraint: undefined,
        _rangeBeginLandedAt: undefined,
        _rangeBeginFiredAt: undefined,
        _rangeEndLandedAt: undefined,
        _rangeEndFiredAt: undefined,
        _history: {},
        _expectedRange: {
          beginAt: "2024-05-20T20:28:14.368Z",
          endAt: "2024-05-20T20:29:12.368Z",
        },
        _expectedAtUncoerced: "2024-05-20T20:28:42.368Z",
        _uncoercedDwellInSeconds: 30,
        _dwellInSecondsMin: 2,
        _dwellInSecondsMax: 60,
      },
    },
    _userPresence: {
      preStarted: undefined,
      postStarted: undefined,
      postPrepared: undefined,
      postReadied: undefined,
      undetermined: undefined,
    },
    _history: {},
  },
  _arrival: undefined,
  _userArrivingAt: undefined,
  _isArchived: false,
  _isNew: false,
  _ticketNumberKey: "9b0be422-c5d2-4786-9a97-1d3ce4250449_2024-05-20_123",
  _originOrderKey:
    "9b0be422-c5d2-4786-9a97-1d3ce4250449_2024-05-20_c6d68738-2d58-44f7-b13e-2dd2df30e5e3",
  _scheduledKey: "9b0be422-c5d2-4786-9a97-1d3ce4250449_2024-05-20_123",
  _userScenario: {
    index: 71,
    name: "ORDER_SCHEDULED_STARTED",
    matches: undefined,
    category: 1,
  },
  _customerLocator: undefined,
  surveyLink: undefined,
  _didExceedLatencyAtOpen: false,
};

try {
  const deserializedOrder = deserialize<Order>(orderPayload);
  console.log(deserializedOrder);
} catch (error) {
  console.log(error);
}
