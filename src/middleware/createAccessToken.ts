import {v4} from "uuid";
import { AccessTokenModel } from "../Database/AcessTokens";
const myuuid = v4();

console.log("UUID", myuuid);


export async function createTokens(){
    try {
        const tokensList = []
        for(let i = 0; i < 100; i++){
            let token =  v4();
            let plan = 'Daily';
        let createdDate = new Date(); // Current date and time
let expirationDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
            // tokensList.push(token);
            const newTokensForADay = new AccessTokenModel({
                token:token,
                plan:plan,
                createdDate:createdDate,
                expirationDate:expirationDate
            })

            try {
                await newTokensForADay.save()
                console.log("Tokens Genrated");
            } catch (error) {
                console.log(error);
                
            }
            // console.log("Tokens Genrated", tokensList);

        }
    
    } catch (error) {
        console.log(error)
        
    }

}
