import {ethers} from "ethers";
import { UniswapConfigs,  abitrumprovider,  wallet} from "../../config";
import { ABI } from "../../config/ABI";
import { sendMessage } from "../../utils/telegram";

 const uniswapRouterAddress = UniswapConfigs.routerAddress;

    const uniswapRouterABI = ABI;

    const my_signer =  wallet.connect(abitrumprovider);

    const uniswapRouter = new ethers.Contract(uniswapRouterAddress,uniswapRouterABI, my_signer);

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;


export async function swapTokens(
    provider:any,
    wallet: any,
    tokenIn:any,
    tokenOut:any,
    amountIn:any

){


//    const my_signer = wallet.connect(provider);
    const tx =  await uniswapRouter.swapExactTokensForTokens(
        amountIn,
        0,
        [tokenIn, tokenOut], // path of tokens to trade through router contract
        wallet.address,
        deadline
    );

    console.log(`Transaction Hash ${tx.hash}`);
     let message = `Token ETH Swapped Successfully`
        message += `\n Hash: \`${tx.hash}\``
        message += `\n Value: \`${ethers.utils.formatEther(tx.value)}\``
        message += `\n To: \` ${tx.to}\``
        message += `\n Nonce: \`${tx.nonce}\``
         message += `\n View NFT at :https://arbiscan.io/tx/${tx.hash}`
        sendMessage(message);

    const receipt =  await tx.wait()
    console.log(`${receipt.blockNumber}`);

}
