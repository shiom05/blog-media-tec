"use client";
import { loginUserSerive } from "@/services/user.service";
import { syncMyPostsThunk, syncPostsThunk } from "@/store/posts/reducer";
import { loginUser } from "@/store/users/actions";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";


const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [form, setForm] = useState<{user:string, password:string}>({
        user: "",
        password:""
    });

    const [loginAtemptStatus,setLoginAttemptStatus] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false)

    const canLogin =  Boolean(form.user) && Boolean(form.password);

    const alertContent = (status:boolean)=>{
       const content = status? <Alert severity="success">Succesfully Logged IN</Alert> : <Alert severity="error">Invalid User Name or Password</Alert>;
       return content;
    }


    const loginHandler = ()=>{
        loginUserSerive(form).then(
            (response: any)=>{
                setLoginAttemptStatus(true);
                if(response.data.status === "SUCCESS"){
                    setStatus(true);
                    dispatch(loginUser(response.data.user));
                    dispatch(syncPostsThunk());
                    dispatch(syncMyPostsThunk(response.data.user.userName))
                    setTimeout(()=>{
                        navigate.push('/posts');
                    },2000)
                }else{
                    setStatus(false);
                }
            }
        ).catch(error=> console.error(error))
    }

    return (
      <div className="p-24"> 
            <Typography variant="h4" fontWeight={"bold"}>Login</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" , flexDirection: "column", width: '60%'}}>
                <FormControl fullWidth sx={{ m: 1 , width: '55ch'}} required className="pt-2">
                    <label className="pb-3">User Name / Email</label>
                    <TextField
                    id="outlined-basic"
                    label="Enter Username or Email"
                    variant="outlined"
                    name="usernameemail"
                    value={form.user}
                    onChange={(e)=>{setForm( (user:any) => {return {
                        ...user,
                        user: e.target.value
                    }})}}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 , width: '55ch'}}  required className="pt-5">
                    <label className="pb-3">Password</label>
                    <TextField
                    id="outlined-basic"
                    type="password"
                    label="Enter Password" 
                    value={form.password}
                    variant="outlined"
                    onChange={(e)=>{setForm((user:any)=> {return {...user, password : e.target.value}})}}
                    />
                </FormControl>

                
                <FormControl fullWidth sx={{ m: 1 }}  required className="pt-5">
                    <Button 
                        disabled={!(canLogin)}  
                        style={{width: '15%'}} variant="contained"
                        onClick={loginHandler}
                    >Login</Button>
                </FormControl>

                {loginAtemptStatus && alertContent(status) }
                
            </Box>
        </div>

    
    )
}

export default Login;