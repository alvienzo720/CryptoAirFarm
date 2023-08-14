import { Markup, Telegraf, Context } from "telegraf";
import { ConfigParams, PRIVATE_KEYS, UniswapConfigs, abitrumprovider, uniSwapprovider } from "../config";
import { CreateWallets, walletBalance } from "../controllers";
import { swapTokens } from "../controllers/uniswap/swapTokensUniswap";
import { ethers } from "ethers";
import { swapTokensARB } from "../controllers/abitrum/swapTokensAbitrum";
import {mongoSession} from "../middleware/sessionMiddleware"
import { sendMessage } from "../utils/telegram";
import { verifyToken } from "../middleware/verifyToken";
import {DBConn} from "../config/dbcon";
import {session} from "telegraf"
import { getBlockNumber, getEthPrice } from "../utils/ethPrice";


export interface SessionContex  extends Context {
    session:any

}

const bot =  new Telegraf(ConfigParams.BOT_TOKEN);

bot.use(mongoSession);


const wallet = new ethers.Wallet(UniswapConfigs.privateKey);


bot.start((ctx) => {



//    CreateWallets();
ctx.reply(`Dear Crypto Air Farm Users,

To access and utilize our specialized bot services, we invite you to subscribe to one of our access token plans, available for a day, week, month, or year. Simply visit our website to make your selection.

Please note that payments must be made using either USDC or USDT cryptocurrencies. Once your payment is successful, you will receive immediate access to our bot, empowering you with the tools you need in the crypto farming world.

Your participation and support are vital to our growth, and we sincerely thank you for choosing Crypto Air Farm.

Best regards,
The Crypto Air Farm Team`);
ctx.reply("Please enter the token from the website to continue");

});

bot.on('text', async(ctx)=>{

    const token =  ctx.message.text;
    const isValidToken =  await verifyToken(token);


    if(isValidToken){
        
        ctx.reply('Welcome to Crypto Air Farm! Here is the main menu:', Markup.inlineKeyboard([
        [Markup.button.callback('BUY TOKEN', 'buytokenwithaddress'), Markup.button.callback('SELL TOKEN', 'selltoken')],
        [Markup.button.callback('BUY LIMIT', 'buylimit'), Markup.button.callback('SELL LIMIT', 'selllimit')],
        [Markup.button.callback('MIIROR SNIPER', 'mirrorsniper'), Markup.button.callback('METHOD SNIPER', 'methodsniper')],
        [Markup.button.callback('TOKEN BALANCE', 'tokenbalance'), Markup.button.callback('PNL ANALYSIS', 'pnlanalysis'), Markup.button.callback('SEETINGS', 'settings')],
    ]));
    }else {
        ctx.reply('The token you entered is invalid. Please check your token and try again.')
    }
})



let tokenAddres:string = "";
bot.action('buytokenwithaddress', async(ctx) => {

 let ethPrice = await getEthPrice();
 let blockNumber =  await getBlockNumber();

    let isPrivateTx = false;
    let buttonprivate = isPrivateTx ?  '👁‍🗨 Private Txn: ✅' : '👁‍🗨 Private Txn: 🔴';
    ctx.reply(`🛠 Buy Tokens | Tutorial - Set your buy settings using the menu below, then enter the token address to buy. Using high slippage may result in frontrun or sandwich attacks. To be protected from MEV attacks, use private transactions.
    -Buy Amount: the amt of ETH to spend 
    -Slippage: Definition
⬩Gas:  GWEI ⬩Block: ${blockNumber} ⬩ETH: $${ethPrice}`, Markup.inlineKeyboard([
    [Markup.button.callback('🏘 Main Menu', 'main_menu'), Markup.button.callback('❌ Close', 'exit')],
    [Markup.button.callback(buttonprivate, 'private')],
    [Markup.button.callback('🛡 Fail Guard', 'failguard'), Markup.button.callback('👟 Frontrun', 'frontrun')],
    [Markup.button.callback('SELECT WALLET', 'nothing')],
    [Markup.button.callback('💳 W1', 'wallet1'), Markup.button.callback('💳 W2', 'wallet2'),
     Markup.button.callback('💳 W3', 'wallet3'),  Markup.button.callback('💳 W4', 'wallet4'),
     Markup.button.callback('💳 W5', 'wallet5') ], 
     [Markup.button.callback('BUY AMOUNT', 'nothing')],     
    [Markup.button.callback('0.1 ETH', 'zeropoint11'),
    Markup.button.callback('0.3 ETH', 'zeropoint3'),
    Markup.button.callback('0.5 ETH', 'zeropoint5')],
    [Markup.button.callback('1.0', 'oneeth'), Markup.button.callback('CUSTOM', 'customamount')],
     [Markup.button.callback('SLIPPAGE', 'nothing')],  
    [Markup.button.callback('5%', '5percent'),
    Markup.button.callback('10% ETH', '10percent'),
    Markup.button.callback('20% ETH', '20percent')],
    [Markup.button.callback('Custom', 'customslippage'), Markup.button.callback('Auto', 'autoslipage')],
    ]));
    // ctx.reply("Please enter a Token Contract Address");
});


