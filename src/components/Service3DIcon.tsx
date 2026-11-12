import React, { useId } from 'react';

interface Service3DIconProps {
  iconKey: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Service3DIcon: React.FC<Service3DIconProps> = ({
  iconKey,
  size = 'md',
}) => {
  const rawUid = useId().replace(/:/g, '');
  const metalId = `metalLight_${rawUid}`;
  const creamId = `cream3d_${rawUid}`;
  const goldId = `gold3d_${rawUid}`;
  const emeraldId = `emerald3d_${rawUid}`;
  const navyId = `darkNavy3d_${rawUid}`;

  const boxClass =
    size === 'lg'
      ? 'w-16 h-16 rounded-[22px]'
      : size === 'sm'
        ? 'w-11 h-11 rounded-2xl'
        : 'w-14 h-14 sm:w-16 sm:h-16 rounded-[20px]';

  const svgClass = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10 sm:w-11 sm:h-11';

  return (
    <div
      className={`relative ${boxClass} flex items-center justify-center shrink-0 select-none transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105`}
      style={{
        background:
          'linear-gradient(145deg, #FF8A2B 0%, #FF6B00 55%, #D94E00 100%)',
        boxShadow:
          '0 12px 24px -6px rgba(255, 107, 0, 0.55), 0 4px 0 0 #B83E00, inset 0 2px 4px rgba(255, 255, 255, 0.55)',
      }}
    >
      {/* Top Glossy Specular Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 top-1 h-1/3 rounded-full bg-gradient-to-b from-white/45 to-transparent"
      />

      {/* Bespoke Multi-Layered 3D SVG Subject */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 ${svgClass} drop-shadow-[0_4px_4px_rgba(120,35,0,0.45)]`}
      >
        <defs>
          <linearGradient id={metalId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id={creamId} x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFE4CC" />
          </linearGradient>
          <linearGradient id={goldId} x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id={emeraldId} x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={navyId} x1="16" y1="16" x2="48" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 1. Restaurants & Kitchens: 3D Industrial Cooking Pot */}
        {iconKey === 'chef' && (
          <g>
            <ellipse cx="32" cy="51" rx="18" ry="4" fill="#7C2D12" fillOpacity="0.35" />
            <rect x="8" y="29" width="8" height="5" rx="2.5" fill={`url(#${metalId})`} />
            <rect x="48" y="29" width="8" height="5" rx="2.5" fill={`url(#${metalId})`} />
            <path d="M14 27H50V44C50 48.5 42 51 32 51C22 51 14 48.5 14 44V27Z" fill={`url(#${metalId})`} />
            <ellipse cx="32" cy="27" rx="18" ry="4.5" fill="#CBD5E1" />
            <path d="M13 26C13 19.5 21.5 16 32 16C42.5 16 51 19.5 51 26C51 28 42.5 29.5 32 29.5C21.5 29.5 13 28 13 26Z" fill={`url(#${creamId})`} />
            <rect x="27" y="11.5" width="10" height="4.5" rx="2.2" fill={`url(#${goldId})`} />
            <path d="M23 9C23 6.5 25 5 25 3" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.85" />
            <path d="M32 8C32 5 34 3.5 34 1.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.95" />
            <path d="M41 9C41 6.5 43 5 43 3" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.85" />
          </g>
        )}

        {/* 2. Order Meals Offer: 3D Cloche Serving Platter */}
        {iconKey === 'utensils' && (
          <g>
            <ellipse cx="32" cy="49" rx="21" ry="4" fill="#7C2D12" fillOpacity="0.35" />
            <ellipse cx="32" cy="44" rx="22" ry="6" fill={`url(#${metalId})`} />
            <path d="M14 41C14 27 22 20 32 20C42 20 50 27 50 41H14Z" fill={`url(#${creamId})`} />
            <path d="M18 39C18 30 23 24 30 23" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.9" />
            <circle cx="32" cy="17" r="4.5" fill={`url(#${goldId})`} />
            <circle cx="48" cy="20" r="3.5" fill={`url(#${goldId})`} />
          </g>
        )}

        {/* 3. Pay Invoices: 3D Extruded Invoice + Check Seal */}
        {iconKey === 'receipt' && (
          <g>
            <rect x="17" y="12" width="30" height="40" rx="5" fill="#94A3B8" transform="translate(3 3)" opacity="0.45" />
            <path d="M16 12C16 9.8 17.8 8 20 8H44C46.2 8 48 9.8 48 12V50L42 46L37 50L32 46L27 50L22 46L16 50V12Z" fill={`url(#${creamId})`} />
            <rect x="22" y="16" width="20" height="4" rx="2" fill="#FF6B00" />
            <rect x="22" y="24" width="16" height="3" rx="1.5" fill="#94A3B8" />
            <rect x="22" y="30" width="12" height="3" rx="1.5" fill="#CBD5E1" />
            <circle cx="44" cy="41" r="10" fill={`url(#${emeraldId})`} stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M39.5 41L42.5 44L48.5 38" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 4. Factory & Corporate Offers: 3D Industrial Facility & Twin Tower */}
        {iconKey === 'factory' && (
          <g>
            <rect x="10" y="34" width="44" height="20" rx="3" fill={`url(#${creamId})`} />
            <path d="M10 34L22 24V34L34 24V34L46 24V34H10Z" fill={`url(#${metalId})`} />
            <rect x="44" y="12" width="8" height="16" rx="2" fill={`url(#${goldId})`} />
            <circle cx="48" cy="8" r="3" fill="#FFFFFF" fillOpacity="0.85" />
            <rect x="15" y="40" width="6" height="6" rx="1.5" fill="#FF6B00" />
            <rect x="25" y="40" width="6" height="6" rx="1.5" fill="#FF6B00" />
            <rect x="35" y="40" width="6" height="6" rx="1.5" fill="#FF6B00" />
            <rect x="44" y="40" width="6" height="14" rx="1.5" fill={`url(#${navyId})`} />
          </g>
        )}

        {/* 5. Wedding & Occasion Cards: 3D Glossy Ribbon Card & Heart */}
        {iconKey === 'heart' && (
          <g>
            <rect x="11" y="15" width="42" height="34" rx="6" fill={`url(#${creamId})`} />
            <rect x="11" y="29" width="42" height="6" fill={`url(#${goldId})`} />
            <rect x="29" y="15" width="6" height="34" fill={`url(#${goldId})`} />
            <path d="M32 42C32 42 19 33.5 19 24.5C19 20.5 22.2 17.5 26 17.5C28.5 17.5 30.8 18.8 32 20.8C33.2 18.8 35.5 17.5 38 17.5C41.8 17.5 45 20.5 45 24.5C45 33.5 32 42 32 42Z" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
          </g>
        )}

        {/* 6. Quality & Hygiene: 3D Metallic Shield + Checkmark */}
        {iconKey === 'shield' && (
          <g>
            <path d="M32 9L52 16.5V30C52 43 43.2 51.5 32 56C20.8 51.5 12 43 12 30V16.5L32 9Z" fill={`url(#${creamId})`} />
            <path d="M32 13L47 18.5V30C47 40 40.3 47 32 51C23.7 47 17 40 17 30V18.5L32 13Z" fill={`url(#${emeraldId})`} />
            <path d="M24 31L29.5 36.5L41 25" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 7. Catering Requests: 3D Catering Delivery Truck */}
        {iconKey === 'truck' && (
          <g>
            <ellipse cx="32" cy="51" rx="22" ry="3.5" fill="#7C2D12" fillOpacity="0.35" />
            <rect x="8" y="17" width="31" height="24" rx="5" fill={`url(#${creamId})`} />
            <rect x="13" y="23" width="21" height="4" rx="2" fill="#FF6B00" />
            <rect x="13" y="30" width="14" height="3.5" rx="1.75" fill="#CBD5E1" />
            <path d="M39 23H49C52.5 23 55 26 55 30V41H39V23Z" fill={`url(#${goldId})`} />
            <path d="M42 26H49C50.5 26 52 27.5 52 29.5V33H42V26Z" fill={`url(#${navyId})`} />
            <circle cx="19" cy="43" r="6" fill={`url(#${navyId})`} stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="46" cy="43" r="6" fill={`url(#${navyId})`} stroke="#FFFFFF" strokeWidth="2.5" />
          </g>
        )}

        {/* 8. Request Quotation: 3D Clipboard & Golden Tag */}
        {iconKey === 'file' && (
          <g>
            <rect x="14" y="13" width="32" height="42" rx="6" fill={`url(#${creamId})`} />
            <rect x="22" y="8" width="16" height="8" rx="3" fill={`url(#${goldId})`} />
            <rect x="20" y="23" width="20" height="4" rx="2" fill="#FF6B00" />
            <rect x="20" y="31" width="15" height="3.5" rx="1.75" fill="#94A3B8" />
            <rect x="20" y="38" width="18" height="3.5" rx="1.75" fill="#CBD5E1" />
            <circle cx="46" cy="43" r="9" fill={`url(#${goldId})`} stroke="#FFFFFF" strokeWidth="2.5" />
            <text x="46" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">$</text>
          </g>
        )}

        {/* 9. Gift Cards: 3D Tied Gift Box */}
        {iconKey === 'gift' && (
          <g>
            <rect x="13" y="26" width="38" height="26" rx="5" fill={`url(#${creamId})`} />
            <rect x="10" y="19" width="44" height="9" rx="3.5" fill={`url(#${metalId})`} />
            <rect x="28" y="19" width="8" height="33" fill={`url(#${goldId})`} />
            <path d="M32 19C26 11 18 12 20 19H32Z" fill={`url(#${goldId})`} />
            <path d="M32 19C38 11 46 12 44 19H32Z" fill={`url(#${goldId})`} />
          </g>
        )}

        {/* 10. Book Your Restaurant: 3D Calendar & Dining Plate */}
        {iconKey === 'calendar' && (
          <g>
            <rect x="12" y="14" width="40" height="38" rx="6" fill={`url(#${creamId})`} />
            <path d="M12 20C12 16.7 14.7 14 18 14H46C49.3 14 52 16.7 52 20V25H12V20Z" fill={`url(#${navyId})`} />
            <rect x="20" y="9" width="5" height="9" rx="2.5" fill={`url(#${goldId})`} />
            <rect x="39" y="9" width="5" height="9" rx="2.5" fill={`url(#${goldId})`} />
            <circle cx="32" cy="38" r="8" fill="#FF6B00" />
            <path d="M29 38L31.5 40.5L36 35.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 11. Book Your Majlis: 3D Hospitality Dallah Coffee Pot */}
        {iconKey === 'sparkles' && (
          <g>
            <ellipse cx="32" cy="52" rx="16" ry="3.5" fill="#7C2D12" fillOpacity="0.35" />
            <path d="M23 48C21 40 22 31 27 26H37C42 31 43 40 41 48H23Z" fill={`url(#${goldId})`} />
            <path d="M24 31C16 28 13 21 15 16C17 20 20 24 25 27Z" fill={`url(#${goldId})`} />
            <path d="M38 28C46 28 48 39 40 43" stroke={`url(#${creamId})`} strokeWidth="4" strokeLinecap="round" />
            <path d="M26 26L32 14L38 26H26Z" fill={`url(#${creamId})`} />
            <circle cx="32" cy="12" r="2.5" fill="#FFFFFF" />
          </g>
        )}

        {/* 12. Events & Trips: 3D Event Pavilion & Compass */}
        {iconKey === 'compass' && (
          <g>
            <ellipse cx="32" cy="51" rx="20" ry="4" fill="#7C2D12" fillOpacity="0.35" />
            <path d="M11 33L32 14L53 33H11Z" fill={`url(#${creamId})`} />
            <path d="M21 33L32 14L43 33H21Z" fill={`url(#${goldId})`} />
            <rect x="14" y="33" width="36" height="16" rx="2" fill={`url(#${metalId})`} />
            <path d="M26 49V38C26 35 28.5 33 32 33C35.5 33 38 35 38 38V49H26Z" fill="#FF6B00" />
            <path d="M32 8L32 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
