import { Prompays } from "@/models/prompay.model";
import { endpoint } from "./endpoint.service";
import { pathConstant } from "@/constants/path.constant";

export function createPromPay(data: Prompays) {
    return endpoint.post<Prompays>(pathConstant.prompay, data)
}

export function findPrompayAll(page: number, limit: number){
    return endpoint.get<Prompays[]>(pathConstant.prompay+ `?page=${page}&limit=${limit}`)
}
export function findPrompayById(prompay_id: string){
    return endpoint.get<Prompays>(pathConstant.prompay+ `/${prompay_id}`)
}