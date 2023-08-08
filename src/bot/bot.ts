import { Markup, Telegraf } from "telegraf";
import { ConfigParams, PRIVATE_KEYS, UniswapConfigs, abitrumprovider, uniSwapprovider } from "../config";
import { CreateWallets, walletBalance } from "../controllers";
import { swapTokens } from "../controllers/uniswap/swapTokensUniswap";
import { ethers } from "ethers";
import { swapTokensARB } from "../controllers/abitrum/swapTokensAbitrum";

const bot =  new Telegraf(ConfigParams.BOT_TOKEN);

const wallet = new ethers.Wallet(UniswapConfigs.privateKey);

bot.start((ctx) => {
//    CreateWallets();
   ctx.reply("MAIN MENU", Markup.inlineKeyboard([
    [Markup.button.callback('BUY TOKEN', 'buytoken'), Markup.button.callback('SELL TOKEN', 'selltoken')],
    [Markup.button.callback('BUY LIMIT', 'buylimit'), Markup.button.callback('SELL LIMIT', 'selllimit')],
    [Markup.button.callback('MIIROR SNIPER', 'mirrorsniper'), Markup.button.callback('METHOD SNIPER', 'methodsniper')],
    [Markup.button.callback('TOKEN BALANCE', 'tokenbalance'), Markup.button.callback('PNL ANALYSIS', 'pnlanalysis'), Markup.button.callback('SEETINGS', 'settings')],
]
));
});

bot.action('buytoken', (ctx) => {
    let isPrivateTx = true;
    let buttonprivate = isPrivateTx ?  '👁‍🗨 Private Txn: ✅' : '👁‍🗨 Private Txn: 🔴';
    ctx.reply(`🛠 Buy Tokens | Tutorial - Set your buy settings using the menu below, then enter the token address to buy. Using high slippage may result in frontrun or sandwich attacks. To be protected from MEV attacks, use private transactions.
    -Buy Amount: the amt of ETH to spend 
    -Slippage: Definition
⬩Gas: 24 GWEI ⬩Block: 17870583 ⬩ETH: $1833`, Markup.inlineKeyboard([
    [Markup.button.callback('🏘 Main Menu', 'main_menu'), Markup.button.callback('❌ Close', 'exit')],
    [Markup.button.callback(buttonprivate, 'private')],
    [Markup.button.callback('🛡 Fail Guard', 'failguard'), Markup.button.callback('👟 Frontrun', 'frontrun')],
    [Markup.button.callback('SELECT WALLET', 'nothing')],
    [Markup.button.callback('💳 W1', 'wallet1'), Markup.button.callback('💳 W2', 'wallet2'),
     Markup.button.callback('💳 W3', 'wallet3'),  Markup.button.callback('💳 W4', 'wallet4'),
     Markup.button.callback('💳 W5', 'wallet5') ], 
     [Markup.button.callback('BUY AMOUNT', 'nothing')],     
    [Markup.button.callback('0.1 ETH', 'zeropoint1'),
    Markup.button.callback('0.3 ETH', 'zeropoint3'),
    Markup.button.callback('0.5 ETH', 'zeropoint5')],
    [Markup.button.callback('1.0', 'oneeth'), Markup.button.callback('CUSTOM', 'customamount')],
     [Markup.button.callback('SLIPPAGE', 'nothing')],  
    [Markup.button.callback('5%', '5percent'),
    Markup.button.callback('10% ETH', '10percent'),
    Markup.button.callback('20% ETH', '20percent')],
    [Markup.button.callback('Custom', 'customslippage'), Markup.button.callback('Auto', 'autoslipage')],
    ]));
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
    ctx.reply("MAIN MENU", Markup.inlineKeyboard([
        [Markup.button.callback('BUY TOKEN', 'buytoken'), Markup.button.callback('SELL TOKEN', 'selltoken')],
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

bot.action('wethtouni', async(ctx) => {
    try {
        await swapTokens(uniSwapprovider, wallet,UniswapConfigs.WETH, UniswapConfigs.UNI,ethers.parseEther('0.000001'));
    } catch (error) {
        console.log(error)
        
    }
})


bot.action('wethtowld', async(ctc)=>{
    try {
        await swapTokens(uniSwapprovider, wallet, UniswapConfigs.WETH, UniswapConfigs.WLD, ethers.parseEther('0.000001'));
    } catch (error) {
        console.error(error);
        
    }
})

bot.action('wethtofil', async(ctx)=>{
    try {
        await swapTokens(uniSwapprovider, wallet, UniswapConfigs.WETH, UniswapConfigs.FIL, ethers.parseEther('0.000001'));
    } catch (error) {
        console.error(error);
    }
})

bot.action('wethtobnb', async(ctx)=>{
    try {
        await swapTokens(uniSwapprovider, wallet, UniswapConfigs.WETH, UniswapConfigs.BNB, ethers.parseEther('0.000001'));
    } catch (error) {
        console.error(error);
        
    }
})

bot.action('arbtouni', async(ctx)=>{
    try {
        await swapTokensARB(abitrumprovider, wallet, UniswapConfigs.WETH, UniswapConfigs.UNI, ethers.parseEther('0.000001'));
    } catch (error) {
        console.error(error);
    }
})
export {bot}
