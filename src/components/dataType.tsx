export type UserDatas = {
  walletAddr: string;
  claimedState: boolean;
  canClaimAmount: number;
};

export type GetTokenDataContextValue = {
  isClaimable: boolean;
  isBuyState: boolean;
  ethBalanceOfContract: number;
  isClaimableForuser: boolean;
  userData: UserDatas[] | undefined;
  getInfo: () => void;
};
