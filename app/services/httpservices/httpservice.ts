import { Cookies } from "typescript-cookie";
import { ServerConfig } from "../../config/server";
import { Login } from "../../models/shared.models";

export default class HttpService{
    private serverString: string;
    constructor() {
        this.serverString = new ServerConfig().fullServerString();
    }

    commonRequest(){

    }


    async getServerStatus(){
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const token = Cookies.get("token");
        headers.set("Authorization", "Bearer " + token);
        try{
            const response = await fetch(this.serverString + "/api/v1/status", { method: "GET", headers: headers});
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log("Error: ", error);
        }
    }
    
}

/** 
    Class for simple request
*/

export class CommonRequest{
    private serverString: string = new ServerConfig().fullServerString();
    private headers = new Headers();
    private body: any;
    constructor() {
        this.headers.set("Content-Type", "application/json");
    }

    async get(path: string, headers?: any){
        if(headers){
            headers.forEach((item: any) => {
                this.headers.set(item.key, item.value);
            });    
        }
        try{
            const response = await fetch(this.serverString + path, {
                headers: this.headers
            });
            let data = await response.json();
            return data;
        }
        catch(error){
            console.log("Error: " + error);
        }
    }

    /** 
    *   Returns data type Response<T>
    *   
    *   @param {string} path The controller path
    *   @param {any} data The request's body
    *   @param {any} headers The request's headers 
        
    */

    async post(path: string, data: any, headers?: any){
        if(headers){
            headers.forEach((item: any) => {
                this.headers.set(item.key, item.value);
            });   
        }
        let headerS = new Headers();
        headerS.set("Authorization", `Bearer ${Cookies.get("token")}`);
        headerS.set("Content-Type", "application/json");
        if(data){
            this.body = JSON.stringify(data);
        }
        try{
            const response = await fetch(this.serverString + path, {
                headers: headerS,
                body: this.body,
                method: "POST",
            });
            return response.json();
        }
        catch(error){
            console.log("Error: " + error);
        }
    }
}