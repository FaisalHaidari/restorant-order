import { User } from "../../../models/User";
import mongoose from "mongoose";

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

    // Create user
    const createdUser = await User.create(body);
    
    // Return user without password
    const userWithoutPass = {
      _id: createdUser._id,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
    
    return Response.json(userWithoutPass);
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return Response.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return Response.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
} 