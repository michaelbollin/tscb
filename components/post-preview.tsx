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
  onTagClick,
  onUserClick,
  closePopup,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = (show: boolean) => {
    setShowPopup(show);
    if(show)
      window.history.pushState({}, '', `/${slug}`);
   
  };

  const handleTagClickWrapper = (tag: string) => {
    onTagClick(tag);
    handlePopupToggle(false);
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
          {username && (
            <>
              <UserIcon className="w-4 h-4 mr-2" />
              <span 
                className="cursor-pointer hover:underline"
                onClick={() => onUserClick(username)}
              >
                {username}
              </span>
            </>
          )}
        </div>
      </div>
      <ImagePopup
        title={title}
        coverImage={coverImage}
        tags={tags}
        excerpt={excerpt}
        username={username}
        onClose={() => handlePopupToggle(false)}
        open={showPopup}
        onTagClick={handleTagClickWrapper}
      />
    </div>
  );
}