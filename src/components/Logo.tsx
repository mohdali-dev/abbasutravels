/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';
  
  // High-fidelity exact brand colors from the new logo image
  const blueColor = isLight ? '#ffffff' : '#1d448a';
  const orangeColor = '#f9a01b';
  const textColor = isLight ? '#ffffff' : '#1d448a';
  const subtextColor = isLight ? 'rgba(255, 255, 255, 0.8)' : '#1d448a';

  return (
    <div id="abbasu-logo" className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* High-Fidelity Vector Representation of the New Logo */}
      <svg
        width="68"
        height="64"
        viewBox="0 0 110 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-[1.05]"
      >
        {/* Globe Background - Golden Orange */}
        <circle cx="45" cy="52" r="30" fill={orangeColor} />

        {/* Detailed Continental Shapes (White) clipped inside the globe circle */}
        <g clipPath="url(#globe-clip)">
          {/* North America / Europe */}
          <path
            d="M 22,32 C 24,30 28,29 32,32 C 34,34 31,37 36,36 C 39,35 41,39 37,44 C 33,48 25,46 22,42 Z"
            fill="#ffffff"
          />
          {/* Greenland / Northern Isles */}
          <path
            d="M 33,26 C 35,25 38,26 38,28 C 36,30 32,29 33,26 Z"
            fill="#ffffff"
          />
          {/* Africa / Middle East */}
          <path
            d="M 37,45 C 41,43 47,45 49,49 C 51,52 46,56 44,61 C 42,66 36,65 36,59 C 36,54 33,48 37,45 Z"
            fill="#ffffff"
          />
          {/* South America */}
          <path
            d="M 23,51 C 25,51 27,54 27,58 C 27,62 23,68 21,67 C 19,65 19,56 23,51 Z"
            fill="#ffffff"
          />
          {/* Far East / Asia part */}
          <path
            d="M 50,36 C 54,36 58,39 56,43 C 54,47 61,49 59,54 C 56,58 53,54 50,49 Z"
            fill="#ffffff"
          />
          {/* Dynamic highlighting / shading of globe */}
          <circle cx="45" cy="52" r="30" fill="url(#globe-gradient)" style={{ mixBlendMode: 'multiply' }} />
        </g>

        {/* Clip-path definition for globe continents */}
        <defs>
          <clipPath id="globe-clip">
            <circle cx="45" cy="52" r="30" />
          </clipPath>
          <radialGradient id="globe-gradient" cx="35" cy="42" r="30" fx="35" fy="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Back orbit swoosh coming from the bottom-right */}
        <path
          d="M 40,75 C 50,77 59,70 61,58 C 63,48 59,40 56,36 C 57,39 59,47 57,56 C 55,64 48,70 40,75 Z"
          fill={blueColor}
        />

        {/* Main front orbit swoosh crossing diagonally */}
        <path
          d="M 38,72 C 22,77 9,70 7,58 C 5,46 16,40 31,43 C 46,46 66,35 82,19 L 85,22 C 69,39 48,49 32,46 C 18,43 10,48 11,56 C 13,64 24,71 38,72 Z"
          fill={blueColor}
        />

        {/* Beautiful sleek airplane at the end of the front orbit (rotated ~42 degrees) */}
        <g transform="translate(81, 21) rotate(42)">
          <path
            d="M 0,-14 L 3,-4 L 14,-2 L 14,1 L 3,0 L 2,9 L 7,12 L 7,14 L 0,12 L -7,14 L -7,12 L -2,9 L -3,0 L -14,1 L -14,-2 L -3,-4 Z"
            fill={blueColor}
          />
        </g>
      </svg>

      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-baseline">
          <span
            className="font-sans text-3xl font-black tracking-[-0.02em]"
            style={{ color: textColor }}
          >
            ABBASU
          </span>
        </div>
        <div className="mt-[-2px]">
          <span
            className="font-sans text-xs sm:text-sm font-bold tracking-[0.1em] whitespace-nowrap block"
            style={{ color: orangeColor }}
          >
            TRAVELS &amp; TOURS
          </span>
        </div>
        <div className="mt-0.5">
          <span
            className="font-sans text-[9px] font-medium tracking-[0.06em]"
            style={{ color: subtextColor }}
          >
            Your Journey Begins Here.
          </span>
        </div>
      </div>
    </div>
  );
}
