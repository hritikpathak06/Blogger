"use client";
import React from "react";
import Link from "next/link";
import { useCurrentUser } from "@/context/userContext";

const Navbar = () => {
  const { loggedInUser }: any = useCurrentUser();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Link href={"/"} className="text-xl font-bold text-gray-800">
                Blogger
              </Link>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {loggedInUser?._id ? (
              <>
                <Link href="/my-profile">
                  <Link
                    href={"/my-profile"}
                    className="text-gray-800 hover:text-gray-600 font-medium"
                  >
                    Profile
                  </Link>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Link
                    href={"/login"}
                    className="text-gray-800 hover:text-gray-600 font-medium"
                  >
                    Login
                  </Link>
                </Link>
              </>
            )}
            <Link href="/create-blog">
              <Link
                href={"/create-blog"}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Create Blog
              </Link>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
