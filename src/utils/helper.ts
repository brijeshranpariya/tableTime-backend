import { parsePhoneNumberFromString } from "libphonenumber-js";

export const isValidPhoneNumber = (phone: string) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.isValid() : false;
};
