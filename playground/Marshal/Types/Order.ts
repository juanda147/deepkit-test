import { isTypeClassOf, serializer } from "@deepkit/type";
import { PresenceType } from "./PresenceType";
import { DateTime } from "luxon";

class Presence {
  constructor(public current: PresenceType) {}

  public updatedAt: Date = new Date(Date.now());

  onLoad(): void {
    this.current = PresenceType.fromString(this.current.toString());
  }

  public log(presenceType: PresenceType): Presence {
    const now = new Date(Date.now());
    //changing presence, so track history after clearing
    const toAdd = Object.assign({}, this);
    toAdd._history = []; //clear history to avoid circular reference

    // Since we don't really need the entire history of presence, we filter it down to the last 1 minute
    this._history = this._history.filter(
      (presence) =>
        DateTime.fromJSDate(presence.updatedAt) >=
        DateTime.fromJSDate(now).minus({ minutes: 1 })
    );

    this._history.push(toAdd);
    this.current = presenceType;
    this.updatedAt = now;

    return this;
  }

  private _history: Array<Presence> = [];

  public get history(): Array<Presence> {
    return this._history;
  }
}

serializer.deserializeRegistry.addDecorator(
  isTypeClassOf(Presence),
  (_, state) => {
    state.touch((target: Presence) => target.onLoad());
  }
);

class PresenceSignals {
  ofUserPresence: Presence = new Presence(PresenceType.UNDETERMINED);
  ofStorePresence: Presence = new Presence(PresenceType.UNDETERMINED);

  setUserPresence(presenceType: PresenceType): void {
    this.ofUserPresence = this.ofUserPresence.log(presenceType);
  }

  setStorePresence(presenceType: PresenceType): void {
    this.ofStorePresence = this.ofStorePresence.log(presenceType);
  }
}

export class Order {
  constructor(
    public readonly storeId: string,
    public readonly companyId: string,
    public readonly originOrderId: string,
    public readonly timezone: string
  ) {}

  private _presenceSignals: PresenceSignals = new PresenceSignals();
  public get signals(): PresenceSignals {
    return this._presenceSignals;
  }
}

