import { Typography } from "@mui/material";

interface PostDateProps{
    date: string
}

const PostDate = (props:PostDateProps)=>{

    const date = new Date(props.date);
    console.log(date);
    console.log(new Date());
  

    return (
    <>
     <Typography sx={{ color: "text.secondary", fontSize: 14}}> ago {date.toDateString()}</Typography>
    </>
    )


}
        

export default PostDate;