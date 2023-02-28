"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Field, Form } from "react-final-form";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import cx from "clsx";
import createDecorator from "final-form-focus";
import { motion, MotionConfig } from "framer-motion";

import { transition } from "utils/constants";
import { convertLamports } from "utils/convertLamports";
import { createThrottle } from "utils/throttle";
import {
  composeValidators,
  maxValue,
  required,
  validateAddress,
} from "utils/validators";
import useUpdateToast from "hooks/useUpdateToast";
import ConnectWallet from "components/connect-wallet";

import AddressInputField from "./AddressInput";
import Summary from "./Summary";
import ValueInput from "./ValueInput";

type FormValues = { amount: string; recipient: string };

const focusOnErrors = createDecorator<FormValues>();

const TransferForm: FC = () => {
  const [balance, setBalance] = useState<BigNumber.Value | null>(null);
  const [gas, setGas] = useState<BigNumber.Value>(0);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const updateToast = useUpdateToast();

  const withThrottle = useMemo(createThrottle, []);

  // Get wallet balance
  useEffect(() => {
    const getBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      const tokenBalance = await connection.getBalance(publicKey);
      setBalance(tokenBalance);
    };

    getBalance();
  }, [connection, publicKey]);

  const handleSubmit = useCallback(
    async ({ recipient, amount }, form) => {
      if (!publicKey || !connection) {
        updateToast({ type: "error", render: "Connect your wallet first!" });
        return;
      }
      try {
        updateToast({
          type: "info",
          render: "Transaction successfully submited. Please wait...",
        });
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: +convertLamports(amount, true),
          })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, "processed");

        updateToast({ type: "success", render: "Transaction completed!" });
        form.restart();
      } catch (e: any) {
        updateToast({
          type: "error",
          render: `There is an error: ${e?.message}`,
        });
      }
    },
    [connection, publicKey, sendTransaction]
  );

  // Estimate gas
  const estimateGas = useCallback(
    () =>
      withThrottle(async () => {
        const payer = Keypair.generate();
        const payee = Keypair.generate();

        const recentBlockhash = await connection.getLatestBlockhash();

        const transaction = new Transaction({
          recentBlockhash: recentBlockhash.blockhash,
          feePayer: payer.publicKey,
        }).add(
          SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: payee.publicKey,
            lamports: 10,
          })
        );

        const fees = await transaction.getEstimatedFee(connection);
        setGas(fees ?? 0);
      }),
    [connection, withThrottle]
  );

  useEffect(() => {
    let t: any;

    const performAndDefer = () => {
      estimateGas();
      t = setTimeout(performAndDefer, 10_000);
    };

    performAndDefer();

    return () => clearTimeout(t);
  }, [estimateGas]);

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      decorators={[focusOnErrors]}
      render={({ form, handleSubmit, values, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className="card relative flex w-[28.75rem] flex-col rounded-3xl px-5 pt-5 pb-8"
        >
          <span className="absolute top-0.5 left-1/2 h-4 w-28 -translate-x-1/2 rounded-b-xl bg-[#131228]" />
          <Field
            // key={amountFieldKey}
            name="amount"
            validate={composeValidators(
              required,
              maxValue(balance ? convertLamports(balance) : Infinity, "SOL")
            )}
          >
            {({ input, meta }) => (
              <ValueInput
                {...input}
                balance={balance}
                onBalanceClick={() =>
                  balance !== null
                    ? form.change("amount", convertLamports(balance))
                    : null
                }
                error={meta.error && meta.touched}
                errorMessage={meta.error}
              />
            )}
          </Field>
          <Field
            name="recipient"
            validate={composeValidators(required, validateAddress)}
          >
            {({ input, focus, meta }) => (
              <AddressInputField
                setValue={(value) => {
                  form.change("recipient", value);
                  focus?.();
                }}
                error={meta.error && meta.touched}
                errorMessage={meta.error}
                {...input}
              />
            )}
          </Field>
          <Summary
            amount={convertLamports(+values.amount ? values.amount : 0, true)}
            fee={gas}
          />
          <div className="mt-4 flex justify-center">
            {publicKey ? (
              <SubmitButton loading={submitting} />
            ) : (
              <ConnectWallet />
            )}
          </div>
        </form>
      )}
    />
  );
};

type SubmitButtonProps = {
  loading?: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({ loading = false }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <MotionConfig transition={transition}>
      <motion.button
        type="submit"
        disabled={loading}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        whileHover="hover"
        variants={{
          rest: { scale: 1 },
          hover: { scale: loading ? 1 : 1.1 },
          press: { scale: loading ? 1 : 1.05 },
        }}
        onHoverStart={() => !loading && setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        className={cx(
          "relative	flex h-12 w-60 items-center justify-center rounded-2xl bg-button-gradient text-lg font-extrabold lowercase text-[#120A2F]",
          loading ? "cursor-not-allowed opacity-20" : ""
        )}
      >
        <motion.span
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: loading ? 0 : 1 },
          }}
        >
          <div className="absolute -bottom-1 left-1 h-4 w-[50%] bg-[#D32BF2] blur-md" />
          <div className="absolute -bottom-1 right-1 h-4 w-[50%] bg-[#10D9BB] blur-md" />
        </motion.span>
        {loading ? (
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : (
          "Transfer"
        )}
      </motion.button>
    </MotionConfig>
  );
};

export default TransferForm;
