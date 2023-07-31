import { Telegraf } from "telegraf";
import { ConfigParams } from "../config";

const bot =  new Telegraf(ConfigParams.BOT_TOKEN);


bot.start((ctx) =>{
    ctx.reply("Hello There")
})


export {bot}
