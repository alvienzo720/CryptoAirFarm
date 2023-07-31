import "dotenv/config";
import { ethers } from "ethers";

export const ConfigParams = {
    INFURA_PROJECT_URL:process.env.INFURA_PROJECT_URL || "",
}

export const PRIVATE_KEYS = process.env.PRIVATE_KEYS?.split(',').filter(Boolean) || [];



export const provider = new ethers.providers.JsonRpcProvider(ConfigParams.INFURA_PROJECT_URL);
