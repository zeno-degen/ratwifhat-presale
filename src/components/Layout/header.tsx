/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import WalletConnectBtn from "../walletConnectButton";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="w-full xl:flex items-center justify-center border-b border-black border-opacity-5 p-1">
        <div className="xl:w-[1300px] w-auto flex items-center justify-between px-3">
          <div className="flex items-center justify-center top-[24px] -z-[3] p-1 gap-3">
            <img
              src="/imgs/logo.png"
              className="w-[45px] h-[45px] border-black rounded-full border-opacity-10 border-[1px]"
              alt=""
            />
            <p className="uppercase text-black text-opacity-80 font-bold text-[14px]">
              RatWifHat
            </p>
          </div>
          <WalletConnectBtn />
        </div>
      </div>
    </>
  );
};

export default Header;
