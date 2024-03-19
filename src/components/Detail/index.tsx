/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { warningAlert } from "../toastGroup";
const Detail = () => {
  return (
    <div className="w-full flex items-start justify-center gap-[30px]">
      <div className="w-[calc(100%-370px)] bg-white min-h-[20vh] rounded-md"></div>
      <div className="w-[370px] bg-white min-h-[20vh] rounded-md flex flex-col gap-4 p-2">
        <div></div>
      </div>
    </div>
  );
};

export default Detail;
