import { Typography } from "@mui/material";
import { useSelector } from "react-redux"

interface PostAuthorProps{
    user:string
}
const PostAuthor = (props: PostAuthorProps)=>{
    return(
        <>
        <Typography sx={{ color: "text.secondary", fontSize: 14}}>by {props.user}</Typography>
        </>
    )

}

export default PostAuthor;