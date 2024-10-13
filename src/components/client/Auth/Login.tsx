"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);
  const [success, setSuccess] = useState<any>();

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      console.log("Logged In Successfull", response.data);
      setSuccess(true);
      router.push("/my-profile");
    } catch (error: any) {
      toast.error(error.response.data.msg || "An error occurred during login");
      console.error("Registration error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="md:w-[55%] w-[100%] h-full flex items-center justify-center gap-5">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-6">Log In</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded `}
              required
            />
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 mt-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded `}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <h1 className="w-full text-end mt-2">
            Click here to
            <Link href="/register">
              <span className="text-blue-500"> Register</span>
            </Link>
          </h1>
        </form>
      </div>
    </>
  );
};

export default Login;
