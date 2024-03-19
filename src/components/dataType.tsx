export type UserDatas = {
  walletAddr: string;
  claimedState: boolean;
  claimAmount: number;
};

export type GetTokenDataContextValue = {
  isClaimable: boolean;
  isClaimableForuser: boolean;
  userData: UserDatas[] | undefined;
  getInfo: () => void;
};
