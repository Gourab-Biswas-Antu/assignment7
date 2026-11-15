"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full h-11 px-3.5 rounded-xl bg-[#f6f8f6] border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 focus:outline-none transition";

const labelClass = "text-[13px] font-medium text-slate-700";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    setLoading(true);
    const { data: resData, error } = await signUp.email({
      email: data.email as string,
      password: data.password as string, // min 8 characters by default
      name: data.name as string,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    if (resData?.user.name) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
      router.push("/sign-in");
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({ provider });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f4f7f4] px-4 py-10">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <Card className="w-full max-w-[440px] p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/70 shadow-[0_10px_40px_-12px_rgba(16,94,56,0.12)]">
        <Card.Content className="flex flex-col gap-5 p-0">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <TextField
              name="name"
              type="text"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className={labelClass}>নাম</Label>
              <Input placeholder="যেমন: রহিম উদ্দিন" className={inputClass} />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className={labelClass}>ইমেইল</Label>
              <Input placeholder="you@example.com" className={inputClass} />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              minLength={8}
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className={labelClass}>পাসওয়ার্ড</Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-emerald-600/40 focus:outline-none transition-colors"
                  aria-label="পাসওয়ার্ড দেখান বা লুকান"
                >
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Confirm Password */}
            <TextField
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              isRequired
              isInvalid={!!passwordError}
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input placeholder="আবার লিখুন" className={inputClass} />
              {passwordError ? (
                <span className="text-xs text-red-500">{passwordError}</span>
              ) : (
                <FieldError className="text-xs text-red-500" />
              )}
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full h-11 mt-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm shadow-[0_4px_14px_-4px_rgba(5,150,105,0.55)] transition disabled:opacity-70"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">অথবা</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              variant="outline"
              className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] shadow-none transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              variant="outline"
              className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] shadow-none transition-colors"
            >
              {/* <Github size={16} className="shrink-0" /> */}
              <FaGithub />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          {/* Sign in link */}
          <p className="text-center text-[13px] text-slate-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Card.Content>
      </Card>

      {/* Back link */}
      <Link
        href="/"
        className="mt-6 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
