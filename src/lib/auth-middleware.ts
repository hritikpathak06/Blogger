import { User } from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

/**
 * Middleware to authenticate a user based on a JWT token.
 *
 * @param {NextRequest} request - The incoming request object (includes headers and cookies).
 * @returns {Promise<[User | null, Error | null]>} - A promise that resolves to a user object if found, or an error if any occurred.
 */
export const authMiddleware = async (request: NextRequest): Promise<any> => {
  try {
    let token: string | undefined;

    // Extract token from request headers or cookies
    if (request.headers.get("token")) {
      token = request.headers.get("token") as string;
    } else {
      token = request.cookies.get("token")?.value;
    }

    if (!token) {
      return [null, new Error("No token provided")];
    }

    // Verify and decode the JWT token
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (!decoded || !("user_id" in decoded)) {
      return [null, new Error("Invalid token")];
    }

    // Get the user ID from the token
    const user_id = decoded.user_id;

    // Find the user in the database using the decoded user ID
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(user_id as string),
    }).select("-password"); // Omit the password field from the user object

    if (!user) {
      return [null, new Error("User not found")];
    }

    // If the user is found, return the user object
    return [user, null];
  } catch (error) {
    // Handle any errors during the process
    return [null, error as Error];
  }
};
