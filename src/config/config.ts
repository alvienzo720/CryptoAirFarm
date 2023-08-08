import "dotenv/config";
import {ethers} from "ethers";

export const ConfigParams = {
    INFURA_PROJECT_URL:process.env.INFURA_PROJECT_URL || "",
    POLYGON_MUMBAI_URL:process.env.POLYGON_MUMBAI_URL || "",
    OPTIMISM_URL:process.env.OPTIMISM_URL || "",
    ABITRUM_URL:process.env.ABITRUM_URL || "",
    BOT_TOKEN:process.env.BOT_TOKEN || "",
    WHITELISTED_USERS:[541365365],
    TELEGRAM_DELETE_MESSAGE_INTERVAL:process.env.TELEGRAM_DELETE_MESSAGE_INTERVAL,

}

export const PRIVATE_KEYS:any = process.env.PRIVATE_KEYS?.split(',').filter(Boolean) || [];



export const uniSwapprovider:any = new ethers.JsonRpcProvider(ConfigParams.INFURA_PROJECT_URL);
export const polygonprovider =  new ethers.JsonRpcProvider(ConfigParams.POLYGON_MUMBAI_URL);
export const abitrumprovider = new ethers.JsonRpcProvider(ConfigParams.ABITRUM_URL);
export const optimismprovier = new ethers.JsonRpcProvider(ConfigParams.OPTIMISM_URL);


export const UniswapConfigs = {
    WETH:process.env.WETH,
    UNI:process.env.UNI,
    WLD:process.env.WLD,
    FIL:process.env.FIL,
    BNB:process.env.BNB,
    privateKey: String(process.env.PRIVATE_KEY),
    routerAddress: String(process.env.ROUTER_ADDRESS),
}

