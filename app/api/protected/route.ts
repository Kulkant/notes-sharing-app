import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return Response.json({ message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return Response.json({ message: "Acess granted", user: decoded });
  } catch (error) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}
