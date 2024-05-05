import { f } from '@marcj/marshal';
import { StoreFeatureBase } from './StoreFeatureBase';

export class QuoteTimeOverrideConfiguration {
  @f effectiveDurationInMinutes!: number;
  @f targetPercentileOfDurationUntilReady!: number;
  @f minimumDurationUntilReadyInSeconds!: number;
  @f maximumDurationUntilReadyInSeconds!: number;
}

export class QuoteTimeOverrideFeature extends StoreFeatureBase {
  @f.optional() configuration!: QuoteTimeOverrideConfiguration;

  static get Gql(): string {
    return `
    quoteTimeOverride {
      isEnabled
      configuration {
        effectiveDurationInMinutes
        minimumDurationUntilReadyInSeconds
        maximumDurationUntilReadyInSeconds
        targetPercentileOfDurationUntilReady
      }
    }`;
  }
}
