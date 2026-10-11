import { Users, Zap, ArrowRight } from 'lucide-react';

interface BFSLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBorder?: boolean;
}

export const BFSLogo: React.FC<BFSLogoProps> = ({
  size = 'md',
  className = '',
  showBorder = true,
}) => {
  const dimensions = {
    xs: { w: 28, h: 28, fSize: 32, strokeW: 3.5 },
    sm: { w: 36, h: 36, fSize: 36, strokeW: 4.5 },
    md: { w: 46, h: 46, fSize: 38, strokeW: 5.5 },
    lg: { w: 60, h: 60, fSize: 40, strokeW: 6.5 },
    xl: { w: 88, h: 88, fSize: 42, strokeW: 7.5 },
    '2xl': { w: 120, h: 120, fSize: 42, strokeW: 8.5 },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#121426] via-[#090b16] to-[#04050a] shadow-xl shadow-blue-950/40 select-none shrink-0 ${
        showBorder ? 'border border-[#222842]/80 ring-1 ring-blue-500/10' : ''
      } ${className}`}
      style={{ width: dimensions.w, height: dimensions.h }}
      aria-label="Logo BFS - BASIC FRANCE (B blanc, F bleu foncé, S blanc)"
    >
      {/* Background Deep Blue / Midnight Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.35)_0%,rgba(9,11,22,0.8)_70%,transparent_100%)] pointer-events-none" />

      {/* Cyber/Tech Corner Accent Dots */}
      <div className="absolute top-1 right-1.5 flex gap-0.5 opacity-60">
        <span className="h-1 w-1 rounded-full bg-blue-500"></span>
        <span className="h-1 w-1 rounded-full bg-white/40"></span>
      </div>
      <div className="absolute bottom-1 left-1.5 flex gap-0.5 opacity-40">
        <span className="h-0.5 w-1 rounded-full bg-blue-400"></span>
      </div>

      {/* SVG Canvas for B (White) F (Bleu Foncé) S (White) + Dynamic Graffiti Slash */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-0.5 select-none overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="whiteLetterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* Dark Blue / Bleu Foncé Gradient with high contrast against dark bg */}
          <linearGradient id="blueFoncedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="60%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="neonBlueGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Electric Blue Graffiti Brush Stroke in Background */}
        <path
          d="M 10 58 C 18 30, 42 22, 54 36 C 64 50, 36 78, 48 82 C 60 84, 88 44, 92 34 C 74 30, 38 44, 26 68"
          stroke="#1d4ed8"
          strokeWidth={dimensions.strokeW}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          filter="url(#neonBlueGlow)"
        />

        {/* Secondary subtle brush line */}
        <path
          d="M 14 54 Q 38 28 54 38 T 48 76 Q 66 48 88 38"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />

        {/* The 3 Letters: B in White, F in Bleu Foncé, S in White */}
        <g
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize={dimensions.fSize}
          letterSpacing="-1.2"
        >
          {/* Drop shadow layer for crisp 3D separation */}
          <text x="49" y="66" textAnchor="middle" fill="#030408" opacity="0.9" filter="drop-shadow(0 2px 4px #000)">
            <tspan dx="-2">B</tspan>
            <tspan dx="1">F</tspan>
            <tspan dx="1">S</tspan>
          </text>

          {/* Main Foreground Text: B (White), F (Bleu Foncé), S (White) */}
          <text x="49" y="65" textAnchor="middle">
            {/* Letter B : Pure Blanc */}
            <tspan fill="url(#whiteLetterGrad)" dx="-2">
              B
            </tspan>

            {/* Letter F : Bleu Foncé avec contour net */}
            <tspan
              fill="url(#blueFoncedGrad)"
              stroke="#38bdf8"
              strokeWidth="0.8"
              dx="1"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(37,99,235,0.7))',
              }}
            >
              F
            </tspan>

            {/* Letter S : Pure Blanc */}
            <tspan fill="url(#whiteLetterGrad)" dx="1">
              S
            </tspan>
          </text>
        </g>

        {/* Foreground Electric Blue accent swoosh over the letters */}
        <path
          d="M 28 48 C 38 42, 50 40, 62 43"
          stroke="#60a5fa"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

export const BFSBrandLockup: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}> = ({ size = 'md', className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-3 select-none cursor-pointer group ${className}`}
    >
      <BFSLogo size={size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm'} />
      <div className="flex flex-col">
        <span className="font-luxury font-black italic tracking-[0.14em] sm:tracking-[0.22em] text-white text-xs sm:text-base uppercase group-hover:text-blue-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          BASIC FRANCE
        </span>
      </div>
    </div>
  );
};

