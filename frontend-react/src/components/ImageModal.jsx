import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
      >
        <X size={32} />
      </button>

      <img 
        src={image} 
        alt="Zoomed view" 
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} 
      />
    </div>
  );
};

export default ImageModal;