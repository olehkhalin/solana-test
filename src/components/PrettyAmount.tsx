import { FC, memo } from "react";
import BigNumber from "bignumber.js";
import classNames from "clsx";

export type PrettyAmountProps = {
  amount: BigNumber.Value | null;
  decimals?: number;
  currency?: string;
  isFiat?: boolean;
  className?: string;
};

const PrettyAmount = memo<PrettyAmountProps>(
  ({ amount, decimals, currency, isFiat = false, className }) => {
    const amountExist = amount !== null;
    const bigNumberAmount = new BigNumber(amount ?? 0);

    const convertedAmount = bigNumberAmount.div(10 ** (decimals ?? 0));

    const integerPart = convertedAmount.decimalPlaces(0);
    const decimalPlaces = convertedAmount.toString().split(".")[1];

    const isFiatMinified = isFiat && convertedAmount.gte(0.01);

    let decSplit = isFiatMinified ? 2 : 6;
    if (integerPart.gte(1_000)) {
      decSplit = 2;
    }

    const finalDecLength = decimalPlaces
      ? isFiatMinified
        ? 2
        : decimalPlaces.length
      : 0;

    let isShownDecTooltip = false;
    if (finalDecLength > decSplit) {
      isShownDecTooltip = true;
    }

    const isShownIntTooltip = integerPart.toString().length > 6;

    const zeroDecimals = !isFiat && decimals === 0;

    const threeDots = !isFiat && (isShownDecTooltip || isShownIntTooltip);

    let content = getPrettyAmount({
      value: isFiatMinified
        ? convertedAmount.decimalPlaces(
            2,
            convertedAmount.gte(0.01)
              ? BigNumber.ROUND_DOWN
              : BigNumber.ROUND_UP
          )
        : convertedAmount,
      dec: undefined,
      zeroDecimals,
      isFiat,
      currency,
      threeDots,
    });

    if (isShownIntTooltip) {
      content = getPrettyAmount({
        value: convertedAmount,
        dec: 6,
        zeroDecimals,
        isFiat,
        currency,
        threeDots,
      });
    }

    if (isShownDecTooltip && !isShownIntTooltip) {
      content = getPrettyAmount({
        value: convertedAmount.decimalPlaces(
          isFiat ? 2 : decSplit,
          isFiat ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN
        ),
        dec: undefined,
        zeroDecimals,
        isFiat,
        currency,
        threeDots,
      });
    }

    className = classNames(className, "whitespace-nowrap");

    if (!amountExist) {
      className = classNames(className, "invisible pointer-events-none");
    }

    return (
      <span className={className}>
        <AmountWithCurrency
          amount={content}
          currency={currency}
          isFiat={isFiat}
        />
      </span>
    );
  }
);

export default PrettyAmount;

const AmountWithCurrency: FC<{
  amount: string;
  currency?: string;
  isFiat?: boolean;
}> = ({ amount, currency, isFiat = false }) => {
  if (!currency) {
    return <>{amount}</>;
  }

  return (
    <span>
      {amount}
      {!isFiat && (
        <>
          {" "}
          <span>{currency}</span>
        </>
      )}
    </span>
  );
};

export const getPrettyAmount = ({
  value,
  dec = 6,
  zeroDecimals,
  locale = "en-US",
  useGrouping = true,
  isFiat = false,
  currency,
  threeDots = false,
}: {
  value: number | BigNumber;
  dec?: number;
  locale?: string;
  zeroDecimals?: boolean;
  useGrouping?: boolean;
  isFiat?: boolean;
  currency?: string;
  threeDots?: boolean;
}) => {
  if (new BigNumber(value).decimalPlaces(0).toString().length > dec) {
    const isLargerThenTrillion = new BigNumber(value).gt(1e16);
    const minFract = isLargerThenTrillion || zeroDecimals ? 0 : 2;
    const maxFract = isLargerThenTrillion ? 0 : dec > 4 ? 3 : 2;

    let minifiedFractions = new BigNumber(value);
    if (minifiedFractions.gte(1e9)) {
      minifiedFractions = minifyFractions(minifiedFractions, maxFract, 9);
    } else if (minifiedFractions.gte(1e6)) {
      minifiedFractions = minifyFractions(minifiedFractions, maxFract, 6);
    }

    return getIntlNumberFormat(
      locale,
      minFract,
      maxFract,
      "compact",
      useGrouping,
      isFiat ? "currency" : undefined,
      isFiat ? currency : undefined
    )
      .format(+minifiedFractions)
      .replace("US$", "$");
  }

  return `${getIntlNumberFormat(
    locale,
    zeroDecimals ? 0 : 2,
    20,
    "standard",
    useGrouping,
    isFiat ? "currency" : undefined,
    isFiat ? currency : undefined
  )
    .format(+value)
    .replace("US$", "$")}${threeDots ? "..." : ""}`;
};

const getIntlNumberFormat = (
  locale: string,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  notation?: "standard" | "scientific" | "engineering" | "compact",
  useGrouping?: boolean,
  style?: "currency",
  currency?: string
) =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
    useGrouping,
    style,
    currency,
  });

const minifyFractions = (
  value: BigNumber.Value,
  maxRound: number,
  fractions: number
) => {
  const multiplier = new BigNumber(10).pow(fractions);

  return new BigNumber(value)
    .div(multiplier)
    .decimalPlaces(maxRound, BigNumber.ROUND_DOWN)
    .multipliedBy(multiplier);
};
