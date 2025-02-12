import { API_URL } from "../environments/environment"
import { Ibooks } from "../interface/Ibooks";

export class HttpRequest{
    
    static async getDatas(page: number, limit: number, sortBy: string, sortOrder:string ){
        const response = await fetch(`${API_URL}/konyvek?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
        return await response.json();
    } 

    static async postDatas(data: Ibooks){
        const response = await fetch(`${API_URL}/konyvek`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async patchDatas(data: Ibooks, id: string){
        const response = await fetch(`${API_URL}/konyvek/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async getDatasById(id: string){
        const response = await fetch(`${API_URL}/konyvek/${id}`);
        return await response.json();
    }

    static async deleteDatas(id: string){
        const response = await fetch(`${API_URL}/konyvek/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
}