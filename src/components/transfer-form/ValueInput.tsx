"use client";
import { forwardRef, HTMLProps, memo, useRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import BigNumber from "bignumber.js";
import cx from "clsx";

import { SOL_DECIMALS } from "utils/constants";
import { convertLamports } from "utils/convertLamports";
import usePrice from "hooks/usePrice";
import PrettyAmount from "components/PrettyAmount";

import Divider from "./Divider";
import ErrorBlock from "./ErrorBlock";
import SelectCoin from "./SelectCoin";

type ValueInputProps = NumberInputProps & {
  balance?: BigNumber.Value | null;
  error?: boolean;
  errorMessage?: string;
  onBalanceClick?: () => void;
};

const ValueInput = forwardRef<HTMLInputElement, ValueInputProps>(
  ({ error, errorMessage, balance, onBalanceClick, ...props }, ref) => {
    const isBalance = balance !== undefined && balance !== null;
    const price = usePrice();

    return (
      <div className={cx("relative flex flex-col")}>
        <div
          className={cx(
            "relative w-full px-5 pt-6",
            isBalance ? "pb-10" : "pb-6"
          )}
        >
          <NumberInput
            ref={ref}
            className={cx(
              "absolute inset-0 pt-6",
              isBalance ? "pb-10" : "pb-6"
            )}
            {...props}
          />
          {isBalance && (
            <button
              onClick={onBalanceClick}
              className={cx(
                "absolute left-5 bottom-2 py-1 px-2 -ml-2 transition rounded-[.375rem]",
                "hover:bg-[#fff] hover:bg-opacity-[.15] hover:shadow-buttonsecondary",
                "focus-visible:bg-[#fff] focus-visible:bg-opacity-[.15] focus-visible:shadow-buttonsecondary",
                "active:bg-[#fff] active:bg-opacity-10 active:shadow-none"
              )}
              type="button"
            >
              <span className="font-bold">Balance: </span>
              <PrettyAmount
                amount={balance}
                decimals={SOL_DECIMALS}
                currency="SOL"
              />{" "}
              (
              <PrettyAmount
                amount={new BigNumber(convertLamports(balance))
                  .multipliedBy(price)
                  .toString()}
                isFiat
                currency="USD"
              />
              )
            </button>
          )}
          <SelectCoin />
        </div>
        <ErrorBlock error={error} errorMessage={errorMessage} />
        <Divider />
      </div>
    );
  }
);

export type InputProps = {
  className?: string;
} & Omit<HTMLProps<HTMLInputElement>, "ref">;

type NumberInputProps = Omit<NumericFormatProps, "type"> &
  Omit<InputProps, "ref" | "value" | "defaultValue" | "type" | "onChange"> & {
    defaultValue?: string | number;
    value?: string | number;
    decimalSeparator?: string;
  };

const NumberInput = memo(
  forwardRef<HTMLInputElement, NumberInputProps>(
    ({ allowNegative = false, value, onChange, className, ...rest }, ref) => {
      const prevValueRef = useRef<string>();

      return (
        <NumericFormat
          getInputRef={ref}
          allowNegative={allowNegative}
          value={value}
          onValueChange={({ value }, { source, event }) => {
            if (event && source === "event" && value !== prevValueRef.current) {
              prevValueRef.current = value;
              Object.assign(event, {
                target: { value },
              });
              onChange?.(event as any);
            }
          }}
          {...rest}
          thousandSeparator=","
          decimalSeparator="."
          allowedDecimalSeparators={[",", "."]}
          placeholder="0.00"
          decimalScale={SOL_DECIMALS}
          className={cx(
            "text-2xl	font-extrabold outline-none bg-transparent pl-5 pr-[13.75rem]",
            className
          )}
        />
      );
    }
  )
);

export default ValueInput;
