"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import AuthShell from "@/components/auth/AuthShell";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialButtons from "@/components/auth/SocialButtons";
import {
  inputClass,
  labelClass,
  primaryButtonClass,
} from "@/components/auth/inputStyles";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const toasted = useRef(false);

  // toast shown when the proxy redirected an anonymous user from a protected route
  useEffect(() => {
    if (searchParams.get("redirected") && !toasted.current) {
      toasted.current = true;
      toast.error("এই পাতাটি দেখতে অনুগ্রহ করে সাইন ইন করুন");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);
    const { error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <Button
          type="submit"
          variant="primary"
          isDisabled={loading}
          className={primaryButtonClass}
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </Button>
      </Form>

      <AuthDivider />
      <SocialButtons verb="চালিয়ে যান" />

      <p className="mt-4 text-center text-xs sm:text-sm text-slate-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="text-brand font-semibold hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}
