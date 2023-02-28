import { FC } from "react";
import cx from "clsx";

type DividerProps = {
  isStatic?: boolean;
  className?: string;
};

const Divider: FC<DividerProps> = ({ isStatic = false, className }) => (
  <div
    className={cx(
      isStatic ? "" : "absolute",
      "bottom-0 left-0 h-px w-full bg-white opacity-10",
      className
    )}
  />
);

export default Divider;
