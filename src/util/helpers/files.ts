import { extname } from "path";

export const generateRandomFileName = (fieldname: string, originalname : string) : string => {
    const randomSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${fieldname}-${randomSuffix}-${extname(originalname)}`;
}

export const generateHashByString = async(myString : string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(myString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}