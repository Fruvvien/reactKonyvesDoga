import { API_URL } from "../environments/environment"
import { Ibooks } from "../interface/Ibooks";

export class HttpRequest{
    
    static async getDatas(): Promise<Ibooks[]>{
        const response = await fetch(`${API_URL}/konyvek`);
        return await response.json();
    } 

}