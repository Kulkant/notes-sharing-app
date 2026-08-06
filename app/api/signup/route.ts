import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await connectDb();
  const { name, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return Response.json({ message: "User created", userId: newUser._id });
}
