import React from 'react';
import { CountryCode } from '../data/phase1Data';

interface OfficialCountryFlagProps {
  country: CountryCode;
  className?: string;
}

/**
 * Renders crisp, authentic rectangular national flags WITHOUT invented flags:
 * - EG: Official Egypt flag (Red, White, Black + detailed Golden Eagle of Saladin)
 * - AE: Official UAE national flag (Red vertical hoist band + Green, White, Black horizontal stripes — labeled Dubai, UAE externally)
 * - GB: Official United Kingdom Union Jack (#012169 blue, diagonal saltires & #C8102E white-fimbriated cross)
 * - SA: Official Saudi Arabia flag (Green field + Shahada calligraphy + white sword)
 * - OM: Official Sultanate of Oman flag (Red vertical hoist with white Khanjar & crossed swords + White, Red, Green)
 */
export const OfficialCountryFlag: React.FC<OfficialCountryFlagProps> = ({
  country,
  className = 'w-7 h-5',
}) => {
  if (country === 'EG') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[4px] border border-[#ECE7F6] dark:border-white/15 shadow-xs shrink-0`}
        aria-label="Egypt Flag"
      >
        <rect width="36" height="8" y="0" fill="#CE1126" />
        <rect width="36" height="8" y="8" fill="#FFFFFF" />
        <rect width="36" height="8" y="16" fill="#000000" />
        {/* Golden Eagle of Saladin */}
        <g transform="translate(18, 12)">
          <path d="M-3.4,-1.3 L-1.6,-1.6 L-1.4,1.2 L-3.1,0.8 Z" fill="#C09300" />
          <path d="M3.4,-1.3 L1.6,-1.6 L1.4,1.2 L3.1,0.8 Z" fill="#C09300" />
          <path d="M-1.9,-2.2 L1.9,-2.2 L1.5,1.2 L0,2.4 L-1.5,1.2 Z" fill="#D4AF37" stroke="#9A7200" strokeWidth="0.25" />
          <circle cx="0" cy="-2.75" r="0.7" fill="#C09300" />
          <path d="M0.3,-2.95 L1.35,-2.7 L0.45,-2.35 Z" fill="#9A7200" />
          <rect x="-0.85" y="-1.1" width="1.7" height="0.65" fill="#CE1126" />
          <rect x="-0.85" y="-0.45" width="1.7" height="0.65" fill="#FFFFFF" />
          <rect x="-0.85" y="0.2" width="1.7" height="0.65" fill="#000000" />
          <rect x="-2.1" y="2.35" width="4.2" height="0.65" rx="0.25" fill="#C09300" />
        </g>
      </svg>
    );
  }

  if (country === 'AE') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[4px] border border-[#ECE7F6] dark:border-white/15 shadow-xs shrink-0`}
        aria-label="United Arab Emirates Flag"
      >
        <rect width="36" height="8" y="0" fill="#00732F" />
        <rect width="36" height="8" y="8" fill="#FFFFFF" />
        <rect width="36" height="8" y="16" fill="#000000" />
        <rect width="9" height="24" x="0" y="0" fill="#FF0000" />
      </svg>
    );
  }

  if (country === 'GB') {
    const clipId = 'gb_clip_official';
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[4px] border border-[#ECE7F6] dark:border-white/15 shadow-xs shrink-0`}
        aria-label="United Kingdom Union Jack Flag"
      >
        <defs>
          <clipPath id={clipId}>
            <rect width="36" height="24" x="0" y="0" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {/* Royal Navy Field */}
          <rect width="36" height="24" fill="#012169" />
          {/* White St. Andrew's Saltire */}
          <path d="M-3,-2 L39,26 M39,-2 L-3,26" stroke="#FFFFFF" strokeWidth="4.8" />
          {/* Red St. Patrick's Pinwheel Saltires */}
          <path d="M0,0 L18,12 M36,24 L18,12" stroke="#C8102E" strokeWidth="2.1" transform="translate(0, 0.7)" />
          <path d="M36,0 L18,12 M0,24 L18,12" stroke="#C8102E" strokeWidth="2.1" transform="translate(0, -0.7)" />
          {/* White Fimbriation Cross */}
          <path d="M18,0 V24 M0,12 H36" stroke="#FFFFFF" strokeWidth="7.8" />
          {/* Red St. George's Cross */}
          <path d="M18,0 V24 M0,12 H36" stroke="#C8102E" strokeWidth="4.6" />
        </g>
      </svg>
    );
  }

  if (country === 'SA') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`${className} rounded-[4px] border border-[#ECE7F6] dark:border-white/15 shadow-xs shrink-0`}
        aria-label="Saudi Arabia Flag"
      >
        <rect width="36" height="24" fill="#006C35" />
        <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
          <path d="M9,8.5 L12.5,8.5 M14,8.5 L18,8.5 M19.5,8.5 L23.5,8.5 M25,8.5 L27,8.5" strokeWidth="1.2" />
          <path d="M10.5,11.2 L16.5,11.2 M18.5,11.2 L26,11.2" strokeWidth="1.1" />
          <path d="M13,6.5 L13,8.5 M16.5,6.5 L16.5,8.5 M21,6.5 L21,8.5" strokeWidth="0.9" />
        </g>
        <path d="M10,16 L24.5,16 L26,15.2 L24.5,16.8 Z" fill="#FFFFFF" />
        <rect x="24" y="14.5" width="1.2" height="3" fill="#FFFFFF" rx="0.4" />
      </svg>
    );
  }

  // Oman (OM)
  return (
    <svg
      viewBox="0 0 36 24"
      className={`${className} rounded-[4px] border border-[#ECE7F6] dark:border-white/15 shadow-xs shrink-0`}
      aria-label="Sultanate of Oman Flag"
    >
      <rect width="36" height="8" y="0" fill="#FFFFFF" />
      <rect width="36" height="8" y="8" fill="#DB161B" />
      <rect width="36" height="8" y="16" fill="#008000" />
      <rect width="10.5" height="24" x="0" y="0" fill="#DB161B" />
      <g transform="translate(5.25, 5.2)" stroke="#FFFFFF" strokeWidth="0.95" fill="none" strokeLinecap="round">
        <line x1="-2.4" y1="2.2" x2="2.4" y2="-2.2" />
        <line x1="2.4" y1="2.2" x2="-2.4" y2="-2.2" />
        <path d="M0,-2.5 L0,2.5" strokeWidth="1.2" />
        <path d="M-1.2,0.5 L1.2,0.5" strokeWidth="1.1" />
      </g>
    </svg>
  );
};
