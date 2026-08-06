import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    subject: String,
    semester: String,
    content: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
