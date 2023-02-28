import { useCallback, useEffect, useState } from "react";

export function usePasteFromClipboard(
  setValue?: (value: string) => void,
  copyDelay: number = 1000 * 2
) {
  const [pasted, setPasted] = useState(false);

  useEffect(() => {
    if (pasted) {
      const timeout = setTimeout(() => {
        setPasted(false);
      }, copyDelay);

      return () => clearTimeout(timeout);
    }

    return;
  }, [copyDelay, pasted]);

  const paste = useCallback(async () => {
    try {
      if (pasted) return;

      const text = await navigator.clipboard.readText();
      if (setValue) {
        setValue(text);
      }
      setPasted(true);
    } catch (e) {
      console.error(e);
    }
  }, [pasted, setValue]);

  return { paste, pasted, setPasted };
}
