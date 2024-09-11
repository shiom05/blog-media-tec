import { api } from "./api.service"

export const savePost = (post:any)=>{
    return api.post("/posts",post)
}

export const getPosts = ()=>{
    return api.get("/posts")
}

export const getMyPosts = (userId:string) =>{
    return api.get(`/posts/${userId}`);
}