import "dotenv/config";
import { ethers } from "ethers";

export const ConfigParams = {
    INFURA_PROJECT_URL:process.env.INFURA_PROJECT_URL || "",
    BOT_TOKEN:process.env.BOT_TOKEN || "",
    WHITELISTED_USERS:[541365365],
    TELEGRAM_DELETE_MESSAGE_INTERVAL:process.env.TELEGRAM_DELETE_MESSAGE_INTERVAL
}

export const PRIVATE_KEYS = process.env.PRIVATE_KEYS?.split(',').filter(Boolean) || [];



export const provider = new ethers.providers.JsonRpcProvider(ConfigParams.INFURA_PROJECT_URL);


export const UniswapConfigs = {
    WETH:process.env.WETH,
    UNI:process.env.UNI,
    WLD:process.env.WLD,
    FIL:process.env.FIL,
    BNB:process.env.BNB,
    privateKey: 'db50acc44a9eee0a59abf844f18703eb1c5784f8a2606f4d73ba622fab7024b6',
    routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
}

export const wallet =  new ethers.Wallet(UniswapConfigs.privateKey);
