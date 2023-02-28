"use client";
import { FC, useState } from "react";
import useMeasure from "react-use-measure";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { ColorManagement } from "three";

import { transition } from "utils/constants";

import Shapes from "./Shapes";

ColorManagement.legacyMode = false;

const ConnectWallet: FC = () => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionConfig transition={transition}>
      <motion.div
        ref={ref}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 },
          press: { scale: 1.05 },
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
        className="relative h-12 w-44 rounded-2xl bg-[#5E4DBD] text-[#fff]"
      >
        <motion.div
          className="absolute -inset-px rounded-2xl bg-button-gradient"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          <div className="absolute -bottom-1 left-1 h-4 w-[50%] bg-[#D32BF2] blur-md" />
          <div className="absolute -bottom-1 right-1 h-4 w-[50%] bg-[#10D9BB] blur-md" />
          <div className="pointer-events-none absolute -inset-8">
            <Shapes
              isHover={isHover}
              isPress={isPress}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          </div>
        </motion.div>
        <motion.div
          variants={{ hover: { scale: 1 }, press: { scale: 1.1 } }}
          className="absolute -inset-px flex items-center justify-center"
        >
          <WalletMultiButton className="flex h-full w-full items-center justify-center bg-none p-0 text-lg font-extrabold lowercase" />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

export default ConnectWallet;
