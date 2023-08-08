import { ethers } from "ethers";

export async function CreateWallets() {
for(let i = 0; i < 10; i++){
    const randomWallet = ethers.Wallet.createRandom()
    // let mnemonic = randomWallet.mnemonic.phrase;
    let mnemonic:any = randomWallet.mnemonic?.phrase;
    console.log("Wallet " + (i + 1));
    console.log("Memonic Phrase: ", mnemonic);

    let walletFromMnmonic =  ethers.Wallet.fromPhrase(mnemonic);
    console.log("Address: ", walletFromMnmonic.address);
    console.log("PrivateKey: ", walletFromMnmonic.privateKey);
    console.log("--------------------");

}

    
}




