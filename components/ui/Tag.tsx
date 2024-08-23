import React from 'react';

interface TagProps {
  text: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onClick }) => {
  return (
    <span 
      className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm border border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default Tag;