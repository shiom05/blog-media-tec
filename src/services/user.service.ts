import {api} from "@/services/api.service";


export const loginUserSerive = (user:any)=>{
    return api.post("/user",user)
}