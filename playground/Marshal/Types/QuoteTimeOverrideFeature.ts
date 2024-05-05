import { StoreFeatureBase } from './StoreFeatureBase';

export class QuoteTimeOverrideConfiguration {
  effectiveDurationInMinutes!: number;
  targetPercentileOfDurationUntilReady!: number;
  minimumDurationUntilReadyInSeconds!: number;
  maximumDurationUntilReadyInSeconds!: number;
}

export class QuoteTimeOverrideFeature extends StoreFeatureBase {
  configuration!: QuoteTimeOverrideConfiguration;

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
