import { f } from "@marcj/marshal";

export abstract class GqlFeatureBase {
    static get Gql(): string {
      throw new Error('please implement this method in the class that is extending this.');
    }
  }
  
  export class StoreFeatureBase extends GqlFeatureBase {
    @f.type(String) protected storeName = '';
    // @f.type(Boolean) protected isEnabled : boolean = false; // works with boolean type
    @f.type(Boolean) protected isEnabled  = false; // does not work with boolean type
  
    /**
     * Internal use only to set the store name to be able to know whether is a lab store or not.
     * @internal
     */
    public set _storeName(value: string) {
      this.storeName = value;
    }
  
    /**
     * Returns whether the specified feature is not enabled.
     * @returns {boolean}
     *  - Returns `true` if the feature itself is not enabled.
     *  - Returns `true` if the environment is different than production unless it is a lab store and the feature itself is disabled.
     *  - Returns `false` if it is a lab store and the feature itself is enabled.
     *  - Returns `false` if it is not a lab store, the environment is production and the feature itself is enabled.
     * @remarks it will resolve to `true` if the Company is not ACTIVE and/or Store status is not ACTIVE/REVIEW_ACCURACY.
     */
    isNotEnabled(): boolean {
      if (this.storeName?.includes('Lab |')) return this.isEnabled === false;
  
      if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'production') {
        return this.isEnabled === false;
      } else {
        // Always return true on an environment different than production to avoid patching customer information mistakenly either in dev or local environments.
        return true;
      }
    }

    isEnable(): boolean {
      return this.isEnabled;
    }
  }
  