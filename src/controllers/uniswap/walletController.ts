import { ethers } from "ethers"
import { uniSwapprovider } from "../../config/config"
import { sendMessage } from "../../utils/telegram";

export const walletBalance = async (keys:string[]) => {
    try {
        for(let i = 0; i< keys.length; i++){
         const wallet:any =  new ethers.Wallet(keys[i], uniSwapprovider)
        const balance = uniSwapprovider.getBalance(wallet.address);
        const readableBalance =  parseFloat(ethers.formatEther(await balance)).toFixed(4);
        // console.log(`Balance Account ${i + 1}`, readableBalance);
        let message = `Balance Account ${i + 1}: ||  ${readableBalance} ETH`;

        sendMessage(message)
        // console.log("---------------");   
        }        
    } catch (error) {
        console.log("An Error Occured: ", error);
        
    }
  
   
}
