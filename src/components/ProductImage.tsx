import React from "react";

/** The API `image` can be an emoji or an image URL — render either. */
export default function ProductImage({
  image,
  alt,
  className = "w-11 h-11 text-2xl",
}: {
  image: string;
  alt: string;
  className?: string;
}) {
  const isUrl = /^(https?:)?\/\//.test(image) || image.startsWith("/");
  return (
    <div
      className={`rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden ${className}`}
    >
      {isUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt} className="w-3/5 h-3/5 object-contain" />
      ) : (
        <span role="img" aria-label={alt} className="leading-none">
          {image}
        </span>
      )}
    </div>
  );
}
