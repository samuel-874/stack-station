"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, LogIn, Chrome } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import space from "@/public/office.jpg";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if ((res as any)?.error) throw new Error((res as any).error);
      toast({ title: "Signed in", description: "Welcome back." });
      window.location.href = "/";
    } catch (err: any) {
      toast({
        title: "Sign-in failed",
        description: err?.message || "Unable to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err: any) {
      toast({
        title: "Google sign-in failed",
        description: err?.message || "Unable to sign in with Google",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
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

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue managing your workspace.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              <LogIn className="w-4 h-4 mr-2" />{" "}
              {loading ? "Please wait..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base"
              onClick={onGoogle}
            >
              <Chrome className="w-4 h-4 mr-2" /> Continue with Google
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between max-h-[100dvh]">
        <Image src={space} alt="Workspace" />
      </div>
    </div>
  );
}
