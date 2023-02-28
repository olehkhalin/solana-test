"use client";
import {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  memo,
  TextareaHTMLAttributes,
} from "react";
import cx from "clsx";

import { usePasteFromClipboard } from "hooks/usePasteFromClipboard";
import Paste from "svg/paste.svg";
import Success from "svg/success.svg";

import Divider from "./Divider";
import ErrorBlock from "./ErrorBlock";

export type AddressInputFieldProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
    errorMessage?: string;
    setValue?: (value: string) => void;
  };

const AddressInputField = memo(
  forwardRef<HTMLTextAreaElement, AddressInputFieldProps>(
    (
      {
        id,
        spellCheck = false,
        error,
        errorMessage,
        disabled,
        readOnly,
        autoComplete = "off",
        setValue,
        ...rest
      },
      ref
    ) => {
      const { paste, pasted } = usePasteFromClipboard(setValue);

      return (
        <div className="relative flex w-full flex-col">
          <div className="relative">
            <textarea
              ref={ref}
              spellCheck={spellCheck}
              id={id}
              disabled={disabled}
              readOnly={readOnly}
              className="h-[7rem] w-full resize-none bg-transparent py-6 px-5 text-xl font-extrabold outline-none"
              autoComplete={autoComplete}
              placeholder="Enter recipient address"
              {...rest}
            />
            <PasteButton
              pasted={pasted}
              onClick={() => {
                paste();
              }}
            />
          </div>
          <ErrorBlock error={error} errorMessage={errorMessage} />
          <Divider />
        </div>
      );
    }
  )
);

type PasteButtonProps = {
  pasted?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const iconClassName = "w-6 h-6 mr-1";

const PasteButton: FC<PasteButtonProps> = ({ pasted = false, ...props }) => (
  <button
    {...props}
    className={cx(
      "absolute bottom-2 right-5 flex items-center transition rounded-[.375rem] pr-1",
      "hover:bg-[#fff] hover:bg-opacity-[.15] hover:shadow-buttonsecondary",
      "focus-visible:bg-[#fff] focus-visible:bg-opacity-[.15] focus-visible:shadow-buttonsecondary",
      "active:bg-[#fff] active:bg-opacity-10 active:shadow-none"
    )}
    type="button"
  >
    {pasted ? (
      <>
        <Success className={iconClassName} />
        Pasted
      </>
    ) : (
      <>
        <Paste className={iconClassName} />
        Paste
      </>
    )}
  </button>
);

export default AddressInputField;
