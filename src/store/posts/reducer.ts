import { getMyPosts, getPosts, savePost } from "@/services/post.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reaction{
    likes: number,
    hearts: number
}

interface Post{
  _id: string,
  createDate: string,
  content: string,
  title: string,
  userId: string,
  user?: string
}

interface rootPostState{
  isPostsLoading: boolean,
  isLoadingError:boolean,
  posts: Post[],
  myposts: Post[],
}

const initialState:rootPostState = {
  isPostsLoading: true,
  isLoadingError: false,
  posts: [],
  myposts: []
}

export const  syncMyPostsThunk:any = createAsyncThunk(
  'posts/fetchMyPosts',
  async(user:string)=>{
    const response = await getMyPosts(user);
    return response.data.posts;
  }
)

export const syncPostsThunk:any = createAsyncThunk(
  '/posts/fetchPosts',
  async()=>{
    const response = await getPosts();
    return response.data.posts;
  }
)

// export const saveNewPostThunk: any = createAsyncThunk(
//   '/posts/savePost',
//   async(post:Post)=>{
//      const response = await savePost(post);
//      return response.data.post;
//   }
// )

const postReducer = createSlice({
    name:"posts",
    initialState,
    reducers:{
           addPost:(state, action: PayloadAction<Post>)=>{
               state.myposts.push(action.payload);
               state.posts.push(action.payload)
           },
           editPost: (state, action:PayloadAction<Post>) =>{
            const {_id, title, content} = action.payload
            const existingPost = state.posts.find((post)=> post._id === _id);
              if(existingPost){
                existingPost.title = title;
                existingPost.content = content
              }
           }
    },
    extraReducers:(builder)=>{
      builder
      .addCase(syncPostsThunk.pending, (state)=>{state.isPostsLoading = true})
      .addCase(syncPostsThunk.fulfilled, (state, action)=>{
        state.isPostsLoading = false;
        state.posts = action.payload;
      })
      .addCase(syncPostsThunk.rejected, (state)=>{
         state.isLoadingError = true;
      })
      .addCase(syncMyPostsThunk.fulfilled, (state, action)=>{
         state.myposts = action.payload;
      })
      // .addCase(saveNewPostThunk.fulfilled, (state, action)=>{
      //   state.myposts.push(action.payload);
      //   state.posts.push(action.payload);
      // })
    }
})
 

export default postReducer;