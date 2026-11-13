import React from 'react';
import { Upload } from 'lucide-react';

export const BASIT_DEFAULT_ICON_SRC = '/assets/aistudio/_____________________________685778d3.png';
export const BASIT_SWOOSH_MARK_SRC = '/assets/aistudio/_____F__________________d70ac410.png';

interface BasitBrandMarkProps {
  customLogoDataUrl?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBadgeWordmark?: boolean;
  isRtl?: boolean;
  onUploadLogo?: (dataUrl: string) => void;
  className?: string;
}

/**
 * Centralized BASIT Brand Mark component.
 * Renders the user-uploaded official logo if present, otherwise displays the royal-purple
 * & golden emblem as a clean centralized placeholder ready for brand-wide replacement.
 */
export const BasitBrandMark: React.FC<BasitBrandMarkProps> = ({
  customLogoDataUrl,
  size = 'md',
  showBadgeWordmark = false,
  isRtl = true,
  onUploadLogo,
  className = '',
}) => {
  const sizeClass =
    size === 'xs'
      ? 'w-8 h-8 rounded-xl'
      : size === 'sm'
        ? 'w-10 h-10 rounded-xl'
        : size === 'md'
          ? 'w-12 h-12 rounded-2xl'
          : size === 'lg'
            ? 'w-20 h-20 rounded-[22px]'
            : 'w-28 h-28 rounded-[28px]';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadLogo) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadLogo(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const visualContent = (
    <div
      className={`relative shrink-0 ${sizeClass} bg-white dark:bg-[#1E1533] border border-[#ECE7F6] dark:border-[#852BEB]/40 shadow-md shadow-[#852BEB]/15 flex items-center justify-center overflow-hidden p-1 ${className}`}
    >
      <img
        src={customLogoDataUrl || BASIT_DEFAULT_ICON_SRC}
        alt="BASIT Brand Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-[inherit]"
      />
      {onUploadLogo && !customLogoDataUrl && (
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -end-0.5 w-4 h-4 rounded-full bg-[#F4E600] text-[#1A132B] flex items-center justify-center shadow-xs border border-white"
        >
          <Upload className="w-2.5 h-2.5" />
        </span>
      )}
    </div>
  );

  if (onUploadLogo) {
    return (
      <label
        className="relative inline-flex items-center gap-2.5 cursor-pointer group shrink-0"
        title={isRtl ? 'رفع أو استبدال شعار BASIT الرسمي' : 'Upload or Replace BASIT Brand Logo'}
      >
        {visualContent}
        {showBadgeWordmark && (
          <div className="min-w-0 text-start">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-black tracking-tight text-[#1A132B] dark:text-white">
                BASIT
              </span>
              <span className="text-xs font-extrabold text-[#852BEB] dark:text-[#F4E600]">
                | بسيط
              </span>
            </div>
            <span className="block text-[10px] font-bold text-[#6E6485] dark:text-[#B8AED1] truncate">
              {isRtl ? 'مساحة الشعار المركزي القابل للاستبدال' : 'Central Brand Logo Slot'}
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      {visualContent}
      {showBadgeWordmark && (
        <div className="min-w-0 text-start">
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-base font-black tracking-tight text-[#1A132B] dark:text-white">
              BASIT
            </span>
            <span className="text-xs font-extrabold text-[#852BEB] dark:text-[#F4E600]">
              | بسيط
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
