import { connectToDataBase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userData = await req.json();
  const { db } = await connectToDataBase();
  // const user = await db.collection("user").findOne({$or: [{userName: userData.user}, {userEmail: userData.user}]});
  const user = await db
    .collection("users")
    .findOne({
      $and: [
        { $or: [{ userName: userData.user }, { userEmail: userData.user }] },
        { userPassword: userData.password },
      ],
    },{
        userPassword: 0,
        _id: 0
    });

  if (!user) {
    return NextResponse.json({
      status: "FAIL",
      message: "Invalid User Name or Password",
    });
  } else {
    return NextResponse.json({
      status: "SUCCESS",
      message: "Successfully Logged In",
      user,
    });
  }
}