bot.action('selltoken', (ctx) => {
    let isPrivateTx = true;
    let buttonprivate = isPrivateTx ?  '👁‍🗨 Private Txn: ✅' : '👁‍🗨 Private Txn: 🔴';
    ctx.reply(`🛠 Sell Tokens | Tutorial - Set your sell settings in the menu below and then enter the lines numbers of the tokens you wish to sell. Selling using high slippage can result in being frontrun or sandwiched. Use private transactions to avoid sandwich attacks.
   •Sell Amount: the % of your bag you wish to sell
   •Slippage: Definition
⬩Gas: 26 GWEI ⬩Block: 17870778 ⬩ETH: $1832`, Markup.inlineKeyboard([
    [Markup.button.callback('🏘 Main Menu', 'main_menu'), Markup.button.callback('❌ Close', 'exit')],
    [Markup.button.callback(buttonprivate, 'private')],
    [Markup.button.callback('🛡 Fail Guard', 'failguard'), Markup.button.callback('👟 Frontrun', 'frontrun')],
     [Markup.button.callback('SELL AMOUNT', 'nothing')],     
    [Markup.button.callback('10% ', '10percent'),
    Markup.button.callback('15%', '15percent'),
    Markup.button.callback('25%', '35percent')],
    [Markup.button.callback('50 ', '50percent'),
    Markup.button.callback('75%', '75percent'),
    Markup.button.callback('100%', '100percent')],
    [Markup.button.callback('SELECT TOKEN TO SELL', 'tokentosell')],
    ]));
});

bot.action('main_menu', (ctx) => {
    ctx.reply("Welcome to Crypto Air Farm! Here is the main menu:", Markup.inlineKeyboard([
        [Markup.button.callback('BUY TOKEN', 'buytokenwithaddress'), Markup.button.callback('SELL TOKEN', 'selltoken')],
        [Markup.button.callback('BUY LIMIT', 'buylimit'), Markup.button.callback('SELL LIMIT', 'selllimit')],
        [Markup.button.callback('MIIROR SNIPER', 'mirrorsniper'), Markup.button.callback('METHOD SNIPER', 'methodsniper')],
        [Markup.button.callback('TOKEN BALANCE', 'tokenbalance'), Markup.button.callback('PNL ANALYSIS', 'pnlanalysis'), Markup.button.callback('SEETINGS', 'settings')],
    ]));
});


bot.action('balances', async (ctx) =>{
    try {
        await walletBalance(PRIVATE_KEYS)
    } catch (error) {
        console.log(error);
        
    }
})

let amount = ethers.parseEther('0.000000001');
bot.command('zeropoint1', (ctx)=>{
    amount =  ethers.parseEther('0.0000001');
    ctx.reply('Amount set to 0.1 ETh')
})


bot.action('zeropoint11', async(ctx)=>{

tokenAddres = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

    try {
        await swapTokens(amount,tokenAddres);
    } catch (error) {
        console.error(error);
    }
})


bot.command('exit', async(ctx)=>{
    await ctx.leaveChat();
})



export {bot}
