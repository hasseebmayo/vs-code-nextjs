import { mongoDBConnection } from "@/dbConfig/DbConfig";
import { UserModel } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

mongoDBConnection();

export async function POST(req: Request) {
  try {
    const { userName } = await req.json();
    const user = await UserModel.findOne({
      userName,
    });
    if (!user) {
      return Response.json(
        {
          message: "Username is Incorrect!",
        },
        {
          status: 400,
        }
      );
    }

    if (user) {
      const token = jwt.sign(user._id, process.env.TOKEN_SECRET!);
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
