import { pathConstant } from "@/constants/path.constant";
import { endpoint } from "./endpoint.service";
import { Users } from "@/models/user.model";

export function login(data: { email: string, password: string }) {
    return endpoint.post<{ access_token: string }>(pathConstant.auth + '/login', data)
}

export function userFindMe(jwt: string) {
    return endpoint.post<Users>(pathConstant.auth + '/findme', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
    })
}

export async function validateJwtAndFindMe(jwt: string): Promise<any> {
    try {
        const result = await userFindMe(jwt)
        return result.data
    } catch (error) {
        console.log(error);
        window.location.href = '/login'
    }
}