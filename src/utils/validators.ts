import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

type ValidationType = (value: string) => string | undefined;

export const composeValidators =
  (...validators: (ValidationType | undefined)[]) =>
  (value: string) =>
    validators.reduce(
      (error: string | undefined, validator?: ValidationType) =>
        error || validator?.(value),
      undefined
    );

export const required = (value: string) => (value ? undefined : "Required");

export const maxValue =
  (max: BigNumber.Value, currencySymbol?: string) => (value: string) => {
    const amount = new BigNumber(value);
    if (amount && amount.lte(max)) {
      return undefined;
    }

    return `The maximum amount is ${max}${
      currencySymbol ? ` ${currencySymbol}` : ""
    }`;
  };

export const validateAddress = (address: string) => {
  try {
    return PublicKey.isOnCurve(new PublicKey(address))
      ? undefined
      : "The recipient address is invalid";
  } catch (e) {
    return "The recipient address is invalid";
  }
};
