import { mongoDBConnection } from "@/dbConfig/DbConfig";
import { FolderFileModel } from "@/models/FolderFiles";
import { NextApiRequest } from "next";

mongoDBConnection();
export async function GET(req: Request, res: Response) {
  try {
    const files = await FolderFileModel.find({});

    if (files) {
      return Response.json(files, {
        status: 200,
      });
    }
    return Response.json(
      {
        message: "Api worked",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function POST(req: Request) {
  try {
    const { folderName } = await req.json();
    if (folderName) {
      const newFolder = new FolderFileModel({
        folderName,
      });

      const savedFolder = await newFolder.save();
      if (savedFolder) {
        return Response.json({
          message: "New Folder is added",
          data: savedFolder,
        });
      }
    } else {
      return Response.json(
        {
          message: "Some issues occured!",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export async function PATCH(req: Request) {
  const { id } = await req.json();
  console.log(id);
  try {
    if (!id) {
      Response.json(
        { message: "Please Provide Folder Id" },
        {
          status: 400,
        }
      );
      return;
    }
    const deleteFolder = await FolderFileModel.findByIdAndDelete(id);
    return Response.json(
      {
        message: "Folder is Deleted Successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
