import { connectToDataBase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { user: string } }) {
  const user = route.params.user;
  const { db } = await connectToDataBase();
  const posts = await db.collection("posts").find({ userId: user }).toArray();
  const userObj = await db.collection("users").findOne({ userName: user });
  return NextResponse.json({
    status: "SUCCESS",
    posts: posts.map((post: any) => {
      return {
        ...post,
        user: `${userObj.userFirstName} ${userObj.userLastName}`,
      };
    }),
  });
}
