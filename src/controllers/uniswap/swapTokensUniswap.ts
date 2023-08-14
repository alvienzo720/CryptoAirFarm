import {ethers} from "ethers";
import { UniswapConfigs, uniSwapprovider} from "../../config";
import { ABI } from "../../config/ABI";
import { sendMessage } from "../../utils/telegram";

 const uniswapRouterAddress = UniswapConfigs.routerAddress;
 

    const uniswapRouterABI = ABI;

    const wallet = new ethers.Wallet(UniswapConfigs.privateKey, uniSwapprovider);

    const my_signer =  wallet.connect(uniSwapprovider);

    const uniswapRouter = new ethers.Contract(uniswapRouterAddress,uniswapRouterABI, my_signer);

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;


export async function swapTokens(
  amountIn:any,
  tokenOut:string
){


//    const my_signer = wallet.connect(provider);
    const tx =  await uniswapRouter.swapExactTokensForTokens(
        amountIn,
        0,
        [UniswapConfigs.WETH, tokenOut], // path of tokens to trade through router contract
        wallet.address,
        deadline
    );

    console.log(`Transaction Hash ${tx.hash}`);
     let message = `Token ETH Swapped Successfully`
        message += `\n Hash: \`${tx.hash}\``
        message += `\n Value: \`${ethers.formatEther(tx.value)}\``
        message += `\n To: \` ${tx.to}\``
        message += `\n Nonce: \`${tx.nonce}\``
         message += `\n View NFT at :https://sepolia.etherscan.io/tx/${tx.hash}`
        sendMessage(message);

    const receipt =  await tx.wait()
    console.log(`${receipt.blockNumber}`);

}
