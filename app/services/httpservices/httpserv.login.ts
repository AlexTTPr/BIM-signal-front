import { Login, LoginFields, RegistrationFields } from "../../models/shared.models";
import { ServerConfig } from "../../config/server";
import Password from "antd/es/input/Password";
import https from "https";



export default class HttpServiceLogin {
    private serverString: string;
    private headers;
    constructor() {
        this.serverString = new ServerConfig().fullServerString();
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
    }

    async Login(obj: LoginFields) {
        const raw = JSON.stringify({username: obj.username, password: obj.password});
        try {
            const response = await fetch(this.serverString + "/api/v1/user/login", 
            {   
                body: raw, 
                headers: this.headers, method: "POST", 
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Error: " + error);
        }
    }

    async RefreshToken(){

    }

    async Registrate(values: RegistrationFields){
        console.log(values);
        try{
            const response = await fetch(this.serverString + "/api/v1/user/register",
            {
                body: JSON.stringify({
                    username: values.login,
                    email: values.email,
                    password: values.password
                }),
                headers: this.headers,
                method: "POST"
            });
            const data = await response.json();
            return data;
        }
        catch(error){
            console.error("Error: " + error);
        }
    }
}


