import {
  MotionValue,
  SpringOptions,
  useSpring,
  useTransform,
} from "framer-motion";

declare type SingleTransformer<I, O> = (input: I) => O;

export function useSmoothTransform<I, O>(
  value: MotionValue<I>,
  springOptions: SpringOptions,
  transformer: SingleTransformer<I, O>
) {
  return useSpring(useTransform(value, transformer), springOptions);
}
