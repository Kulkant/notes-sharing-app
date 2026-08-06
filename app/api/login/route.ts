import { connectDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await connectDb();

  const { email, password } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return Response.json(
      { message: "User doesn't exist. Please Signup!" },
      { status: 404 },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password as string);

  if (!isMatch) {
    return Response.json({ message: "Password is incorrect" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: `7d` },
  );

  return Response.json({
    message: "Login Successfull!",
    userId: user._id,
    role: user.role,
    token,
  });
}
