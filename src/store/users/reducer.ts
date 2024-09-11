import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    loggedInUser: null
};

const userReducer = createSlice({
    name: "users",
    initialState,
    reducers:{
        loginUser: (state, action:PayloadAction<any>)=>{
           state.loggedInUser = action.payload;
        },
        logoutUser: (state)=>{
            state.loggedInUser= null;
        }
    }
});



export default userReducer;