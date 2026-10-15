import React, { useState, useEffect } from 'react';
import { X, Copy, Sparkles, Upload, RefreshCw } from 'lucide-react';
import { RefImage } from '../types';

export const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ComponentType<any>; label: string; colorClass: string }> = ({ active, onClick, icon: Icon, label, colorClass }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
      active 
        ? `${colorClass} text-white shadow-md shadow-blue-500/20 translate-y-[-1px]` 
        : 'text-slate-500 hover:bg-white hover:text-slate-700'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 animate-in slide-in-from-bottom-4 z-50 max-w-sm">
    <div className="flex-1 text-sm">{message}</div>
    <button onClick={onClose} className="hover:bg-slate-700 p-1 rounded-full shrink-0">
      <X className="w-4 h-4" />
    </button>
  </div>
);

export const GeneratedContent: React.FC<{ title: string; content: string; onClose: () => void }> = ({ title, content, onClose }) => (
  <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-6 relative animate-in fade-in slide-in-from-bottom-2">
    <button 
      onClick={onClose}
      className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-700 transition-colors"
    >
      <X className="w-5 h-5" />
    </button>
    <div className="flex items-center gap-2 mb-3">
      <Sparkles className="w-5 h-5 text-indigo-600" />
      <h4 className="font-bold text-indigo-900">{title}</h4>
    </div>
    <div className="prose prose-sm prose-indigo max-w-none text-indigo-800 whitespace-pre-wrap leading-relaxed">
      {content}
    </div>
    <div className="mt-4 flex gap-2">
      <button 
        onClick={() => {
            navigator.clipboard.writeText(content);
        }}
        className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-800"
      >
        <Copy className="w-3 h-3" /> Copy Text
      </button>
    </div>
  </div>
);

interface ImageCardProps {
  reference: RefImage;
  onUpload: (id: string, file: File) => void;
  onReset: (id: string) => void;
  readOnly?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({ reference, onUpload, onReset, readOnly = false }) => {
  const [imgError, setImgError] = useState(false);
  const activeImage = reference.userImg || reference.defaultImg;

  useEffect(() => {
    setImgError(false);
  }, [activeImage]);

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-slate-700 text-sm">{reference.name}</span>
        {!readOnly && (
          <label className="cursor-pointer p-1.5 hover:bg-white rounded-md transition-colors text-blue-600" title="Replace Image">
            <Upload className="w-4 h-4" />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                if(e.target.files && e.target.files[0]) {
                  onUpload(reference.id, e.target.files[0]);
                }
              }}
            />
          </label>
        )}
      </div>
      
      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black flex items-center justify-center relative group">
        {activeImage && !imgError ? (
          <>
            <img 
              src={activeImage} 
              alt={reference.name} 
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
            {reference.userImg && !readOnly && (
              <button 
                onClick={() => onReset(reference.id)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Reset to Default"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </>
        ) : (
          <reference.component />
        )}
      </div>
    </div>
  );
};