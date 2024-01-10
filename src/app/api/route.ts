import { NextApiRequest } from "next";
import { mongoDBConnection } from "@/dbConfig/DbConfig";
import { FolderFileModel, IFile } from "@/models/FolderFiles";
import { NextRequest } from "next/server";
import { UserModel } from "@/models/UserModel";

mongoDBConnection();
export async function GET(req: NextRequest, res: Response) {
  try {
    const userName = req.cookies.get("token")?.value;
    const user = await UserModel.findOne({ userName }).populate("folders");

    if (user) {
      return Response.json(user.folders, {
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
export async function POST(req: NextRequest) {
  try {
    const files: IFile[] = [
      {
        fileName: "index",
        fileType: "html",
        value: `
      <!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
</head>
<body>
      <h1>Hello World!</h1>
</body>
</html>
      `,
      },
      {
        fileName: "index",
        fileType: "css",
        value: `
        * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
        `,
      },
      {
        fileName: "index",
        fileType: "js",
        value: `
        console.log("Hello World");
        `,
      },
    ];
    const { folderName } = await req.json();
    const userName = req.cookies.get("token")?.value;
    const user = await UserModel.findOne({
      userName,
    });
    if (user) {
      if (folderName) {
        const newFolder = new FolderFileModel({
          folderName,
          files,
        });
        user.folders.push(newFolder._id);
        await user.save();
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
    } else {
      return Response.json(
        {
          message: "No user is Found!!",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export async function PATCH(req: NextRequest) {
  const userName = req.cookies.get("token")?.value;

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
    if (userName) {
      const user = await UserModel.findOneAndUpdate(
        { userName },
        {
          $pull: { folders: id },
        }
      );
      const deleteFolder = await FolderFileModel.findByIdAndDelete(id);
      return Response.json(
        {
          message: "Folder is Deleted Successfully!",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { folderId, _id, value } = await req.json();

    const folder = await FolderFileModel.findOneAndUpdate(
      { _id: folderId, "files._id": _id },
      {
        $set: {
          "files.$.value": value,
        },
      }
    );
    return Response.json(
      {
        message: "Updated code Successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
