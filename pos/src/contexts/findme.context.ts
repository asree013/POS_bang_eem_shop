import { Users } from "@/models/user.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TFindMeContrxt = {
    findMe: Users
    setFindMe: Dispatch<SetStateAction<Users>>
}

export const FindMeContext = createContext<TFindMeContrxt>({} as TFindMeContrxt)