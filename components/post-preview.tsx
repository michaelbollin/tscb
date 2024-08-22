import { useState } from "react";
import Date from "@/components/date";
import CoverImage from "@/components/cover-image";
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import ImagePopup from "@/components/image-popup";

export default function PostPreview({
  title,
  coverImage,
  date,
  slug,
  username,
  excerpt,
  tags,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = (show: boolean) => {
    setShowPopup(show);
    if (show) {
      window.history.pushState({}, '', `/${slug}`);
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        {coverImage && (
          <div onClick={() => handlePopupToggle(true)} className="cursor-pointer">
            <CoverImage title={title} coverImage={coverImage} slug={slug} excerpt={excerpt} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end">
        <h3 className="text-xl mb-3 leading-snug">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handlePopupToggle(true)}
            dangerouslySetInnerHTML={{ __html: title }}
          ></span>
        </h3>
        <div className="text-sm mb-4 text-white/50 flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <Date dateString={date} />
          {username && (
            <>
              <span className="mx-2">•</span>
              <UserIcon className="w-4 h-4 mr-2" />
              <span>{username}</span>
            </>
          )}
        </div>
      </div>
      <ImagePopup
        title={title}
        coverImage={coverImage}
        tags={tags}
        excerpt={excerpt}
        onClose={() => handlePopupToggle(false)}
        open={showPopup}
      />
    </div>
  );
}