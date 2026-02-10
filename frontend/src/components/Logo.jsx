import React from 'react';

export const Logo = ({ className = "", size = "default" }) => {
  const sizes = {
    small: { width: 120, height: 32 },
    default: { width: 140, height: 40 },
    large: { width: 180, height: 52 }
  };
  
  const { width, height } = sizes[size] || sizes.default;
  
  return (
    <svg 
      viewBox="0 0 140 40" 
      width={width} 
      height={height} 
      className={className}
      aria-label="Xtrec Logo"
    >
      {/* Connected nodes mark - 3 nodes forming abstract X pattern */}
      <g>
        {/* Top left node */}
        <circle cx="12" cy="12" r="4" fill="#002E5D" />
        {/* Top right node */}
        <circle cx="28" cy="12" r="4" fill="#002E5D" />
        {/* Bottom center node */}
        <circle cx="20" cy="28" r="4" fill="#002E5D" />
        {/* Connection lines */}
        <line x1="12" y1="12" x2="20" y2="28" stroke="#002E5D" strokeWidth="2" />
        <line x1="28" y1="12" x2="20" y2="28" stroke="#002E5D" strokeWidth="2" />
        <line x1="12" y1="12" x2="28" y2="12" stroke="#002E5D" strokeWidth="2" opacity="0.5" />
      </g>
      
      {/* Wordmark */}
      <text 
        x="44" 
        y="27" 
        fontFamily="Outfit, sans-serif" 
        fontSize="22" 
        fontWeight="600" 
        fill="#002E5D"
        letterSpacing="-0.5"
      >
        Xtrec
      </text>
    </svg>
  );
};

export const LogoMark = ({ className = "", size = 40 }) => {
  return (
    <svg 
      viewBox="0 0 40 40" 
      width={size} 
      height={size} 
      className={className}
      aria-label="Xtrec Logo Mark"
    >
      <g>
        {/* Top left node */}
        <circle cx="12" cy="12" r="4" fill="#002E5D" />
        {/* Top right node */}
        <circle cx="28" cy="12" r="4" fill="#002E5D" />
        {/* Bottom center node */}
        <circle cx="20" cy="28" r="4" fill="#002E5D" />
        {/* Connection lines */}
        <line x1="12" y1="12" x2="20" y2="28" stroke="#002E5D" strokeWidth="2" />
        <line x1="28" y1="12" x2="20" y2="28" stroke="#002E5D" strokeWidth="2" />
        <line x1="12" y1="12" x2="28" y2="12" stroke="#002E5D" strokeWidth="2" opacity="0.5" />
      </g>
    </svg>
  );
};

export default Logo;
