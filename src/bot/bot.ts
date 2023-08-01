import { Markup, Telegraf } from "telegraf";
import { ConfigParams, PRIVATE_KEYS, UniswapConfigs, provider, wallet } from "../config";
import { walletBalance } from "../controllers";
import { swapTokens } from "../controllers/swapTokens";
import { ethers } from "ethers";

const bot =  new Telegraf(ConfigParams.BOT_TOKEN);

bot.start((ctx) => {
   ctx.reply("Select a Network to Use", Markup.inlineKeyboard([
    [Markup.button.callback('Accounts Balances', 'balances')],
      [Markup.button.callback('Ethereum', 'ethereum')],
        [Markup.button.callback('Abitrum', 'abitrum')],
        [Markup.button.callback('Optimism', 'optimism')],
        [Markup.button.callback('Polygon', 'polygon')]
    ]));
});

bot.action('ethereum', (ctx) => {
    ctx.reply("You chose Ethereum! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap ETH for UNI', 'ethtouni')],
        [Markup.button.callback('Swap ETH to ABR', 'unitoeth')],
        [Markup.button.callback('Swap ETH to WLD', 'unitoeth')],
        [Markup.button.callback('Swap ETH to FIL', 'unitoeth')],
        [Markup.button.callback('Swap ETH to BNB', 'unitoeth')]
    ]));
});

bot.action('abitrum', (ctx) => {
    ctx.reply("You chose Abitrum! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap ABR for UNI', 'ethtouni')],
        [Markup.button.callback('Swap ARB to ETH', 'unitoeth')],
        [Markup.button.callback('Swap ARB to WLD', 'unitoeth')],
        [Markup.button.callback('Swap ARB to FIL', 'unitoeth')],
        [Markup.button.callback('Swap ARB to BNB', 'unitoeth')]
    ]));
});

bot.action('optimism', (ctx) => {
    ctx.reply("You chose Optimism! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap OP for UNI', 'ethtouni')],
        [Markup.button.callback('Swap OP to ETH', 'unitoeth')],
        [Markup.button.callback('Swap OP to WLD', 'unitoeth')],
        [Markup.button.callback('Swap Op to FIL', 'unitoeth')],
        [Markup.button.callback('Swap OP to BNB', 'unitoeth')]
    ]));
});

bot.action('polygon', (ctx) => {
    ctx.reply("You chose Polygon! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap MAT for UNI', 'ethtouni')],
        [Markup.button.callback('Swap MAT to ETH', 'unitoeth')],
        [Markup.button.callback('Swap MAT to WLD', 'unitoeth')],
        [Markup.button.callback('Swap MAT to FIL', 'unitoeth')],
        [Markup.button.callback('Swap MAT to BNB', 'unitoeth')]
    ]));
});

bot.action('balances', async (ctx) =>{
    try {
        await walletBalance(PRIVATE_KEYS)
    } catch (error) {
        console.log(error);
        
    }
})

bot.action('ethtouni', async(ctx) => {
    try {
         const wallet = new ethers.Wallet(UniswapConfigs.privateKey, provider);
        await swapTokens(provider, wallet,UniswapConfigs.tokenIn, UniswapConfigs.tokenOut,ethers.utils.parseEther('0.000001'));
    } catch (error) {
        console.log(error)
        
    }
})

export {bot}
