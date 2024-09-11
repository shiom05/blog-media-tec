"use client";

import { savePost } from "@/services/post.service";
import { addPost } from "@/store/posts/actions";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = ()=>{
    const dispath = useDispatch()
    const [title, setTitle]= useState<string>("");
    const [content, setContent]= useState<string>("");

    const {loggedInUser} = useSelector((state: any)=> state.users);

    const submitPost = ()=>{
        if(canSave){
            const post = {title,  content, createDate: new Date().toISOString(), _id: `post-${nanoid()}`, userId: loggedInUser.userName}
            savePost(post).then((response:any)=> {
              if(response.data.status === "Success"){
                console.log(response)
                dispath(addPost(response.data.post));
              }
            }).catch((error)=>{console.error(error)})
          
            setTitle(""),
            setContent("");
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(loggedInUser)

    return (
      <>
        <Typography variant="h6" fontWeight={"bold"}>
          Create Post
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap" , flexDirection: "column", width: '60%'}}>
          <FormControl fullWidth sx={{ m: 1 , width: '55ch'}} required className="pt-2">
            <label className="pb-3">Post Title</label>
            <TextField
              id="outlined-basic"
              label="Enter Title"
              variant="outlined"
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}  required className="pt-5">
            <label className="pb-3">Post Content</label>
            <TextField
              id="outlined-basic"
              label="Enter Content" 
              value={content}
              variant="outlined"
              multiline
              rows={4}
              onChange={(e)=>{setContent(e.target.value)}}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}  required className="pt-5">
             <Button 
                disabled={!(canSave)}  
                style={{width: '15%'}} variant="contained"
                onClick={submitPost}
             >Post</Button>
          </FormControl>
        
        </Box>
      </>
    );


}

export default CreatePost;