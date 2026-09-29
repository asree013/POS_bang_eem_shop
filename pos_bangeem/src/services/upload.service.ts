import { pathConstant } from "@/constants/path.constant"
import { endpoint } from "./endpoint.service"

export function uploadImageService(file: FormData) {
    return endpoint.post(pathConstant.upload, file, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    })
}