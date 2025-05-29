import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

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

    // پسورد را هش کن
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    // حذف پسورد از خروجی
    const { password, ...userWithoutPass } = createdUser;
    return Response.json(userWithoutPass);
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === 'P2002') { // خطای ایمیل تکراری در Prisma
      return Response.json(
        { error: "Email already exists" },
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