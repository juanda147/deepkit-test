import { f } from '@marcj/marshal';
import { StoreFeatureBase } from './StoreFeatureBase';

export class StartOrderFeatureOriginSettings {
  constructor(@f public name: string, @f.array(String).optional() public handoffLocations?: Array<string>) {}
}

export class StartOrderFeatureConfiguration {
  constructor(
    @f.array(StartOrderFeatureOriginSettings).optional() public origin?: Array<StartOrderFeatureOriginSettings>,
    @f.array(String).optional() public handoffLocations?: Array<string>,
  ) {}
}

export class StartOrderInProviderFeature extends StoreFeatureBase {
  @f.optional() configuration?: StartOrderFeatureConfiguration;

  static get Gql(): string {
    return `
    startOrderInProvider {
      isEnabled
      configuration {
        origin {
          name
          handoffLocations
        }
        handoffLocations
      }
    }`;
  }

  isNotEnabled(origin?: string, handoffLocation?: string): boolean {
    if (super.isNotEnabled()) return true;

    if (
      this.configuration == null ||
      (this.configuration?.handoffLocations == null && this.configuration?.origin == null) ||
      (this.configuration?.handoffLocations?.length === 0 && this.configuration?.origin?.length === 0)
    ) {
      return this.isEnabled ? false : true;
    }

    // 1. Origin -> Handoff location look up
    const originAndHandoffConfiguration = this.configuration?.origin
      ?.find((x) => x.name == origin)
      ?.handoffLocations?.find((y) => y == handoffLocation);
    if (originAndHandoffConfiguration != null) {
      return false;
    }

    // 2. Handoff location look up
    const handoffConfiguration = this.configuration?.handoffLocations?.find((x) => x == handoffLocation);
    if (handoffConfiguration != null) {
      return false;
    }

    // 3. Origin lookup on Origin
    const originConfiguration = this.configuration?.origin?.find((x) => x.name == origin);
    if (originConfiguration != null) {
      return false;
    }

    return true;
  }
}
