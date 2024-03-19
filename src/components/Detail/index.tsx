/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ClassicSpinner } from "react-spinners-kit";
import { errorAlert, successAlert, warningAlert } from "../toastGroup";
import Countdown from "../countDown";
import { ethers } from "ethers";
import { flareTestnet } from "viem/chains";
import { useRate } from "../../hooks/use-Rat";
import { GetTokenDataContext } from "../../contexts/TokenDataContext";
const Detail = () => {
  const { isClaimable, userData, getInfo, isClaimableForuser } =
    useContext(GetTokenDataContext);
  const { payWithEth, claimToken } = useRate();
  const { address } = useAccount();
  const [balance, setBalance] = useState(0); // Initialize with a default value
  const [payAmount, setPayAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const result = useBalance({
    address: address,
    chainId: flareTestnet.id,
    scopeKey: "foo",
    formatUnits: "ether",
  });

  useEffect(() => {
    if (result.data) {
      try {
        const formattedBalance = ethers.utils.formatUnits(
          result.data.value.toString(),
          "ether"
        );
        setBalance(Number(formattedBalance));
      } catch (error) {
        console.error("Error converting balance:", error);
      }
    }
  }, [result.data]);

  const handleBuyFunc = async () => {
    try {
      setLoading(true);
      const rept = await payWithEth(payAmount);
      if (rept === null) {
        warningAlert("Rejected by User!");
      } else {
        setLoading(false);
        successAlert("Paid Successfully.");
      }
    } catch (error: any) {
      if (error.message.includes("User rejected the request.")) {
        setLoading(false);
        errorAlert("User rejected the request.");
      } else {
        console.log("error", error);
        setLoading(false);
        errorAlert("Failed Paid");
      }
    } finally {
      setLoading(false);
      getInfo();
    }
  };

  const handleClaimFunc = async () => {
    try {
      setLoading(true);
      const rept = await claimToken();
      if (rept === null) {
        warningAlert("Rejected by User!");
      } else {
        setLoading(false);
        successAlert("Claimed Successfully.");
      }
    } catch (error: any) {
      if (error.message.includes("User rejected the request.")) {
        setLoading(false);
        errorAlert("User rejected the request.");
      } else {
        console.log("error", error);
        setLoading(false);
        errorAlert("Failed Claimed");
      }
    } finally {
      setLoading(false);
      getInfo();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-start justify-center gap-[30px]">
        <div className="lg:w-[calc(100%-370px)] md:w-1/2 w-full bg-white min-h-[10vh] rounded-md p-5">
          <h1 className="text-lg uppercase font-bold">About</h1>
          <div className="flex flex-col gap-5 mt-5">
            <p className="text-[15px]">
              {` $RWH WITH 100 BILLION RWH TOKENS READY TO INFEST THE MARKET, we're
              here to prove that even the smallest contenders can make the
              biggest waves.`}
            </p>
            <p className="text-[15px]">🔓 Revoked: Freeze, Mint, Metadata</p>
            <div>
              <p className="text-[15px]">
                {`🥇Top Tier SOL-OG Influencers & Callers`}
                <br /> {`🔶CA Renounced`} <br />
                {`🔶SOL Trending`} <br />
                {`📈 BuyBack & Burn🔥`}
                <br /> {`💯100x potential`}
                <br /> {`❌No Private Sale`}
                <br />
                {`❌No Team Token`} <br />
                {` ✅Highly experienced Team`}
                <br /> {`✅NO Whitelist ✅No buy/sell Tax`}
                <br /> {`✅Liquidity Lock`} <br />
                {`✅Token just for presale`}
              </p>
            </div>
          </div>
          <h1 className="text-lg uppercase mt-5 font-bold">Roadmap</h1>
        </div>
        <div className="lg:w-[370px] md:w-1/2 w-full flex flex-col gap-4 p-2">
          <div className="border p-4 rounded-sm shadow-sm text-sm flex items-center gap-4 border-yellow-400 bg-yellow-50 text-neutral-700">
            <div className="flex-1">
              <div className="font-semibold text-md"></div>
              <div className="break-words font-semibold">
                <div>The users can claim after presale!</div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white min-h-[20vh] rounded-md p-4 flex flex-col gap-2">
            <Countdown timestamp={1710982869 * 1000} />
            <p className="text-[14px] mt-6">
              Amount (Max:
              <span className="text-[#E61A59]">
                {balance.toFixed(2) + "C2FLR"}
              </span>
              )
            </p>
            <div
              className="w-full flex items-center justify-between border-[1px] border-black
           border-opacity-20 rounded-sm p-1 gap-4"
            >
              <input
                className="w-full outline-none text-[14px]"
                placeholder="0"
                type="number"
                onChange={(e) =>
                  Number(e.target.value) > Number((balance - 0.01).toFixed(3))
                    ? setPayAmount(Number((balance - 0.01).toFixed(3)))
                    : setPayAmount(Number(e.target.value))
                }
                value={payAmount !== 0 ? payAmount : ""}
              />
              <div
                className="text-[#E61A59] text-[16px] cursor-pointer"
                onClick={() => setPayAmount(Number(balance))}
              >
                Max
              </div>
            </div>
            {payAmount !== 0 && (
              <p className="text-[12px] text-blue-400 duration-300 transition-all">
                You will receive {payAmount.toLocaleString()} TRWH
              </p>
            )}
            <div className="w-full flex items-center justify-between">
              <div
                className={`rounded-sm text-[13px] ${
                  payAmount === 0
                    ? "bg-[#f5f5f5] text-[#00000040] border-[1px]  cursor-not-allowed"
                    : "bg-[#F95192] text-white py-[5px] cursor-pointer"
                }  px-2 py-1 transition-all duration-300`}
                onClick={() => payAmount !== 0 && handleBuyFunc()}
              >
                Buy with C2FLR
              </div>
              {isClaimable && userData && (
                <div
                  className={`rounded-sm text-[13px] ${
                    !isClaimableForuser
                      ? "bg-[#f5f5f5] text-[#00000040] border-[1px]  cursor-not-allowed"
                      : "bg-[#F95192] text-white py-[5px] cursor-pointer"
                  }  px-2 py-1 transition-all duration-300`}
                  onClick={() => isClaimableForuser && handleClaimFunc()}
                >
                  Claim Now
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm duration-300
      transition-all"
        >
          <ClassicSpinner color="#F95192" />
        </div>
      )}
    </>
  );
};

export default Detail;
