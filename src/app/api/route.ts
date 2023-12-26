import { mongoDBConnection } from "@/dbConfig/DbConfig";
import { FolderFileModel } from "@/models/FolderFiles";
mongoDBConnection();
export async function GET(req: Request, res: Response) {
  try {
    const files = await FolderFileModel.find({});
    console.log("its running");
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
export async function POST() {}
export async function PUT() {}
