import { ReactNode, createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRate } from "../hooks/use-Rat";
import { GetTokenDataContextValue, UserDatas } from "../components/dataType";

export const GetTokenDataContext = createContext<GetTokenDataContextValue>({
  isClaimable: false,
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
  const { isTokenClaimable, getUserData } = useRate();

  const [isClaimable, setIsClaimable] = useState(false);
  const [userData, setUserData] = useState<UserDatas[]>();
  const [isClaimableForuser, setIsClaimableForUser] = useState(false);

  const getInfo = async () => {
    const state = await isTokenClaimable();
    setIsClaimable(state);
    if (address) {
      const data = await getUserData(address);
      const newUserDatas = [
        {
          walletAddr: data.walletAddress,
          claimedState: data.claimedState,
          claimAmount: data.ethPaidAmount,
        },
      ];
      setUserData(newUserDatas);
      setIsClaimableForUser(
        newUserDatas[0].claimAmount !== 0 &&
          newUserDatas[0].claimedState !== true
      );
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
