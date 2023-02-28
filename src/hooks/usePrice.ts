import useSWR from "swr";

const usePrice = () => {
  const { data } = useSWR(
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
    fetcher,
    { refreshInterval: 1000 }
  ) as any;

  return data?.solana?.usd ?? 0;
};

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export default usePrice;
