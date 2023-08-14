import express from "express";
import {bot} from "./src/bot/bot";
import {DBConn} from "./src/config/dbcon";
import {createTokens} from "./src/middleware/createAccessToken"
import { swapTokens } from "./src/controllers";
import {getEthPrice} from "./src/utils/ethPrice"
import {ethers} from "ethers"
const app = express();

// walletBalance(PRIVATE_KEYS)
const startBot = async () => {
    console.log(`---`.repeat(10))
    console.log(`starting bot  🤖 `)
    console.log(`---`.repeat(10))
    bot.launch().then(() => { }).catch((error) => {
        console.log(error)
    })
    
}
let amount = ethers.parseEther('0.000000001');
// createTokens();// 
getEthPrice(); 
DBConn
startBot();
app.listen(5000, ()=>{
    console.log("We are Ready to Roll");
})

