"use client";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "./create-post/CreatePost";
import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Modal, Typography } from "@mui/material";
import Link from "next/link";
import PostAuthor from "./post-author/PostAuthor";
import PostDate from "./post-date/PostDate";
import PostReaction from "./post-reaction/PostReaction";
import { useCallback, useEffect, useState } from "react";
import { syncMyPostsThunk, syncPostsThunk } from "@/store/posts/reducer";
import Post from "./post/Post";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Posts = ()=>{
    const {loggedInUser} = useSelector((state: any)=> state.users)
    const [open, setOpen] = useState<boolean>(true);
    const { posts, isPostsLoading, isLoadingError} = useSelector((state:any)=> state.posts);
    const dispatch = useDispatch()

    const handleClose = () => setOpen(false);

    const handleOpen = () => {
      return (
        <>
          {open ? (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Error
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Alert severity="error">Error on loading Posts.</Alert>
                </Typography>
              </Box>
            </Modal>
          ) : (
            <Alert severity="error">Error Loading Posts</Alert>
          )}
        </>
      );
    };


    useEffect(()=>{

    },[])
   
    return (
      <>
        <div className="p-12">
          <Typography variant="h4" fontWeight={"bold"}>
            All Posts
          </Typography>

         <div className="pt-10">
          {isPostsLoading? <p>{isLoadingError?  handleOpen() : "Loading........."}</p> :
            <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row",  gap: '40px', paddingTop: '20px'}}>
                {posts.map((post:any)=>(
                  <Post _id={post._id} createDate={post.createDate} content={post.content} title={""} userId={post.userId} user={post.user} ></Post>
                ))}
            </Box>
          }
          </div>
         
        </div>
      </>
    );


}


export default Posts;