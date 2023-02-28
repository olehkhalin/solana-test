import { FC } from "react";
import cx from "clsx";

type ErrorBlockProps = {
  error?: boolean;
  errorMessage?: string;
};

const ErrorBlock: FC<ErrorBlockProps> = ({ error, errorMessage }) => (
  <div
    className={cx(
      "max-h-0 overflow-hidden transition-[max-height] duration-200 bg-[#F04E4E] bg-opacity-40 rounded-lg mb-2",
      error && errorMessage && "max-h-14"
    )}
  >
    <span className="block py-1 px-4 text-sm text-[#FFD7D7]">
      {errorMessage}
    </span>
  </div>
);

export default ErrorBlock;
