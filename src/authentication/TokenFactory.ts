import {jwtConfig} from "../config/config";
import User from "../models/User";
import DataStoredInToken from "./DataStoresInToken";
import TokenData from "./TokenData";
import {sign} from "jsonwebtoken"

export default function generateToken(user : User) : TokenData {
    const expiresIn = 60 * 60;
    const secret : string = jwtConfig.secret;

    const dataStoredInToken : DataStoredInToken = {
        id: user.id ?? "undefined-id", 
    };

    const tokenData : TokenData = {
        token: sign(dataStoredInToken, secret, { expiresIn }),
        expiresIn: expiresIn
    }

    return tokenData;
}
