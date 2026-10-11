import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

/**
 * Basic-Fit Official Brand Logo
 * Authentic, iconic vibrant orange brand badge with pure white athletic typography and signature swoosh.
 * Clean, recognizable, and perfectly proportioned.
 */
export const BasicFitLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 sm:h-7',
    md: 'h-7 sm:h-9',
    lg: 'h-8 sm:h-10 md:h-11',
    hero: 'h-8 sm:h-10 md:h-12 max-h-12',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none max-w-full ${className}`}
      aria-label="Logo Basic-Fit"
    >
      <svg
        viewBox="0 0 280 70"
        className={`${sizeClasses} w-auto max-w-full drop-shadow-[0_4px_16px_rgba(234,88,12,0.35)] transition-transform duration-200`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bfOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7000" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="bfDropShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Authentic Orange Pill Badge */}
        <rect
          x="3"
          y="4"
          width="274"
          height="62"
          rx="16"
          fill="url(#bfOrangeGrad)"
          stroke="#ff8f3d"
          strokeWidth="1.2"
        />

        {/* Subtle Speed Slash Accent Cut */}
        <path
          d="M 178 4 L 160 66 L 168 66 L 186 4 Z"
          fill="#c2410c"
          opacity="0.35"
        />

        {/* Main Brand Typography: "BASIC-FIT" */}
        <text
          x="140"
          y="45"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="33"
          letterSpacing="0.04em"
          filter="url(#bfDropShadow)"
        >
          BASIC-FIT
        </text>

        {/* Iconic Athletic Curve Swoosh Underneath */}
        <path
          d="M 44 54 Q 140 60 236 54"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.95"
        />
      </svg>
    </div>
  );
};

/**
 * Fitness Park Official Brand Logo
 * Authentic high-contrast Black & Electric Yellow athletic branding with signature angled stripes.
 * Clean, bold, iconic and perfectly proportioned.
 */
export const FitnessParkLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 sm:h-7',
    md: 'h-7 sm:h-9',
    lg: 'h-8 sm:h-10 md:h-11',
    hero: 'h-8 sm:h-10 md:h-12 max-h-12',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none max-w-full ${className}`}
      aria-label="Logo Fitness Park"
    >
      <svg
        viewBox="0 0 290 70"
        className={`${sizeClasses} w-auto max-w-full drop-shadow-[0_4px_16px_rgba(234,179,8,0.25)] transition-transform duration-200`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fpYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <filter id="fpDropShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Dark High-Performance Container */}
        <rect
          x="3"
          y="4"
          width="284"
          height="62"
          rx="14"
          fill="#0b0d14"
          stroke="#272e42"
          strokeWidth="1.4"
        />

        {/* Angled Yellow Kinetic Accent Stripes */}
        <polygon
          points="16,4 28,4 16,66 4,66"
          fill="url(#fpYellowGrad)"
        />
        <polygon
          points="274,4 286,4 274,66 262,66"
          fill="url(#fpYellowGrad)"
          opacity="0.35"
        />

        {/* Typography: "FITNESS" (White) + "PARK" (Electric Yellow) */}
        <g
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="30"
          letterSpacing="0.04em"
          filter="url(#fpDropShadow)"
        >
          <text x="56" y="44" fill="#ffffff">
            FITNESS
          </text>
          <text x="176" y="44" fill="url(#fpYellowGrad)">
            PARK
          </text>
        </g>

        {/* Underline Sharp Accent */}
        <line
          x1="56"
          y1="52"
          x2="252"
          y2="52"
          stroke="url(#fpYellowGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const BrandThumbnail: React.FC<{
  categoryId?: string;
  productId?: string;
  className?: string;
  fallbackImage?: string;
}> = ({ categoryId = '', productId = '', className = 'h-10 w-10', fallbackImage }) => {
  const isBasicFit = categoryId === 'basic-fit' || productId.includes('bf');
  const isFitnessPark = categoryId === 'fitness-park' || productId.includes('fp');

  if (isBasicFit) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg border border-orange-500/30 bg-gradient-to-br from-[#1c100a] via-[#0f0906] to-[#070503] flex items-center justify-center p-1 shadow-sm select-none ${className}`}
        title="Basic-Fit"
      >
        <div className="absolute inset-0 bg-orange-600/20 blur-sm pointer-events-none" />
        <div className="relative z-10 transform scale-75">
          <BasicFitLogo size="sm" />
        </div>
      </div>
    );
  }

  if (isFitnessPark) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg border border-yellow-500/30 bg-gradient-to-br from-[#18180a] via-[#0e0f07] to-[#070704] flex items-center justify-center p-1 shadow-sm select-none ${className}`}
        title="Fitness Park"
      >
        <div className="absolute inset-0 bg-yellow-500/20 blur-sm pointer-events-none" />
        <div className="relative z-10 transform scale-75">
          <FitnessParkLogo size="sm" />
        </div>
      </div>
    );
  }

  if (fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt="Produit"
        className={`shrink-0 rounded-lg object-cover ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-[#1e273e] bg-[#0c1220] flex items-center justify-center ${className}`}
    >
      <span className="font-mono text-[10px] text-blue-400 font-bold">BFS</span>
    </div>
  );
};
