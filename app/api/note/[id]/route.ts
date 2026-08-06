import getUserFromToken from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = getUserFromToken(request);

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const { id } = await params;

  const note = await Note.findById(id);

  if (!note) {
    return Response.json({ message: "Note not found" }, { status: 404 });
  }

  const isOwner = note.uploadedBy.toString() === user.userId;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  await Note.findByIdAndDelete(id);

  return Response.json({ message: "Note deleted" });
}
