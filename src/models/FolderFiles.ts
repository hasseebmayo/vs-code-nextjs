import mongoose, { Document, Model, Schema } from "mongoose";

// Define a TypeScript interface for the file object
export interface IFile {
  fileName: string;
  fileType: string;
  value: string;
}

// Define a TypeScript interface for the folder files document
interface IFolderFilesDocument extends Document {
  folderName: string;
  files: IFile[];
}

// Define the schema using TypeScript types
const folderFilesSchema = new Schema<IFolderFilesDocument>({
  folderName: String,
  files: [
    {
      fileName: String,
      fileType: String,
      value: String,
    },
  ],
});

// Define the model using TypeScript types
export const FolderFileModel: Model<IFolderFilesDocument> =
  mongoose.models.FolderFile ||
  mongoose.model<IFolderFilesDocument>("FolderFile", folderFilesSchema);
