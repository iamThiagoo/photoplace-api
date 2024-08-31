import { extname } from "path";

export const generateRandomFileName = (fieldname: string, originalname : string) : string => {
    const randomSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${fieldname}-${randomSuffix}-${extname(originalname)}`;
}