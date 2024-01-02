import mongoose, { Document, Model, Schema } from "mongoose";

// Define a TypeScript interface for the folder files document
interface IUserDocument extends Document {
  userName: string;
  folders: mongoose.ObjectId[];
}

// Define the schema using TypeScript types
const folderFilesSchema = new Schema<IUserDocument>({
  userName: String,
  folders: [
    {
      type: Schema.Types.ObjectId,
      ref: "FolderFile", // Replace 'Folder' with the actual model name for folders
    },
  ],
});
export const UserModel: Model<IUserDocument> =
  mongoose.models.FolderFile ||
  mongoose.model<IUserDocument>("Users", folderFilesSchema);
