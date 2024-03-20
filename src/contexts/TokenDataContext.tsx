import { ReactNode, createContext, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { useRate } from "../hooks/use-Rat";
import { GetTokenDataContextValue, UserDatas } from "../components/dataType";
import { ethers } from "ethers";
import { flareTestnet } from "viem/chains";
import { TOKEN_AIRDROP_CONTRACT_ADDR } from "../config";
export const GetTokenDataContext = createContext<GetTokenDataContextValue>({
  isClaimable: false,
  isBuyState: true,
  ethBalanceOfContract: 0,
  isClaimableForuser: false,
  userData: undefined,
  getInfo: () => {},
});

interface GetTokenDataProviderProps {
  children: ReactNode;
}

const GetTokenDataProvider: React.FC<GetTokenDataProviderProps> = ({
  children,
}) => {
  const { address } = useAccount();
  const { isTokenClaimable, isAvailableTobuy, getUserData } = useRate();

  const [isClaimable, setIsClaimable] = useState(false);
  const [userData, setUserData] = useState<UserDatas[]>();
  const [isClaimableForuser, setIsClaimableForUser] = useState(false);
  const [isBuyState, setIsBuyState] = useState(true);
  const [ethBalanceOfContract, setEthBalanceOfContract] = useState(0);

  const result = useBalance({
    address: TOKEN_AIRDROP_CONTRACT_ADDR,
    chainId: flareTestnet.id,
    scopeKey: "foo",
    formatUnits: "ether",
  });

  const getInfo = async () => {
    const state = await isTokenClaimable();
    setIsClaimable(state);
    const buyState = await isAvailableTobuy();
    setIsBuyState(buyState);
    if (address) {
      const data = await getUserData(address);
      const newUserDatas = [
        {
          walletAddr: data.walletAddress,
          claimedState: data.claimedState,
          canClaimAmount: Number(ethers.utils.formatUnits(data.canClaimAmount)),
        },
      ];
      setUserData(newUserDatas);
      console.log("newUserDatas", newUserDatas);
      setIsClaimableForUser(
        newUserDatas[0].canClaimAmount !== 0 &&
          newUserDatas[0].claimedState !== true
      );
    }
    getEthBalanceOfCtr();
  };

  const getEthBalanceOfCtr = () => {
    if (result.data) {
      try {
        const formattedBalance = ethers.utils.formatUnits(
          result.data.value.toString(),
          "ether"
        );
        console.log("formattedBalance", formattedBalance);
        setEthBalanceOfContract(Number(formattedBalance));
      } catch (error) {
        console.error("Error converting balance:", error);
      }
    }
  };

  useEffect(() => {
    if (address) {
      getInfo();
      const interval = setInterval(() => {
        getInfo();
      }, 6000); // 1 minute
      return () => clearInterval(interval);
    } else {
      setIsClaimableForUser(false);
      setUserData([]);
      setIsClaimable(false);
    }
    // eslint-disable-next-line
  }, [address]);

  return (
    <GetTokenDataContext.Provider
      value={{
        isClaimable,
        isBuyState,
        ethBalanceOfContract,
        isClaimableForuser,
        userData,
        getInfo,
      }}
    >
      {children}
    </GetTokenDataContext.Provider>
  );
};

export default GetTokenDataProvider;
