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
