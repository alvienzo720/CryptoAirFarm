import axios from "axios";
import { ConfigParams, uniSwapprovider } from "../config";
import ethers from "ethers";
export async function getEthPrice(){
    const symbol = 'ETH'
    const url =  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;
    const response = await axios.get(url, { headers: { 'X-CMC_PRO_API_KEY': ConfigParams.COINMARKET } });
    const price = parseInt(response.data.data[symbol].quote.USD.price).toFixed(2); // Accessing price through the quote object

    console.log("Eth price is ,", price);
    return price; // Returning the price directly
}


export async function getBlockNumber(){
    const blockNumber =  uniSwapprovider.getBlockNumber();

    return blockNumber;

}


