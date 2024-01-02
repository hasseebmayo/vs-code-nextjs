import { mongoDBConnection } from "@/dbConfig/DbConfig";
import { UserModel } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

mongoDBConnection();

export async function POST(req: Request) {
  try {
    const { userName } = await req.json();
    const isExiest = await UserModel.findOne({
      userName,
    });
    if (isExiest) {
      return Response.json(
        {
          message: "Username already exiest.",
        },
        {
          status: 400,
        }
      );
    }
    const newUser = new UserModel({ userName });
    const savedUser = await newUser.save();
    if (savedUser) {
      const token = jwt.sign(savedUser._id, process.env.TOKEN_SECRET!);
      const response = NextResponse.json({
        message: "Signed up Successfully!l",
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    }
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      {
        status: 404,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
