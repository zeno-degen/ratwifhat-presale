import { getContract } from "wagmi/actions";
import { Abi } from "viem";

import { write, read } from "./utils";
import {
  DEFAULT_GAS,
  DEFAULT_GAS_PRICE,
  TOKEN_AIRDROP_CONTRACT_ADDR,
} from "../config";
import TOKEN_AIRDROP_CONTRACT_ABI from "../../public/abis/token_airdrop.json";
import { ethers } from "ethers";

export function useRate() {
  const isTokenClaimable = async () => {
    try {
      const contract: any = getContract({
        address: TOKEN_AIRDROP_CONTRACT_ADDR as `0x${string}`,
        abi: TOKEN_AIRDROP_CONTRACT_ABI as Abi,
      });
      const res = await contract.read.isTokenClaimable({
        args: [],
      });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const isAvailableTobuy = async () => {
    try {
      const contract: any = getContract({
        address: TOKEN_AIRDROP_CONTRACT_ADDR as `0x${string}`,
        abi: TOKEN_AIRDROP_CONTRACT_ABI as Abi,
      });
      const res = await contract.read.isAvailableTobuy({
        args: [],
      });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const getUserData = async (address: string) => {
    try {
      const contract: any = getContract({
        address: TOKEN_AIRDROP_CONTRACT_ADDR as `0x${string}`,
        abi: TOKEN_AIRDROP_CONTRACT_ABI as Abi,
      });
      const res = await contract.read.getStakedInfoByUser({
        args: [address],
      });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const payWithEth = async (amount: number) => {
    try {
      const etherAmount = ethers.utils.parseEther(amount.toString());
      const valueToSend = BigInt(etherAmount.toString());
      return await write({
        address: TOKEN_AIRDROP_CONTRACT_ADDR,
        abi: TOKEN_AIRDROP_CONTRACT_ABI as Abi,
        functionName: "payEthToClaimTokens",
        value: valueToSend,
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  };

  const claimToken = async () => {
    try {
      return await write({
        address: TOKEN_AIRDROP_CONTRACT_ADDR,
        abi: TOKEN_AIRDROP_CONTRACT_ABI as Abi,
        functionName: "claimTokens",
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  };

  return {
    isTokenClaimable,
    isAvailableTobuy,
    getUserData,
    payWithEth,
    claimToken,
  };
}
