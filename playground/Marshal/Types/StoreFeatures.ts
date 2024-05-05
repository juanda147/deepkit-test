import { StoreFeatureBase } from './StoreFeatureBase';
import { QuoteTimeOverrideFeature } from './QuoteTimeOverrideFeature';
import { StartOrderInProviderFeature } from './StartOrderFeatureConfiguration';
import { f } from '@marcj/marshal';

/**
 * The features that are exposed thru properties is bc we want to encapsulate the names for clarity
 */
export class StoreFeatures {
  private defaultFeatureValue = new StoreFeatureBase();

  @f public startOrderInProvider: StartOrderInProviderFeature = new StartOrderInProviderFeature();

  @f private quoteTimeOverride?: QuoteTimeOverrideFeature;
  public get synchProviderWithQuoteTime(): QuoteTimeOverrideFeature {
    return this.quoteTimeOverride ?? new QuoteTimeOverrideFeature();
  }

  @f private updateProviderPromiseTimeWithGuestPromiseTime?: StoreFeatureBase;
  public get synchProviderWithOriginPromiseTime(): StoreFeatureBase {
    return this.updateProviderPromiseTimeWithGuestPromiseTime ?? this.defaultFeatureValue;
  }

  @f private updateProviderPromiseTimeWithCurbitPromiseTime?: StoreFeatureBase;
  public get synchProviderWithPromiseTime(): StoreFeatureBase {
    return this.updateProviderPromiseTimeWithCurbitPromiseTime ?? this.defaultFeatureValue;
  }

  @f private standardizeProviderGuestName?: StoreFeatureBase;
  public get synchProviderWithNormalizedGuestName(): StoreFeatureBase {
    return this.standardizeProviderGuestName ?? this.defaultFeatureValue;
  }

  @f private updateProviderWithEstimatedHandoffTime?: StoreFeatureBase;
  public get synchProviderWithHandoffTime(): StoreFeatureBase {
    return this.updateProviderWithEstimatedHandoffTime ?? this.defaultFeatureValue;
  }

  @f private updateProviderWithStallNumber?: StoreFeatureBase;
  public get synchProviderWithStallNumber(): StoreFeatureBase {
    return this.updateProviderWithStallNumber ?? this.defaultFeatureValue;
  }

  /**
   * Internal use only to set the store name which is passed to features to be able to know whether is a lab store or not.
   * @internal
   */
  _onLoad(storeName: string): void {
    const featureProperties = Object.getOwnPropertyNames(this);

    for (const propName of featureProperties) {
      const feature = Reflect.get(this, propName) as StoreFeatureBase;
      if (feature instanceof StoreFeatureBase) {
        feature._storeName = storeName;
      }
    }
  }
}
