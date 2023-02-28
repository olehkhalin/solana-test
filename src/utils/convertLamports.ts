import BigNumber from "bignumber.js";

import { SOL_DECIMALS } from "./constants";

export const convertLamports = (value: BigNumber.Value = 0, reverse = false) =>
  reverse
    ? new BigNumber(value).multipliedBy(10 ** SOL_DECIMALS).toString()
    : new BigNumber(value).div(10 ** SOL_DECIMALS).toString();
