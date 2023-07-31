import express from "express";
import {ethers} from "ethers";
import {walletBalance} from "./src/controllers/walletController"
import { PRIVATE_KEYS } from "./src/config/config";
const app = express();

walletBalance(PRIVATE_KEYS)

app.listen(5000, ()=>{
    console.log("We are Ready to Roll");
})
