"use client";

import React, { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import AuthShell from "@/components/auth/AuthShell";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialButtons from "@/components/auth/SocialButtons";
import {
  inputClass,
  labelClass,
  primaryButtonClass,
} from "@/components/auth/inputStyles";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if ((data.password as string).length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    if (data.password !== data.confirmPassword) {
      const msg = "পাসওয়ার্ড দুটি মিলছে না";
      setPasswordError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { data: resData, error } = await signUp.email({
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    if (resData?.user) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
      router.push("/signin");
    }
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <TextField
          name="password"
          type="password"
          isRequired
          className="flex flex-col gap-1.5 w-full"
        >
          <Label className={labelClass}>পাসওয়ার্ড</Label>
          <Input placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
          <FieldError className="text-xs text-red-500" />
        </TextField>

        <TextField
          name="confirmPassword"
          type="password"
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

        <Button
          type="submit"
          variant="primary"
          isDisabled={loading}
          className={primaryButtonClass}
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </Button>
      </Form>

      <AuthDivider />
      <SocialButtons verb="চালিয়ে যান" />

      <p className="mt-4 text-center text-xs sm:text-sm text-slate-500">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="text-brand font-semibold hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}
