import * as libphonenumber from 'google-libphonenumber';
import { ValueObject } from '../abstractions/ValueObject';
import { Result } from '../abstractions/Result';

export class PhoneNumber extends ValueObject<PhoneNumber> {
  private readonly phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

  constructor(private readonly parsedNumber: libphonenumber.PhoneNumber) {
    super()
  }
  
  public static get validRegions(): Array<string> {
    return ['US', 'CO', 'RO'];
  }

  public static get validTypes(): Array<libphonenumber.PhoneNumberType> {
    return [
      libphonenumber.PhoneNumberType.FIXED_LINE_OR_MOBILE,
      libphonenumber.PhoneNumberType.TOLL_FREE,
      libphonenumber.PhoneNumberType.MOBILE,
    ];
  }

  public static create(phoneNumber: string): Result<PhoneNumber> {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const parsedNumber = this.parsePhoneNumber(phoneNumber, phoneUtil);
    if (this.validTypes.includes(phoneUtil.getNumberType(parsedNumber)) === true) {
      return Result.ok<PhoneNumber>(new PhoneNumber(parsedNumber));
    } else {
      if (phoneUtil.isPossibleNumber(parsedNumber) === false)
        return Result.fail<PhoneNumber>(`PhoneNumber: ${phoneNumber} isn't possibly correct.`);
      if (phoneUtil.isValidNumber(parsedNumber) === false)
        return Result.fail<PhoneNumber>(`PhoneNumber: ${phoneNumber} isn't valid.`);
      return Result.fail<PhoneNumber>(`PhoneNumber: ${phoneNumber} isn't the correct type.`);
    }
  }

  public get couldBeMobile(): boolean {
    return [libphonenumber.PhoneNumberType.FIXED_LINE_OR_MOBILE, libphonenumber.PhoneNumberType.MOBILE].includes(
      this.phoneUtil.getNumberType(this.parsedNumber),
    );
  }

  public get formatPhoneNumberAsNational(): string {
    return this.phoneUtil.format(this.parsedNumber, libphonenumber.PhoneNumberFormat.NATIONAL);
  }

  public get formatPhoneNumberAsE164(): string {
    return this.phoneUtil.format(this.parsedNumber, libphonenumber.PhoneNumberFormat.E164);
  }

  private static parsePhoneNumber = function (
    phoneNumber: string,
    phoneUtil: libphonenumber.PhoneNumberUtil,
  ): libphonenumber.PhoneNumber {
    let parsedNumber = new libphonenumber.PhoneNumber();
    try {
      for (const region of PhoneNumber.validRegions) {
        parsedNumber = phoneUtil.parse(phoneNumber, region);
        if (
          phoneUtil.isPossibleNumber(parsedNumber) === true && // faster then isValidNumber wont allow empty string or values of bad length
          phoneUtil.isValidNumber(parsedNumber) === true
        )
          break;
      }
    } catch {
      return new libphonenumber.PhoneNumber();
    }
    return parsedNumber;
  };
}
