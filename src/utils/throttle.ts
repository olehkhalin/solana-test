export const createThrottle = () => {
  let worker: Promise<unknown> | null = null;

  return <T>(factory: () => Promise<T>) => {
    if (!worker) {
      worker = factory().finally(() => {
        worker = null;
      });
    }

    return worker as Promise<T>;
  };
};
