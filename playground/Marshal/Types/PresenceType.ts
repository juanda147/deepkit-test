export declare class PresenceType {
  /**
   * The name of the instance; should be exactly the variable name,
   * for serializing/deserializing simplicity.
   */
  readonly name: string;
  private constructor();
  static readonly APP_CONNECTED: PresenceType;
  static readonly APP_DISCONNECTED: PresenceType;
  static readonly SMS_CONNECTED: PresenceType;
  static readonly SMS_DISCONNECTED: PresenceType;
  static readonly PROVIDER_CONNECTED: PresenceType;
  static readonly PROVIDER_DISCONNECTED: PresenceType;
  static readonly UNDETERMINED: PresenceType;
  static get values(): PresenceType[];
  /**
   * Converts a string to its corresponding Enum instance.
   *
   * @param string the string to convert to Enum
   * @throws RangeError, if a string that has no corressonding Enum value was passed.
   * @returns the matching Enum
   */
  static fromString(string: string): PresenceType;
  /**
   * Called when converting the Enum value to a string using JSON.Stringify.
   * Compare to the fromString() method, which deserializes the object.
   */
  toJSON(): string;
  toString(): string;
  toLowerCase(): string;
  static isUserConnected(value?: PresenceType): boolean;
  static isProviderConnected(value?: PresenceType): boolean;
}
