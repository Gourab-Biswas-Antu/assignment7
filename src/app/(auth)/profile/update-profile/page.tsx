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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";
import {
  inputClass,
  labelClass,
  primaryButtonClass,
} from "@/components/auth/inputStyles";

const UpdateProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();

    if (!name) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setSaving(true);
    const { error } = await updateUser({ name });
    setSaving(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>প্রোফাইলে ফিরে যান</span>
      </Link>

      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          তথ্য আপডেট
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            key={session?.user?.name || "user-name"}
            isRequired
            className="flex flex-col gap-1.5 w-full"
          >
            <Label className={labelClass}>নাম</Label>
            <Input
              name="name"
              type="text"
              defaultValue={session?.user?.name || ""}
              placeholder={isPending ? "লোড হচ্ছে..." : "আপনার নাম লিখুন"}
              className={inputClass}
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <Button
            type="submit"
            variant="primary"
            isDisabled={isPending || saving}
            className={primaryButtonClass}
          >
            {saving ? "সংরক্ষণ হচ্ছে..." : "তথ্য আপডেট করুন"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
