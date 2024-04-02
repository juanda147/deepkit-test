import { deserialize, cast } from "@deepkit/type";
import { PhoneNumber } from "./entities/PhoneNumber";
import { describe, test, expect } from "@jest/globals";


describe('given a serialized PhoneNumber', () => {
        const phoneNumber = PhoneNumber.create('213-326-7683').getValue();
        const serializedPhoneNumber = cast<PhoneNumber>(phoneNumber);        
        describe('when the PhoneNumber class is deserialized', () => {
            const deSerializedPhoneNumber = deserialize<PhoneNumber>(serializedPhoneNumber);
            test('Then the class get methods functions as expected', () => {
                expect(deSerializedPhoneNumber.formatPhoneNumberAsE164).toBe('+12133267683');
                expect(deSerializedPhoneNumber.formatPhoneNumberAsNational).toBe('(213) 326-7683');
                expect(deSerializedPhoneNumber.couldBeMobile).toBe(true);
            });
        });
    });
