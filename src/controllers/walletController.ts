import { ethers } from "ethers"
import { PRIVATE_KEYS, provider } from "../config/config"

export const walletBalance = async (keys:string[]) => {
    try {
        for(let i = 0; i< keys.length; i++){
         const wallet =  new ethers.Wallet(keys[i], provider)
        const balance = await wallet.getBalance();
        const readableBalance =  parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
        console.log(`Balance Account ${i + 1}`, readableBalance);
        console.log("---------------");   
        }
        console.log("Keys", PRIVATE_KEYS.length)
        
    } catch (error) {
        console.log("An Error Occured: ", error);
        
    }
  
   
}
