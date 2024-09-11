"use client";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux"
import PostAuthor from "../post-author/PostAuthor";
import PostDate from "../post-date/PostDate";

interface PropsPostDetials{
    postId: string
}

const PostDetails = ({postId}:PropsPostDetials) =>{

    const post = useSelector((state:any) => state.posts.posts.find((post:any)=> post._id === postId));
     console.log(post)
     console.log(postId)
    return (
      <>
        <div className="p-24">
          <Card className="p-5">
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                fontWeight={"bold"}
              >
                {post.title}
              </Typography>
              <Typography variant="h5" component="div">
                {post.content}
              </Typography>
            </CardContent>

            <PostAuthor user={post.user} /> 
            <PostDate  date={post.createDate} />
            
          </Card>

          <Link href={"/posts"}> <Button style={{width: '10%'}}  className="mt-10" variant="contained" >Back</Button></Link>
        
        </div>
      </>
    );

}


export default PostDetails;