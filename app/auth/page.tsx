"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, Users } from "lucide-react";
import { z } from "zod";
import space from "../../public/office.jpg";

import Image from "next/image";
const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100),
});

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      //   console.log(validation.error);
      console.log(validation.error.message[0]);
      toast({
        title: "Validation Error",
        description: validation.error.message[0] || "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      toast({
        title: "Account created!",
        description: "You've successfully signed up.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                SS
              </span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              Stack-Station
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {isSignIn ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {isSignIn
                ? "Sign in to access your dashboard and continue optimizing your manufacturing process."
                : "Sign up to start revolutionizing your manufacturing with the latest technology."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isSignIn && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  OR
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-sm text-muted-foreground"
              >
                {isSignIn
                  ? "Don't have an Account? "
                  : "Already have an Account? "}
                <span className="text-primary font-medium hover:underline">
                  {isSignIn ? "Sign Up" : "Sign In"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between max-h-[100dvh] ">
        <Image src={space} alt="Logo" />
      </div>
    </div>
  );
};

export default Auth;
