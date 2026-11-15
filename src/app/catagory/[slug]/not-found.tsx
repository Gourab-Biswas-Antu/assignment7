import NotFoundView from "@/components/NotFoundView";

export default function CategoryNotFound() {
  return (
    <NotFoundView
      title="ক্যাটাগরি খুঁজে পাওয়া যায়নি"
      message="আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি সঠিক নয় অথবা সরিয়ে নেওয়া হয়েছে।"
    />
  );
}
