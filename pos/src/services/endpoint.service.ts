import { pathConstant } from "@/constants/path.constant";
import axios from "axios";


export const endpoint = axios.create({
    baseURL: pathConstant.base_url_local,
    timeout: 10000,
})