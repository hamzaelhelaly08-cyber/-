import React from 'react';
import { CATERING_EGYPT_LOGO } from '../data/mockOperationalData';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showGlow?: boolean;
  altText?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showGlow = true,
  altText = 'Catering Egypt - كاترينج مصر'
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32 sm:w-40 sm:h-40'
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      {/* Subtle warm orange/fiery ambient glow underneath */}
      {showGlow && (
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-600/40 via-amber-500/30 to-red-600/30 blur-md -z-10 pointer-events-none transform scale-110"
          aria-hidden="true"
        />
      )}
      
      <img
        src={CATERING_EGYPT_LOGO}
        alt={altText}
        className={`${sizeClasses[size]} object-contain drop-shadow-md select-none transition-transform duration-300 hover:scale-105`}
        loading="eager"
      />
    </div>
  );
};
