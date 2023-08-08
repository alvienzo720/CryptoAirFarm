import express from "express";
import {bot} from "./src/bot/bot"
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
startBot();
app.listen(5000, ()=>{
    console.log("We are Ready to Roll");
})

