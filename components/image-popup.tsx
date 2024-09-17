import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Tag from './ui/Tag';
import { UserIcon } from '@heroicons/react/24/outline';

export default function ImagePopup({
  title,
  coverImage,
  tags,
  excerpt,
  onClose,
  author,
  open,
  onTagClick,
  onUserClick,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[100vh] sm:h-[80vh] sm:max-w-[80vw] bg-black text-white p-0 overflow-hidden border border-gray-700">
        <div className="flex flex-col sm:flex-row h-full">
          <div className="sm:w-2/3 h-1/2 sm:h-full">
            <img
              src={coverImage}
              alt={title}
              className="w-2/3 h-full object-cover absolute"
            />
          </div>
          <div className="sm:w-1/3 p-6 flex flex-col h-1/2 sm:h-full overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                className="text-2xl mb-2 mt-4"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div className="text-sm text-white/80 flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                <span 
                  className="cursor-pointer hover:underline"
                  onClick={() => onUserClick(author.node.name)}
                >
                  {author.node.name}
                </span>
              </div>
            </DialogHeader>
            <div className="mt-4 flex-grow overflow-y-auto">
              <div className="mb-4 flex flex-wrap gap-2">
                {tags &&
                  tags.map((tag, index) => (
                    <Tag key={index} text={tag} onClick={() => onTagClick(tag)} />
                  ))}
              </div>
            </div>
            <Button variant="ghost" asChild className="mt-4 border-white/50 hover:bg-white/20 hover:text-white border-2">
              <a href={excerpt} target="_blank" rel="noopener noreferrer">
                Visit
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}