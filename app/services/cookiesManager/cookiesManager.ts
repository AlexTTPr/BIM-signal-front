import { Cookies } from "typescript-cookie";


export default class CookiesManager {
    constructor() {
        
    }

    set(key: string, value: string, force?: boolean): boolean {
        if (Cookies.get(key) == null) {
            if (force) {
                Cookies.set(key, value);
                return true;
            }
            return false;
        }
        return false;
    }

    get(key: string) {
        return Cookies.get(key); 
    }
};