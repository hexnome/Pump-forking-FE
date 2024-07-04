import axios, { AxiosRequestConfig } from 'axios'
import { ChartTable, coinInfo, msgInfo, replyInfo, userInfo } from './types';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
};

const config: AxiosRequestConfig = {
    headers,
};

export const test = async () => {
    const res = await fetch(`${BACKEND_URL}`);
    const data = await res.json();
    console.log(data)
}
export const getUser = async ({ id }: { id: string }): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/${id}`, config)
        console.log("response:", response.data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}
export const updateUser = async (id: string, data: userInfo): Promise<any>=>{
    try {
        console.log(`${BACKEND_URL}/user/update/${id}`)
        const response = await axios.post(`${BACKEND_URL}/user/update/${id}`, data, config)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/`, data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}


export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/confirm`, data, config)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const createNewCoin = async (data: coinInfo) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/coin/`, data, config)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getCoinsInfo = async (): Promise<coinInfo[]> => {
    const res = await axios.get(`${BACKEND_URL}/coin`, config);
    return res.data
}
export const getCoinsInfoBy = async (id: string): Promise<coinInfo[]> => {

    const res = await axios.get<coinInfo[]>(`${BACKEND_URL}/coin/user/${id}`, config);
    return res.data
}
export const getCoinInfo = async (data: string): Promise<any> => {
    try {
        console.log("coinINfo", data)
        const response = await axios.get(`${BACKEND_URL}/coin/${data}`, config)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getUserInfo = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/${data}`, config)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getMessageByCoin = async (data: string): Promise<msgInfo[]> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/feedback/coin/${data}`, config)
        console.log("messages:", response.data)
        return response.data
    } catch (err) {
        return [];
    }
}


export const getCoinTrade = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cointrade/${data}`, config)
        console.log("trade response::", response)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const postReply = async (data: replyInfo) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/feedback/`, data, config)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

// ===========================Functions=====================================
const JWT = process.env.NEXT_PUBLIC_PINATA_PRIVATE_KEY;

export const pinFileToIPFS = async (blob: File) => {
    try {
        const data = new FormData();
        data.append("file", blob);
        const res = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
                body: data,
            }
        );
        const resData = await res.json();
        return resData;
    } catch (error) {
        console.log(error);
    }
};
export const uploadImage = async (url: string) => {
    const res = await fetch(url);
    console.log(res.blob);
    const blob = await res.blob();

    const imageFile = new File([blob], "image.png", { type: "image/png" });
    console.log(imageFile);
    const resData = await pinFileToIPFS(imageFile);
    console.log(resData, "RESDATA>>>>");
    if (resData) {
        return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
    } else {
        return false;
    }
    
};

export const getSolPriceInUSD = async () => {
    try {
      // Fetch the price data from CoinGecko
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const solPriceInUSD = response.data.solana.usd;
      return solPriceInUSD;
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      throw error;
    }
  }