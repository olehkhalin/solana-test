import useSWR from "swr";

const usePrice = () => {
  const { data } = useSWR(
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
    fetcher,
    { refreshInterval: 1000 }
  );

  return data?.solana?.usd ?? 0;
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default usePrice;
