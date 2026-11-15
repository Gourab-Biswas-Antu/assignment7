import NotFoundView from "@/components/NotFoundView";

export default function ProductNotFound() {
  return (
    <NotFoundView
      title="পণ্যের তথ্য খুঁজে পাওয়া যায়নি"
      message="আপনি যে পণ্যটি খুঁজছেন সেটি সঠিক নয় অথবা সরিয়ে নেওয়া হয়েছে।"
    />
  );
}
