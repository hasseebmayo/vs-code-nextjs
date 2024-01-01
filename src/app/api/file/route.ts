import { mongoDBConnection } from "@/dbConfig/DbConfig";
import { FolderFileModel } from "@/models/FolderFiles";

mongoDBConnection();
export async function POST(req: Request) {
  const { id, fileName, fileType } = await req.json();

  try {
    const updatedFile = await FolderFileModel.findByIdAndUpdate(
      id,
      {
        $push: { files: { fileName, fileType, value: "" } },
      },
      { new: true }
    );

    if (!updatedFile) {
      return Response.json(
        {
          message: "File not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        message: "File Created Successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Handle error
    console.error(error);
    return Response.json(
      {
        message: "Error creating file",
      },
      {
        status: 500,
      }
    );
  }
}
