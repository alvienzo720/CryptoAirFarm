import { Context } from "telegraf";

export interface SessionContex extends Context{
    session:{
        isAuthenticated: boolean;
        [key:string]:any;
    }
}
export async function isAuthenticated(ctx:SessionContex, next: ()=> Promise<void>):Promise<void> {
    if(ctx.session && ctx.session.isAuthenticated){
        return next();

    }else {
        ctx.reply('Please authenticate first');
    }
}
