import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  coverImage: string;
  slug?: string;
  excerpt?: string;
}

export default function CoverImage({ title, coverImage, slug, excerpt }: Props) {
  const image = (
    <div className="w-full h-0 pb-[100%] relative">
      <img
        width={300}
        height={300}
        alt={`Cover Image for ${title}`}
        src={coverImage}
        className={cn("absolute inset-0 w-full h-full object-cover", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
      />
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <>
          {image}
        </>
      ) : (
        image
      )}
    </div>
  );
}