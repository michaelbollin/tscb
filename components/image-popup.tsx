import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ImagePopup({ title, coverImage, tags, excerpt, onClose, open }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-h-[80vh] sm:max-w-[80vw] bg-black text-white p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row h-full">
          <div className="sm:w-2/3 h-full">
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/3 p-6 flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4" dangerouslySetInnerHTML={{ __html: title }}></DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto">
              <div className="mb-4">
                {tags && tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-700 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Button asChild className="mt-4">
              <a
                href={excerpt}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}