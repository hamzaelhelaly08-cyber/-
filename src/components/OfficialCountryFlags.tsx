import React from 'react';
import { CountryCode } from '../data/phase1Data';

interface OfficialCountryFlagProps {
  country: CountryCode;
  className?: string;
}

/**
 * Renders crisp, authentic rectangular national flags WITHOUT circular borders or round frames.
 * - EG: Official Egypt flag (Red, White, Black + Golden Eagle of Saladin)
 * - AE: Official UAE national flag (Red vertical band + Green, White, Black horizontal stripes — NEVER Dubai flag)
 * - SA: Official Saudi Arabia flag (Green field + Shahada calligraphy stroke + white sword)
 * - OM: Official Sultanate of Oman flag (Red vertical band with white crossed-swords & khanjar emblem + White, Red, Green)
 */
export const OfficialCountryFlag: React.FC<OfficialCountryFlagProps> = ({
  country,
  className = 'w-7 h-5',
}) => {
  if (country === 'EG') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[3px] border border-slate-200 shadow-xs shrink-0`}
        aria-label="Egypt Flag"
      >
        <rect width="36" height="8" y="0" fill="#CE1126" />
        <rect width="36" height="8" y="8" fill="#FFFFFF" />
        <rect width="36" height="8" y="16" fill="#000000" />
        {/* Golden Eagle of Saladin */}
        <g transform="translate(18, 12)" fill="#C09300">
          <path d="M-2.2,-2.3 L2.2,-2.3 L1.8,0.8 L0.9,2.2 L0,2.5 L-0.9,2.2 L-1.8,0.8 Z" />
          <path d="M-3.5,-1.2 L-1.8,-0.8 L-1.8,1.2 L-3.2,0.7 Z" />
          <path d="M3.5,-1.2 L1.8,-0.8 L1.8,1.2 L3.2,0.7 Z" />
          <circle cx="0" cy="-2.7" r="0.65" />
          <rect x="-0.5" y="-1.3" width="1" height="2.4" fill="#FFFFFF" opacity="0.55" />
        </g>
      </svg>
    );
  }

  if (country === 'AE') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[3px] border border-slate-200 shadow-xs shrink-0`}
        aria-label="United Arab Emirates Flag"
      >
        {/* Top Green, Middle White, Bottom Black horizontal stripes */}
        <rect width="36" height="8" y="0" fill="#00732F" />
        <rect width="36" height="8" y="8" fill="#FFFFFF" />
        <rect width="36" height="8" y="16" fill="#000000" />
        {/* Official UAE Red vertical hoist band */}
        <rect width="9" height="24" x="0" y="0" fill="#FF0000" />
      </svg>
    );
  }

  if (country === 'SA') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[3px] border border-slate-200 shadow-xs shrink-0`}
        aria-label="Saudi Arabia Flag"
      >
        <rect width="36" height="24" fill="#006C35" />
        {/* Crisp stylized Arabic Shahada calligraphy bars */}
        <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
          <path d="M9,8.5 L12.5,8.5 M14,8.5 L18,8.5 M19.5,8.5 L23.5,8.5 M25,8.5 L27,8.5" strokeWidth="1.2" />
          <path d="M10.5,11.2 L16.5,11.2 M18.5,11.2 L26,11.2" strokeWidth="1.1" />
          <path d="M13,6.5 L13,8.5 M16.5,6.5 L16.5,8.5 M21,6.5 L21,8.5" strokeWidth="0.9" />
        </g>
        {/* Crisp white horizontal sword */}
        <path d="M10,16 L24.5,16 L26,15.2 L24.5,16.8 Z" fill="#FFFFFF" />
        <rect x="24" y="14.5" width="1.2" height="3" fill="#FFFFFF" rx="0.4" />
      </svg>
    );
  }

  // Oman (OM)
  return (
    <svg
      viewBox="0 0 36 24"
      className={`${className} rounded-[3px] border border-slate-200 shadow-xs shrink-0`}
      aria-label="Sultanate of Oman Flag"
    >
      {/* Top White, Middle Red, Bottom Green horizontal bands */}
      <rect width="36" height="8" y="0" fill="#FFFFFF" />
      <rect width="36" height="8" y="8" fill="#DB161B" />
      <rect width="36" height="8" y="16" fill="#008000" />
      {/* Vertical Red band on hoist */}
      <rect width="10.5" height="24" x="0" y="0" fill="#DB161B" />
      {/* National Emblem of Oman (Khanjar & Crossed Swords in white) */}
      <g transform="translate(5.25, 5.2)" stroke="#FFFFFF" strokeWidth="0.95" fill="none" strokeLinecap="round">
        <line x1="-2.4" y1="2.2" x2="2.4" y2="-2.2" />
        <line x1="2.4" y1="2.2" x2="-2.4" y2="-2.2" />
        <path d="M0,-2.5 L0,2.5" strokeWidth="1.2" />
        <path d="M-1.2,0.5 L1.2,0.5" strokeWidth="1.1" />
      </g>
    </svg>
  );
};
