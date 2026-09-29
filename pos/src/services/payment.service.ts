import { Payments } from "@/models/payment.model";
import { endpoint } from "./endpoint.service";
import { pathConstant } from "@/constants/path.constant";

export function createPayment(data: Payments) {
    return endpoint.post<Payments>(pathConstant.payment, data)
}