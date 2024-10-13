"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/context/userContext";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const { loggedInUser }: any = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("User Logged Out Successfully");
      window.location.reload();
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link href={href}>
      <span className="text-gray-800 hover:text-gray-600 font-medium block py-2">
        {children}
      </span>
    </Link>
  );

  return (
    <nav className="bg-neutral-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-extrabold text-white">
                Blogger
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {loggedInUser?._id ? (
              <>
                <NavLink href="/my-profile">
                  <span className="text-white">Profile</span>
                </NavLink>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
            <NavLink href="/create-blog">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Create Blog
              </span>
            </NavLink>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {loggedInUser?._id ? (
              <>
                <NavLink href="/my-profile">
                  <span className="text-white">Profile</span>
                </NavLink>
                <Button className="w-full text-left" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
            <NavLink href="/create-blog">
              <span className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Create Blog
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
