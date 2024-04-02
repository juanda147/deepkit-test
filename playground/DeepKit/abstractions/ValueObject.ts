import { shallowEqual } from 'shallow-equal-object';

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */
export abstract class ValueObject<T extends Readonly<T>> {
  public equals(to?: ValueObject<T>): boolean {
    if (to === null || to === undefined) {
      return false;
    }
    // when debug option is set to true, library uses console.log.  undefined will stop the behavior.  false is not a valid option
    return shallowEqual(this, to, { debug: undefined });
  }
}
