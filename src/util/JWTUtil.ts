import {verify} from "jsonwebtoken";
import DataStoredInToken from "../authentication/DataStoresInToken";
import {jwtConfig} from "../config/config";

export function verifyToken(token : string) : object | string {
    return verify(token, jwtConfig.secret);
}

export function getDataStoredInToken(data: any) : DataStoredInToken {
    let returnData : DataStoredInToken = {
        id: data.id
    }
    return returnData;
}

