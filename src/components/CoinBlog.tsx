import { coinInfo, userInfo } from "@/utils/types";
import { getUserInfo } from "@/utils/util";
import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";

interface CoinBlogProps {
  coin: coinInfo;
  componentKey: string;
}

export const CoinBlog: React.FC<CoinBlogProps> = ({ coin, componentKey }) => {
  const { solPrice } = useContext(UserContext);
  const router = useRouter()

  const handleToProfile = (id: string) => {
    router.push(`/profile/${id}`)
  }
  return (
    <>
      <div className="flex w-[380px] items-center justify-center hover:border-collapse pt-2 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
        <img src={coin?.url} alt="image" className="w-[110px]  px-3" />
        {/* <img src="/bonkz10157.png" alt="" className="w-[110px]  px-3" /> */}
        <div>
          <div className="flex">
            <div>Created by 🐸</div>
            <div onClick={() => handleToProfile((coin?.creator as userInfo)?._id)}>
                <div className="hover:border-slate-300 border-slate-600 border-b-2">
                  {(coin?.creator as userInfo)?.name}
                </div>
            </div>
          </div>
          <div>market cap: {(coin.reserveTwo/coin.reserveOne * (1_000_000_000_000_000 - coin.reserveOne) / 1_000_000_000 * solPrice).toFixed(2)} [badge:👑]</div>
          {/* <div>replies: {coin?.replies}</div> */}
          <div>
            {coin?.name} [ticker: {coin?.ticker}]
          </div>

          {componentKey === "coin" ? (
            coin?.description && <div>{coin?.description}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
