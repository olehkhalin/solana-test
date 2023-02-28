import { FC } from "react";
import BigNumber from "bignumber.js";

import { SOL_DECIMALS } from "utils/constants";
import { convertLamports } from "utils/convertLamports";
import usePrice from "hooks/usePrice";
import PrettyAmount from "components/PrettyAmount";

import Divider from "./Divider";

type SummaryProps = {
  amount: BigNumber.Value;
  fee: BigNumber.Value;
};

const Summary: FC<SummaryProps> = ({ amount, fee }) => {
  const price = usePrice();

  const sum = new BigNumber(convertLamports(amount))
    .plus(convertLamports(fee))
    .multipliedBy(price);

  return (
    <div className="flex flex-col py-4 px-5">
      <Item label="Amount:" value={amount} />
      <Item label="Fee:" value={fee} />
      <Divider isStatic className="my-1.5" />
      <Item label="Total:" value={sum} withDollar={false} />
    </div>
  );
};

type ItemProps = {
  label: string;
  value: BigNumber.Value;
  withDollar?: boolean;
};

const Item: FC<ItemProps> = ({ label, value, withDollar = true }) => {
  const price = usePrice();

  return (
    <div className="flex justify-between py-0.5">
      <span className="font-semibold text-[#767C9D]">{label}</span>
      <span>
        <PrettyAmount
          amount={value}
          decimals={withDollar ? SOL_DECIMALS : undefined}
          currency={withDollar ? "SOL" : "USD"}
          isFiat={!withDollar}
          className="font-semibold"
        />
        {withDollar && (
          <span className="text-[#767C9D]">
            {" "}
            (
            <PrettyAmount
              amount={new BigNumber(convertLamports(value)).multipliedBy(price)}
              currency="USD"
              isFiat
            />
            )
          </span>
        )}
      </span>
    </div>
  );
};

export default Summary;
