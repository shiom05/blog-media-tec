"use client";
import Post from "@/components/posts/post/Post";
import Posts from "@/components/posts/Posts";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";


const MyPostsPage = ()=>{
    const posts = useSelector((state :any)=> state.posts.myposts);
    return(
        <div className="p-12">
        <Typography variant="h4" fontWeight={"bold"}>
          My Posts 
        </Typography>

       <div className="pt-10">
       
          <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row",  gap: '40px', paddingTop: '20px'}}>
              {posts.map((post:any)=>(
                <Post {...post} ></Post>
              ))}
          </Box>
        
        </div>
       
      </div>
    )
}


export default MyPostsPage;