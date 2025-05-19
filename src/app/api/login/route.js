import { User } from "../../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.email || !body.password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB if not already connected
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    // Find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const passwordOk = await bcrypt.compare(body.password, user.password);
    if (!passwordOk) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user data without password
    const userWithoutPass = {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return Response.json(userWithoutPass);
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
} 