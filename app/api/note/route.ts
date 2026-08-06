import getUserFromToken from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function POST(request: Request) {
  const user = getUserFromToken(request);

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const { title, subject, semester, content } = await request.json();

  const newNote = await Note.create({
    title,
    subject,
    semester,
    content,
    uploadedBy: user.userId,
  });

  return Response.json({ message: "Note created", note: newNote });
}

export async function GET(request: Request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const semester = searchParams.get("semester");

  const filter: any = {};
  if (subject) filter.subject = subject;
  if (semester) filter.semester = semester;

  const notes = await Note.find(filter).sort({ createdAt: -1 });

  return Response.json(notes);
}
