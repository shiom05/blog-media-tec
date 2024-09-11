import { connectToDataBase } from "@/lib/mongodb";
import { NextResponse } from "next/server";


// export async function GET(req: Request) {
//     const { db } = await connectToDataBase();
//     const posts = await db.collection("posts").find({}).populate("").toArray();
//     return NextResponse.json({
//         status: "Success",
//         posts
//     });
// } //migrate to mongoose later

const userStructure = (user:any)=>{
    const { userFirstName , userLastName} = user;
    return `${userFirstName} ${userLastName}`
}

export async function GET(req: Request) {
    const { db } = await connectToDataBase();
    const allPosts = await db.collection("posts").find({}).toArray();
    const allUsers = await db.collection("users").find({}, {userName: 1, userFirstName: 1, userLastName: 1}).toArray();

    const posts = allPosts.map((post: any)=>{
        return{
            ...post,
            user: userStructure(allUsers.find((user:any)=> user.userName === post.userId))
        }
    })

    return NextResponse.json({
        status: "Success",
        posts
    });

}

export async function POST(req: Request){
    const {db} = await connectToDataBase();
    const newPost = await req.json();
    const postInserted = await db.collection("posts").insertOne(newPost);
    return NextResponse.json({
        status: "Success",
        message: "Post saved succesfully",
        postId: postInserted.insertedId,
        post:{
            ...newPost,
            _id: postInserted.insertedId
        }
    })
}