// const orderPayloadOriginal = {
//     _presenceSignals: {
//       ofUserPresence: {
//         current: {
//           name: "UNDETERMINED",
//         },
//         updatedAt: "2024-05-14T22:58:48.036Z",
//         _history: [
//         ],
//       },
//       ofStorePresence: {
//         current: {
//           name: "UNDETERMINED",
//         },
//         updatedAt: "2024-05-14T22:58:48.036Z",
//         _history: [
//         ],
//       },
//     },
//     _milestones: {
//       _user: {
//         _onboardedAt: undefined,
//         _awaitingAt: undefined,
//         _promptingAt: undefined,
//         _leavingAt: undefined,
//         _enrouteAt: undefined,
//         _arrivingAt: undefined,
//         _parkedAt: undefined,
//         _enteredZoneAt: undefined,
//         _exitedZoneAt: undefined,
//         _departedAt: undefined,
//       },
//       _order: {
//         _delays: [
//         ],
//         _openedAt: "2024-05-14T22:58:48.036Z",
//         _openedAtLatencyInSeconds: 0,
//         _confirmedAt: undefined,
//         _confirmedAtLatencyInSeconds: undefined,
//         _startedAt: "2024-05-14T23:16:18.036Z",
//         _startedAtLatencyInSeconds: -1049.997,
//         _startedAtSynthetic: "2024-05-14T23:16:18.036Z",
//         _startedAtSyntheticLatencyInSeconds: -1049.997,
//         _preparedAt: undefined,
//         _preparedAtLatencyInSeconds: undefined,
//         _preparedAtSynthetic: undefined,
//         _preparedAtSyntheticLatencyInSeconds: undefined,
//         _readiedAt: undefined,
//         _readiedAtLatencyInSeconds: undefined,
//         _readiedAtSynthetic: undefined,
//         _readiedAtSyntheticLatencyInSeconds: undefined,
//         _deliveredAtSynthetic: undefined,
//         _deliveredAtSyntheticLatencyInSeconds: undefined,
//         _deliveredAt: undefined,
//         _deliveredAtLatencyInSeconds: undefined,
//         _deliveringAt: undefined,
//         _deliveringAtLatencyInSeconds: undefined,
//         _firstDelayedAt: undefined,
//         _lastDelayedAt: undefined,
//         _canceledByUserAt: undefined,
//         _canceledByUserAtLatencyInSeconds: undefined,
//         _canceledByProviderAt: undefined,
//         _canceledByProviderAtLatencyInSeconds: undefined,
//       },
//     },
//     _scheduledSignals: {
//       _progress: {
//         start: {
//           completedEvent: "ORDER_STARTED",
//           _firedAt: "2024-05-14T23:16:18.036Z",
//           _landedAt: "2024-05-14T22:58:48.039Z",
//           eventName: "ORDER_STARTED",
//           _expectedAt: "2024-05-14T23:16:18.036Z",
//           dwellConstraint: undefined,
//           _rangeBeginLandedAt: "2024-05-14T22:58:48.038Z",
//           _rangeBeginFiredAt: "2024-05-14T23:16:18.036Z",
//           _rangeEndLandedAt: undefined,
//           _rangeEndFiredAt: undefined,
//           _history: {
//           },
//           _expectedRange: {
//             beginAt: "2024-05-14T23:16:18.036Z",
//             endAt: "2024-05-14T23:16:18.036Z",
//           },
//           _expectedAtUncoerced: "2024-05-14T23:16:18.036Z",
//           _uncoercedDwellInSeconds: 0,
//           _dwellInSecondsMin: 0,
//           _dwellInSecondsMax: 0,
//         },
//         prepare: {
//           completedEvent: "ORDER_PREPARED",
//           _firedAt: undefined,
//           _landedAt: undefined,
//           eventName: "ORDER_PREPARED",
//           _expectedAt: "2024-05-14T23:18:18.036Z",
//           dwellConstraint: undefined,
//           _rangeBeginLandedAt: undefined,
//           _rangeBeginFiredAt: undefined,
//           _rangeEndLandedAt: undefined,
//           _rangeEndFiredAt: undefined,
//           _history: {
//           },
//           _expectedRange: {
//             beginAt: "2024-05-14T23:16:28.036Z",
//             endAt: "2024-05-14T23:21:18.036Z",
//           },
//           _expectedAtUncoerced: "2024-05-14T23:18:18.036Z",
//           _uncoercedDwellInSeconds: 120,
//           _dwellInSecondsMin: 10,
//           _dwellInSecondsMax: 300,
//         },
//         ready: {
//           completedEvent: "ORDER_READIED",
//           _firedAt: undefined,
//           _landedAt: undefined,
//           eventName: "ORDER_READIED",
//           _expectedAt: "2024-05-14T23:18:48.036Z",
//           dwellConstraint: undefined,
//           _rangeBeginLandedAt: undefined,
//           _rangeBeginFiredAt: undefined,
//           _rangeEndLandedAt: undefined,
//           _rangeEndFiredAt: undefined,
//           _history: {
//           },
//           _expectedRange: {
//             beginAt: "2024-05-14T23:18:28.036Z",
//             endAt: "2024-05-14T23:19:18.036Z",
//           },
//           _expectedAtUncoerced: "2024-05-14T23:18:48.036Z",
//           _uncoercedDwellInSeconds: 30,
//           _dwellInSecondsMin: 10,
//           _dwellInSecondsMax: 60,
//         },
//         prepareAndReady: {
//           completedEvent: "ORDER_PREPARED_AND_READIED",
//           _firedAt: undefined,
//           _landedAt: undefined,
//           eventName: "ORDER_PREPARED_AND_READIED",
//           _expectedAt: "2024-05-14T23:18:48.036Z",
//           dwellConstraint: undefined,
//           _rangeBeginLandedAt: undefined,
//           _rangeBeginFiredAt: undefined,
//           _rangeEndLandedAt: undefined,
//           _rangeEndFiredAt: undefined,
//           _history: {
//           },
//           _expectedRange: {
//             beginAt: "2024-05-14T23:16:38.036Z",
//             endAt: "2024-05-14T23:22:18.036Z",
//           },
//           _expectedAtUncoerced: "2024-05-14T23:18:48.036Z",
//           _uncoercedDwellInSeconds: 150,
//           _dwellInSecondsMin: 20,
//           _dwellInSecondsMax: 360,
//         },
//         deliver: {
//           completedEvent: "ORDER_DELIVERED",
//           _firedAt: undefined,
//           _landedAt: undefined,
//           eventName: "ORDER_DELIVERED",
//           _expectedAt: "2024-05-14T23:19:18.036Z",
//           dwellConstraint: undefined,
//           _rangeBeginLandedAt: undefined,
//           _rangeBeginFiredAt: undefined,
//           _rangeEndLandedAt: undefined,
//           _rangeEndFiredAt: undefined,
//           _history: {
//           },
//           _expectedRange: {
//             beginAt: "2024-05-14T23:18:50.036Z",
//             endAt: "2024-05-14T23:19:48.036Z",
//           },
//           _expectedAtUncoerced: "2024-05-14T23:19:18.036Z",
//           _uncoercedDwellInSeconds: 30,
//           _dwellInSecondsMin: 2,
//           _dwellInSecondsMax: 60,
//         },
//       },
//       _userPresence: {
//         preStarted: undefined,
//         postStarted: undefined,
//         postPrepared: undefined,
//         postReadied: undefined,
//         undetermined: undefined,
//       },
//       _history: {
//       },
//     },
//     _arrival: undefined,
//     _userArrivingAt: undefined,
//     _isArchived: false,
//     _isNew: false,
//     _ticketNumberKey: "c0b70b18-d2dc-4dfe-8cc3-6b2a7a31fbcf_2024-05-14_123",
//     _originOrderKey: "c0b70b18-d2dc-4dfe-8cc3-6b2a7a31fbcf_2024-05-14_d6ccccf4-8366-4a71-8550-28b3eb15f719",
//     _scheduledKey: "c0b70b18-d2dc-4dfe-8cc3-6b2a7a31fbcf_2024-05-14_123",
//     _userScenario: {
//       index: 71,
//       name: "ORDER_SCHEDULED_STARTED",
//       matches: undefined,
//       category: 1,
//     },
//     _customerLocator: undefined,
//     surveyLink: undefined,
//   };

//{
//   name: "ValidationError",
//   errors: [
//     {
//       path: "_presenceSignals.ofUserPresence.current",
//       code: "type",
//       message: "Cannot convert UNDETERMINED to PresenceType",
//       value: undefined,
//     },
//   ],
// }
