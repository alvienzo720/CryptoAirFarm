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
    tokenIn: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    tokenOut: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    privateKey: 'db50acc44a9eee0a59abf844f18703eb1c5784f8a2606f4d73ba622fab7024b6',
    routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
}

export const wallet =  new ethers.Wallet(UniswapConfigs.privateKey);
