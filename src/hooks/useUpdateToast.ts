import { useCallback, useRef } from "react";
import { toast, UpdateOptions } from "react-toastify";

export default function useUpdateToast() {
  const toastIdRef = useRef<string | number>();
  return useCallback(
    ({
      type,
      render,
      progress,
      autoClose = 5000,
      ...restOptions
    }: UpdateOptions) => {
      const creationFn = type && type !== "default" ? toast[type] : toast;
      if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
        toast.update(toastIdRef.current, {
          render,
          type,
          progress,
          autoClose,
          ...restOptions,
        });
      } else {
        toastIdRef.current = creationFn(render);
      }
    },
    []
  );
}
