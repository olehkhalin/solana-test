import { FC } from "react";

import Logo from "svg/solana-logo.svg";

import ConnectWallet from "./connect-wallet";

const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 z-10 flex w-full items-center justify-between py-8 px-10">
      <span className="flex items-center text-xl font-extrabold">
        <Logo className="mr-2 -mb-1 h-6 w-6" />
        solana
      </span>
      <ConnectWallet />
    </header>
  );
};

export default Header;
