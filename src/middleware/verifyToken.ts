import { AccessTokenModel } from "../Database/AcessTokens";
import { sendMessage } from "../utils/telegram";

export async function verifyToken(token_to_check: string): Promise<boolean> {
    try {
        const verifiedToken = await AccessTokenModel.findOne({ token: token_to_check });

        if (verifiedToken) {
            let createdDate = new Date(); // Current date and time
            let expirationDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

            // TODO: You may want to check if the token is expired based on some field in verifiedToken

            console.log("Verified and you can use the bot now for 24 hours");
            let message = `Welcome user, you have access until ${expirationDate}`;
            sendMessage(message);
            return true; // Token is verified
        } else {
            console.log("Token not found in the database");
            return false; // Token is not verified
        }
    } catch (error) {
        console.log("Token verification failed:", error);
        return false; // Token is not verified
    }
}
