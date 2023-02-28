"use client";
import { FC } from "react";
import { ToastClassName, ToastContainer, TypeOptions } from "react-toastify";
import cx from "clsx";

import "react-toastify/dist/ReactToastify.css";

const ToastWrapper: FC = () => (
  <ToastContainer
    autoClose={5_000}
    hideProgressBar
    position="bottom-right"
    className="!right-10"
    bodyClassName="p-0"
    toastClassName={getToastClassName}
    pauseOnHover
    closeOnClick={false}
    pauseOnFocusLoss
  />
);

const getToastClassName: Exclude<ToastClassName, string> = (context) => {
  console.log("context", context);
  return cx(
    "w-80 p-4 rounded-[.625rem] border text-sm flex items-start relative z-20",
    context?.type && typeDependentClassNames[context?.type]
  );
};

const typeDependentClassNames: Partial<Record<TypeOptions, string>> = {
  success: "success-toast bg-[#1F3025] text-[#D7FFDB] border-[#D7FFDB]/[.15]",
  info: "info-toast bg-[#1F1F31] text-[#ffffff] border-[#ffffff]/[.15]",
  error: "error-toast bg-[#301F25] text-[#FFD7D7] border-[#FFD7D7]/[.15]",
};

export default ToastWrapper;
