import { ethers } from "ethers";
import { sendMessage } from "../../utils/telegram";

export async function CreateWallets() {
for(let i = 0; i < 5; i++){
    const randomWallet = ethers.Wallet.createRandom()
    // let mnemonic = randomWallet.mnemonic.phrase;
    let mnemonic:any = randomWallet.mnemonic?.phrase;
    console.log("Wallet " + (i + 1));
    console.log("Memonic Phrase: ", mnemonic);

    let walletFromMnmonic =  ethers.Wallet.fromPhrase(mnemonic);
    let message = `Wallet ${i + 1}`;
    message += `\n Address :\`${walletFromMnmonic.address}\``;
    message += `\n PrivateKey :\`${walletFromMnmonic.privateKey}\``
    message += `\n Memonic Phrase : \`${mnemonic}\``
    sendMessage(message);


    // console.log("Address: ", walletFromMnmonic.address);
    // console.log("PrivateKey: ", walletFromMnmonic.privateKey);
    // console.log("--------------------");

}

    
}




