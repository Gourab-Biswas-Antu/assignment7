import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mail, Pencil, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) redirect("/signin?redirected=1");

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিচালনা করুন।
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="w-16 h-16 rounded-full bg-brand text-white font-extrabold text-2xl flex items-center justify-center overflow-hidden shrink-0">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{(user.name || "U").charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h2 className="text-lg font-extrabold text-slate-900 truncate">
            {user.name || "ব্যবহারকারী"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 truncate">
            <Mail size={14} className="shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
        </div>

        <Link
          href="/profile/update-profile"
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg border border-rise/40 text-rise hover:bg-rise-soft text-xs sm:text-sm font-semibold transition-colors"
        >
          <Pencil size={14} />
          <span>তথ্য আপডেট</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
