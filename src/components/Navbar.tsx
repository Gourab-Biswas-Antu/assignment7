"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getCategories } from "@/lib/api";
import { todayBn } from "@/lib/format";
import { ICategory } from "@/types/type";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [dateText, setDateText] = useState("");

  const { data: session, isPending } = useSession();

  useEffect(() => {
    setDateText(todayBn());
    getCategories().then(setCategories);
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট ব্যর্থ হয়েছে");
        },
      },
    });
  };

  const handleMenuAction = (key: React.Key) => {
    if (key === "profile") router.push("/profile");
    if (key === "signout") handleSignOut();
  };

  const user = session?.user;

  return (
    <header className="w-full bg-white/95 backdrop-blur border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top row: logo + date, auth */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <span
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand text-white flex items-center justify-center text-lg sm:text-xl shrink-0"
              role="img"
              aria-label="cart"
            >
              🛒
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-extrabold text-slate-900">
                বাজার দর
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 min-h-4">
                {dateText}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {isPending ? (
              <div className="w-24 h-9 rounded-xl bg-slate-200/70 animate-pulse" />
            ) : user ? (
              <Dropdown>
                <Button
                  aria-label="Account menu"
                  variant="ghost"
                  className="h-10 px-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700"
                >
                  <Avatar size="sm">
                    {user.image && (
                      <Avatar.Image alt={user.name} src={user.image} />
                    )}
                    <Avatar.Fallback>
                      {(user.name || "U").charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="hidden sm:inline max-w-28 truncate">
                    {user.name}
                  </span>
                </Button>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-2 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item id="profile" textValue="প্রোফাইল">
                      প্রোফাইল
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="signout"
                      textValue="সাইন আউট"
                      className="text-rise"
                    >
                      সাইন আউট
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-3 sm:px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Second row: category links */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center md:justify-center gap-1 sm:gap-2 pb-2 overflow-x-auto no-scrollbar"
        >
          {categories.length === 0
            ? [...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="h-7 w-16 rounded-lg bg-slate-200/60 animate-pulse shrink-0"
                />
              ))
            : categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    title={cat.descriptionBn}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-brand-soft text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-sm leading-none">{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                );
              })}
        </nav>
      </div>
    </header>
  );
}