export const BasicFranceBanner: React.FC<{
  className?: string;
  showActions?: boolean;
  onShopClick?: () => void;
  onReferralClick?: () => void;
  discordUrl?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}> = ({
  className = '',
  showActions = true,
  onShopClick,
  onReferralClick,
  discordUrl = 'https://discord.gg/basicfrance',
  primaryActionLabel = 'Découvrir la boutique',
  secondaryActionLabel = 'Gagner 10% de commission',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#232b47] bg-[#070912] shadow-2xl shadow-blue-950/50 select-none ${className}`}
    >
      {/* Background Radial Light Beams & Dark Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.32)_0%,rgba(13,16,30,0.7)_55%,#05060b_100%)] pointer-events-none" />
      
      {/* Subtle Athletic Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cyber Corner Marks (hidden on small mobile to avoid crowding) */}
      <div className="hidden sm:block absolute top-3 left-3 text-blue-500/40 font-mono text-[10px] tracking-widest pointer-events-none">
        ┌ BFS // 01
      </div>
      <div className="hidden sm:block absolute top-3 right-3 text-blue-500/40 font-mono text-[10px] tracking-widest pointer-events-none">
        COMMUNITY ┐
      </div>
      <div className="hidden sm:block absolute bottom-3 left-3 text-blue-500/40 font-mono text-[10px] tracking-widest pointer-events-none">
        └ FRANCE
      </div>
      <div className="hidden sm:block absolute bottom-3 right-3 text-blue-500/40 font-mono text-[10px] tracking-widest pointer-events-none">
        SOUS 12H ┘
      </div>

      <div className="relative z-10 px-4 py-6 sm:px-8 sm:py-10 md:py-12 md:px-12 flex flex-col items-center justify-center text-center">
        
        {/* Top Badges Strip: Official Discord Status */}
        <div className="mb-3 sm:mb-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-[#0d152c]/80 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-[11px] font-bold text-blue-400 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SERVEUR DISCORD OFFICIEL</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#263152] bg-[#0c1224]/80 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-[11px] text-slate-300 backdrop-blur-md">
            <Users className="h-3 w-3 text-blue-400" />
            <span>14,850+ MEMBRES</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-blue-900/40 bg-[#0a1020]/80 px-3 py-1 font-mono text-[11px] text-blue-300 backdrop-blur-md">
            <Zap className="h-3 w-3 text-amber-400" />
            <span>LIVRAISON NUMÉRIQUE SOUS 12H</span>
          </div>
        </div>

        {/* Centerpiece: Discord Banner Typography Reproduction */}
        <div className="relative my-1 sm:my-3 flex items-center justify-center">
          {/* Ambient Backlight Glow */}
          <div className="absolute -inset-6 bg-blue-600/25 blur-2xl rounded-full pointer-events-none" />

          <div className="relative flex items-center justify-center">
            {/* Electric Blue Graffiti / Cursive Script Background Layer */}
            <span
              aria-hidden="true"
              className="absolute font-brand italic font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1d4ed8] tracking-wider opacity-85 blur-[1.2px] select-none scale-105 transform -rotate-2"
              style={{
                textShadow: '0 0 20px #1d4ed8, 0 0 40px #2563eb, 0 0 10px #60a5fa',
                fontFamily: 'cursive, "Brush Script MT", sans-serif',
              }}
            >
              Basic France
            </span>

            {/* Electric blue secondary script stroke over the letters */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              viewBox="0 0 500 100"
              fill="none"
            >
              <path
                d="M 20 62 Q 85 10 170 52 T 310 46 Q 410 15 485 58"
                stroke="#1d4ed8"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.8"
                style={{ filter: 'drop-shadow(0 0 10px #2563eb)' }}
              />
              <path
                d="M 45 64 Q 130 18 245 55 T 445 46"
                stroke="#60a5fa"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>

            {/* Foreground Bold Italic White "BASIC FRANCE" Typography with 3D Depth */}
            <h2
              className="relative z-10 font-luxury font-black italic tracking-[0.10em] sm:tracking-[0.14em] text-white uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
              style={{
                textShadow: '0 0 3px rgba(255,255,255,0.9), 0 4px 14px rgba(0,0,0,0.9), 0 0 16px rgba(37,99,235,0.4)',
              }}
            >
              BASIC FRANCE
            </h2>
          </div>
        </div>

        {/* Subtitle with Dark Premium Athletic Vibe */}
        <p className="mt-2.5 sm:mt-4 max-w-2xl text-[11px] sm:text-xs md:text-sm font-medium text-slate-300 leading-relaxed px-2">
          La marketplace digitale et communauté officielle pour les passionnés de musculation et de fitness en France. Gagnez 10% sur chaque abonnement recommandé.
        </p>

        {/* High-conversion action row */}
        {showActions && (
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            {onShopClick && (
              <button
                onClick={onShopClick}
                className="group/cta relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-blue-950/60 hover:from-blue-600 hover:to-blue-400 hover:shadow-blue-600/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/cta:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />
                <span>{primaryActionLabel}</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </button>
            )}

            {onReferralClick && (
              <button
                onClick={onReferralClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-purple-200 shadow-lg shadow-purple-950/30 transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/20 active:scale-[0.98] cursor-pointer"
              >
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{secondaryActionLabel}</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
