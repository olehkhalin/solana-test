import { FC } from "react";
import cx from "clsx";

import Chevron from "svg/chevron-down.svg";
import Solana from "svg/solana.svg";

const SelectCoin: FC = () => {
  return (
    <button
      type="button"
      disabled
      className={cx(
        "relative z-10 ml-auto flex w-[11.25rem] items-center rounded-2xl border border-white/20 py-2 px-3 transition cursor-not-allowed",
        "hover:bg-[#fff] hover:bg-opacity-[.15] hover:shadow-buttonsecondary",
        "focus-visible:bg-[#fff] focus-visible:bg-opacity-[.15] focus-visible:shadow-buttonsecondary",
        "active:bg-[#fff] active:bg-opacity-10 active:shadow-none"
      )}
    >
      <Solana className="mr-2 h-10 w-10 rounded-full" />
      <span className="text-lg font-bold uppercase">Sol</span>
      <Chevron className="ml-auto h-6 w-6" />
    </button>
  );
};

export default SelectCoin;
