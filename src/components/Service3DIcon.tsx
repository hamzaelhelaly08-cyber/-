import React, { useId } from 'react';

interface Service3DIconProps {
  iconKey: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Unified Art-Directed BASIT 3D Iconography System.
 * Sculpted royal purple (#852BEB) 3D glass-porcelain pedestal + Electric Lemon Yellow (#F4E600) & pure white volumetric glyphs.
 * Supports all 14+ platform categories: Food, Delivery/Courier, Shopping, Offers/Coupons, Entertainment,
 * Reservations, Business/Corporate, Merchants, Customers, Drivers, Opportunities/Usufruct, Finance, Reports/Admin, International Markets.
 */
export const Service3DIcon: React.FC<Service3DIconProps> = ({
  iconKey,
  size = 'md',
}) => {
  const rawUid = useId().replace(/:/g, '');
  const whitePorcelainId = `porcelain_${rawUid}`;
  const purpleSilverId = `lilacSilver_${rawUid}`;
  const lemonGoldId = `lemonYellow_${rawUid}`;
  const emeraldId = `emerald3d_${rawUid}`;
  const deepIndigoId = `deepIndigo_${rawUid}`;
  const violetId = `vividViolet_${rawUid}`;

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
          'linear-gradient(145deg, #A155FA 0%, #852BEB 55%, #5B18B0 100%)',
        boxShadow:
          '0 12px 24px -6px rgba(133, 43, 235, 0.45), 0 4px 0 0 #420F85, inset 0 2px 4px rgba(255, 255, 255, 0.45)',
      }}
    >
      {/* Top Porcelain Specular Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 top-1 h-1/3 rounded-full bg-gradient-to-b from-white/40 to-transparent"
      />

      {/* Bespoke Multi-Layered 3D SVG Subject */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 ${svgClass} drop-shadow-[0_4px_5px_rgba(26,19,43,0.42)]`}
      >
        <defs>
          <linearGradient id={purpleSilverId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>
          <linearGradient id={whitePorcelainId} x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F3FF" />
          </linearGradient>
          <linearGradient id={lemonGoldId} x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF766" />
            <stop offset="50%" stopColor="#F4E600" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id={emeraldId} x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={deepIndigoId} x1="14" y1="14" x2="50" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B1D7A" />
            <stop offset="100%" stopColor="#1A132B" />
          </linearGradient>
          <linearGradient id={violetId} x1="12" y1="14" x2="52" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>

        {/* 1. Restaurants & Kitchens: 3D Culinary Pot */}
        {iconKey === 'chef' && (
          <g>
            <ellipse cx="32" cy="51" rx="18" ry="4" fill="#2A1459" fillOpacity="0.4" />
            <rect x="8" y="29" width="8" height="5" rx="2.5" fill={`url(#${purpleSilverId})`} />
            <rect x="48" y="29" width="8" height="5" rx="2.5" fill={`url(#${purpleSilverId})`} />
            <path d="M14 27H50V44C50 48.5 42 51 32 51C22 51 14 48.5 14 44V27Z" fill={`url(#${purpleSilverId})`} />
            <ellipse cx="32" cy="27" rx="18" ry="4.5" fill="#DDD6FE" />
            <path d="M13 26C13 19.5 21.5 16 32 16C42.5 16 51 19.5 51 26C51 28 42.5 29.5 32 29.5C21.5 29.5 13 28 13 26Z" fill={`url(#${whitePorcelainId})`} />
            <rect x="27" y="11.5" width="10" height="4.5" rx="2.2" fill={`url(#${lemonGoldId})`} />
            <path d="M23 9C23 6.5 25 5 25 3" stroke="#F4E600" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M32 8C32 5 34 3.5 34 1.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M41 9C41 6.5 43 5 43 3" stroke="#F4E600" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        )}

        {/* 2. Food & Cloche Serving Platter */}
        {iconKey === 'utensils' && (
          <g>
            <ellipse cx="32" cy="49" rx="21" ry="4" fill="#2A1459" fillOpacity="0.4" />
            <ellipse cx="32" cy="44" rx="22" ry="6" fill={`url(#${purpleSilverId})`} />
            <path d="M14 41C14 27 22 20 32 20C42 20 50 27 50 41H14Z" fill={`url(#${whitePorcelainId})`} />
            <path d="M18 39C18 30 23 24 30 23" stroke="#852BEB" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="17" r="4.5" fill={`url(#${lemonGoldId})`} />
            <circle cx="48" cy="20" r="3.5" fill={`url(#${lemonGoldId})`} />
          </g>
        )}

        {/* 3. Pay Invoices & Financial Services */}
        {(iconKey === 'receipt' || iconKey === 'finance') && (
          <g>
            <rect x="17" y="12" width="30" height="40" rx="5" fill="#4C1D95" transform="translate(3 3)" opacity="0.35" />
            <path d="M16 12C16 9.8 17.8 8 20 8H44C46.2 8 48 9.8 48 12V50L42 46L37 50L32 46L27 50L22 46L16 50V12Z" fill={`url(#${whitePorcelainId})`} />
            <rect x="22" y="16" width="20" height="4" rx="2" fill="#852BEB" />
            <rect x="22" y="24" width="16" height="3" rx="1.5" fill="#C4B5FD" />
            <rect x="22" y="30" width="12" height="3" rx="1.5" fill="#DDD6FE" />
            <circle cx="44" cy="41" r="10" fill={`url(#${lemonGoldId})`} stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M39.5 41L42.5 44L48.5 38" stroke="#1A132B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 4. Business Services & Enterprise Facilities */}
        {(iconKey === 'factory' || iconKey === 'business') && (
          <g>
            <rect x="10" y="34" width="44" height="20" rx="3" fill={`url(#${whitePorcelainId})`} />
            <path d="M10 34L22 24V34L34 24V34L46 24V34H10Z" fill={`url(#${purpleSilverId})`} />
            <rect x="44" y="12" width="8" height="16" rx="2" fill={`url(#${lemonGoldId})`} />
            <circle cx="48" cy="8" r="3" fill="#FFFFFF" fillOpacity="0.9" />
            <rect x="15" y="40" width="6" height="6" rx="1.5" fill="#852BEB" />
            <rect x="25" y="40" width="6" height="6" rx="1.5" fill="#852BEB" />
            <rect x="35" y="40" width="6" height="6" rx="1.5" fill="#F4E600" />
            <rect x="44" y="40" width="6" height="14" rx="1.5" fill={`url(#${deepIndigoId})`} />
          </g>
        )}

        {/* 5. Customer Accounts & VIP Occasions */}
        {(iconKey === 'heart' || iconKey === 'customer') && (
          <g>
            <rect x="11" y="15" width="42" height="34" rx="6" fill={`url(#${whitePorcelainId})`} />
            <rect x="11" y="29" width="42" height="6" fill={`url(#${lemonGoldId})`} />
            <rect x="29" y="15" width="6" height="34" fill={`url(#${lemonGoldId})`} />
            <path d="M32 42C32 42 19 33.5 19 24.5C19 20.5 22.2 17.5 26 17.5C28.5 17.5 30.8 18.8 32 20.8C33.2 18.8 35.5 17.5 38 17.5C41.8 17.5 45 20.5 45 24.5C45 33.5 32 42 32 42Z" fill="#852BEB" stroke="#FFFFFF" strokeWidth="2.5" />
          </g>
        )}

        {/* 6. Reports, Governance & Administration */}
        {(iconKey === 'shield' || iconKey === 'admin' || iconKey === 'reports') && (
          <g>
            <path d="M32 9L52 16.5V30C52 43 43.2 51.5 32 56C20.8 51.5 12 43 12 30V16.5L32 9Z" fill={`url(#${whitePorcelainId})`} />
            <path d="M32 13L47 18.5V30C47 40 40.3 47 32 51C23.7 47 17 40 17 30V18.5L32 13Z" fill={`url(#${lemonGoldId})`} />
            <path d="M24 31L29.5 36.5L41 25" stroke="#1A132B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 7. Delivery Fleet & Couriers */}
        {(iconKey === 'truck' || iconKey === 'delivery' || iconKey === 'driver' || iconKey === 'courier') && (
          <g>
            <ellipse cx="32" cy="51" rx="22" ry="3.5" fill="#2A1459" fillOpacity="0.4" />
            <rect x="8" y="17" width="31" height="24" rx="5" fill={`url(#${whitePorcelainId})`} />
            <rect x="13" y="23" width="21" height="4" rx="2" fill="#852BEB" />
            <rect x="13" y="30" width="14" height="3.5" rx="1.75" fill="#C4B5FD" />
            <path d="M39 23H49C52.5 23 55 26 55 30V41H39V23Z" fill={`url(#${lemonGoldId})`} />
            <path d="M42 26H49C50.5 26 52 27.5 52 29.5V33H42V26Z" fill={`url(#${deepIndigoId})`} />
            <circle cx="19" cy="43" r="6" fill={`url(#${deepIndigoId})`} stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="46" cy="43" r="6" fill={`url(#${deepIndigoId})`} stroke="#FFFFFF" strokeWidth="2.5" />
          </g>
        )}

        {/* 8. Business Opportunities & Usufruct / RFQ Contracts */}
        {(iconKey === 'file' || iconKey === 'opportunity' || iconKey === 'usufruct') && (
          <g>
            <rect x="14" y="13" width="32" height="42" rx="6" fill={`url(#${whitePorcelainId})`} />
            <rect x="22" y="8" width="16" height="8" rx="3" fill={`url(#${lemonGoldId})`} />
            <rect x="20" y="23" width="20" height="4" rx="2" fill="#852BEB" />
            <rect x="20" y="31" width="15" height="3.5" rx="1.75" fill="#C4B5FD" />
            <rect x="20" y="38" width="18" height="3.5" rx="1.75" fill="#DDD6FE" />
            <circle cx="46" cy="43" r="9.5" fill={`url(#${lemonGoldId})`} stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M42 46L46 40L50 46" stroke="#1A132B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 9. Gift Cards & Seasonal Boxes */}
        {(iconKey === 'gift' || iconKey === 'party') && (
          <g>
            <rect x="13" y="26" width="38" height="26" rx="5" fill={`url(#${whitePorcelainId})`} />
            <rect x="10" y="19" width="44" height="9" rx="3.5" fill={`url(#${purpleSilverId})`} />
            <rect x="28" y="19" width="8" height="33" fill={`url(#${lemonGoldId})`} />
            <path d="M32 19C26 11 18 12 20 19H32Z" fill={`url(#${lemonGoldId})`} />
            <path d="M32 19C38 11 46 12 44 19H32Z" fill={`url(#${lemonGoldId})`} />
          </g>
        )}

        {/* 10. Reservations & Bookings */}
        {iconKey === 'calendar' && (
          <g>
            <rect x="12" y="14" width="40" height="38" rx="6" fill={`url(#${whitePorcelainId})`} />
            <path d="M12 20C12 16.7 14.7 14 18 14H46C49.3 14 52 16.7 52 20V25H12V20Z" fill={`url(#${deepIndigoId})`} />
            <rect x="20" y="9" width="5" height="9" rx="2.5" fill={`url(#${lemonGoldId})`} />
            <rect x="39" y="9" width="5" height="9" rx="2.5" fill={`url(#${lemonGoldId})`} />
            <circle cx="32" cy="38" r="8" fill="#852BEB" />
            <path d="M29 38L31.5 40.5L36 35.5" stroke="#F4E600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* 11. Hospitality Majlis & Coffee Dallah */}
        {(iconKey === 'sparkles' || iconKey === 'coffee' || iconKey === 'banquet') && (
          <g>
            <ellipse cx="32" cy="52" rx="16" ry="3.5" fill="#2A1459" fillOpacity="0.4" />
            <path d="M23 48C21 40 22 31 27 26H37C42 31 43 40 41 48H23Z" fill={`url(#${lemonGoldId})`} />
            <path d="M24 31C16 28 13 21 15 16C17 20 20 24 25 27Z" fill={`url(#${lemonGoldId})`} />
            <path d="M38 28C46 28 48 39 40 43" stroke={`url(#${whitePorcelainId})`} strokeWidth="4" strokeLinecap="round" />
            <path d="M26 26L32 14L38 26H26Z" fill={`url(#${whitePorcelainId})`} />
            <circle cx="32" cy="12" r="2.5" fill="#FFFFFF" />
          </g>
        )}

        {/* 12. International Markets & Experiences / Circus */}
        {(iconKey === 'compass' || iconKey === 'globe') && (
          <g>
            <circle cx="32" cy="32" r="20" fill={`url(#${whitePorcelainId})`} />
            <ellipse cx="32" cy="32" rx="10" ry="20" stroke="#852BEB" strokeWidth="2.5" fill="none" />
            <line x1="12" y1="32" x2="52" y2="32" stroke="#852BEB" strokeWidth="2.5" />
            <circle cx="44" cy="20" r="6" fill={`url(#${lemonGoldId})`} stroke="#FFFFFF" strokeWidth="2" />
          </g>
        )}

        {iconKey === 'circus' && (
          <g>
            <ellipse cx="32" cy="51" rx="20" ry="4" fill="#2A1459" fillOpacity="0.4" />
            <path d="M11 33L32 14L53 33H11Z" fill={`url(#${whitePorcelainId})`} />
            <path d="M21 33L32 14L43 33H21Z" fill={`url(#${lemonGoldId})`} />
            <rect x="14" y="33" width="36" height="16" rx="2" fill={`url(#${purpleSilverId})`} />
            <path d="M26 49V38C26 35 28.5 33 32 33C35.5 33 38 35 38 38V49H26Z" fill="#852BEB" />
            <path d="M32 8L32 14" stroke="#F4E600" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* 13. Luxury Men's Barber Salon */}
        {iconKey === 'barber' && (
          <g>
            <ellipse cx="32" cy="52" rx="14" ry="3.5" fill="#2A1459" fillOpacity="0.4" />
            <rect x="14" y="16" width="14" height="32" rx="7" fill={`url(#${whitePorcelainId})`} />
            <path d="M15 24L27 20V25L15 29V24Z" fill="#852BEB" />
            <path d="M15 35L27 31V36L15 40V35Z" fill="#F4E600" />
            <circle cx="21" cy="14" r="5" fill={`url(#${lemonGoldId})`} />
            <path d="M34 42L48 16" stroke={`url(#${purpleSilverId})`} strokeWidth="4" strokeLinecap="round" />
            <path d="M50 42L36 16" stroke={`url(#${whitePorcelainId})`} strokeWidth="4" strokeLinecap="round" />
            <circle cx="34" cy="45" r="5" stroke={`url(#${lemonGoldId})`} strokeWidth="3" fill="none" />
            <circle cx="50" cy="45" r="5" stroke={`url(#${lemonGoldId})`} strokeWidth="3" fill="none" />
          </g>
        )}

        {/* 14. Spa, Steam Bath & Moroccan Hammam */}
        {iconKey === 'spa' && (
          <g>
            <ellipse cx="32" cy="51" rx="18" ry="4" fill="#2A1459" fillOpacity="0.4" />
            <path d="M14 34H50C50 43 42 49 32 49C22 49 14 43 14 34Z" fill={`url(#${whitePorcelainId})`} />
            <ellipse cx="32" cy="34" rx="18" ry="4" fill={`url(#${lemonGoldId})`} />
            <circle cx="25" cy="33" r="4" fill={`url(#${deepIndigoId})`} />
            <circle cx="39" cy="33" r="4" fill={`url(#${emeraldId})`} />
            <path d="M24 24C24 19 28 16 28 11" stroke="#F4E600" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 23C34 17 38 14 38 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* 15. Salt House */}
        {iconKey === 'salt' && (
          <g>
            <ellipse cx="32" cy="52" rx="18" ry="3.5" fill="#2A1459" fillOpacity="0.4" />
            <polygon points="32,10 48,24 44,47 20,47 16,24" fill={`url(#${whitePorcelainId})`} />
            <polygon points="32,10 48,24 32,33 16,24" fill={`url(#${lemonGoldId})`} />
            <polygon points="32,33 48,24 44,47 32,49" fill="#DDD6FE" />
            <circle cx="26" cy="20" r="2.2" fill="#FFFFFF" />
            <circle cx="46" cy="14" r="2" fill="#F4E600" />
          </g>
        )}

        {/* 16. Kids Area */}
        {iconKey === 'kids' && (
          <g>
            <ellipse cx="32" cy="52" rx="19" ry="3.5" fill="#2A1459" fillOpacity="0.4" />
            <rect x="12" y="29" width="18" height="18" rx="4" fill={`url(#${whitePorcelainId})`} />
            <rect x="34" y="29" width="18" height="18" rx="4" fill={`url(#${emeraldId})`} />
            <rect x="23" y="13" width="18" height="18" rx="4" fill={`url(#${lemonGoldId})`} />
            <polygon points="32,17 34.2,21.5 39,22.2 35.5,25.5 36.3,30.2 32,27.9 27.7,30.2 28.5,25.5 25,22.2 29.8,21.5" fill="#1A132B" />
          </g>
        )}

        {/* 17. Oriental Takht & Oud */}
        {iconKey === 'oud' && (
          <g>
            <ellipse cx="32" cy="52" rx="17" ry="3.5" fill="#2A1459" fillOpacity="0.4" />
            <path d="M44 13L50 18L36 33L30 28L44 13Z" fill={`url(#${deepIndigoId})`} />
            <ellipse cx="26" cy="39" rx="13" ry="11" transform="rotate(-25 26 39)" fill={`url(#${lemonGoldId})`} />
            <circle cx="27" cy="38" r="4.5" fill={`url(#${whitePorcelainId})`} />
            <circle cx="18" cy="19" r="3" fill="#F4E600" />
          </g>
        )}

        {/* 18. Offers & Coupons */}
        {iconKey === 'coupon' && (
          <g>
            <path d="M10 21C10 18.8 11.8 17 14 17H50C52.2 17 54 18.8 54 21V27C51.5 27 49.5 29 49.5 31.5C49.5 34 51.5 36 54 36V43C54 45.2 52.2 47 50 47H14C11.8 47 10 45.2 10 43V36C12.5 36 14.5 34 14.5 31.5C14.5 29 12.5 27 10 27V21Z" fill={`url(#${lemonGoldId})`} stroke="#FFFFFF" strokeWidth="2" />
            <line x1="25" y1="20" x2="25" y2="44" stroke="#1A132B" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="3 3" />
            <text x="39" y="36" textAnchor="middle" fill="#1A132B" fontSize="15" fontWeight="900">%</text>
          </g>
        )}

        {/* 19. Pizza */}
        {iconKey === 'pizza' && (
          <g>
            <path d="M32 10L53 46C46 50 39 52 32 52C25 52 18 50 11 46L32 10Z" fill={`url(#${lemonGoldId})`} />
            <path d="M14 43C20 46 26 48 32 48C38 48 44 46 50 43L53 46C46 50 39 52 32 52C25 52 18 50 11 46L14 43Z" fill={`url(#${whitePorcelainId})`} />
            <circle cx="32" cy="28" r="3.8" fill={`url(#${violetId})`} />
            <circle cx="25" cy="39" r="3.5" fill={`url(#${violetId})`} />
            <circle cx="39" cy="39" r="3.5" fill={`url(#${violetId})`} />
          </g>
        )}

        {/* 20. Grills */}
        {iconKey === 'grills' && (
          <g>
            <ellipse cx="32" cy="50" rx="18" ry="4" fill={`url(#${deepIndigoId})`} />
            <path d="M32 11C39 20 45 27 45 35C45 42 39.2 47 32 47C24.8 47 19 42 19 35C19 29 23 23 26 20C27 24 29 25 30 22C31 18 30 14 32 11Z" fill={`url(#${lemonGoldId})`} />
            <path d="M32 25C36 30 38 34 38 38C38 42 35.3 45 32 45C28.7 45 26 42 26 38C26 34 29 30 32 25Z" fill={`url(#${whitePorcelainId})`} />
          </g>
        )}

        {/* 21. Shopping, Markets & Merchants */}
        {(iconKey === 'sushi' || iconKey === 'market' || iconKey === 'merchant' || iconKey === 'store' || iconKey === 'shopping') && (
          <g>
            <rect x="11" y="25" width="42" height="25" rx="5" fill={`url(#${whitePorcelainId})`} />
            <path d="M9 25L15 14H49L55 25H9Z" fill={`url(#${lemonGoldId})`} />
            <rect x="23" y="34" width="18" height="16" rx="2.5" fill={`url(#${deepIndigoId})`} />
            <rect x="26" y="14" width="12" height="11" fill={`url(#${violetId})`} />
          </g>
        )}
      </svg>
    </div>
  );
};
