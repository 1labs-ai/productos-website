"use client"

// Isometric Agents Visual - Exact match to reference design
// 5 cubes connected by glowing road-style paths
export function IsometricAgentsVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 700 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
        style={{ maxHeight: '280px' }}
      >
        <defs>
          {/* Glow filter for paths */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Animated gradient for flow effect */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ========== ROAD-STYLE CONNECTING PATHS ========== */}
        
        {/* Path 1: Brain to Flowchart - curves up */}
        <g filter="url(#glow)">
          <path 
            d="M115 255 Q130 255 145 245 Q160 235 180 225 L220 205 Q240 195 260 180"
            stroke="rgba(255,255,255,0.25)" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M115 255 Q130 255 145 245 Q160 235 180 225 L220 205 Q240 195 260 180"
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="12" 
            fill="none"
            strokeLinecap="round"
          />
          {/* Center glow line */}
          <path 
            d="M115 255 Q130 255 145 245 Q160 235 180 225 L220 205 Q240 195 260 180"
            stroke="rgba(255,255,255,0.5)" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Path 2: Flowchart down to Code (center) */}
        <g filter="url(#glow)">
          <path 
            d="M310 200 Q325 210 335 225 L345 250 Q355 270 370 285 L395 305"
            stroke="rgba(255,255,255,0.25)" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M310 200 Q325 210 335 225 L345 250 Q355 270 370 285 L395 305"
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="12" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M310 200 Q325 210 335 225 L345 250 Q355 270 370 285 L395 305"
            stroke="rgba(255,255,255,0.5)" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Path 3: Code to Search cube */}
        <g filter="url(#glow)">
          <path 
            d="M450 330 L480 345 Q500 355 520 355 L540 355 Q560 355 575 340"
            stroke="rgba(255,255,255,0.25)" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M450 330 L480 345 Q500 355 520 355 L540 355 Q560 355 575 340"
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="12" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M450 330 L480 345 Q500 355 520 355 L540 355 Q560 355 575 340"
            stroke="rgba(255,255,255,0.5)" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Path 4: Search to Rocket */}
        <g filter="url(#glow)">
          <path 
            d="M615 300 Q630 285 640 265 Q650 245 660 225 L670 200"
            stroke="rgba(255,255,255,0.25)" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M615 300 Q630 285 640 265 Q650 245 660 225 L670 200"
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="12" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M615 300 Q630 285 640 265 Q650 245 660 225 L670 200"
            stroke="rgba(255,255,255,0.5)" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ========== CUBE 1: BRAIN (Left) ========== */}
        <g>
          {/* Cube faces */}
          <path d="M55 230 L90 210 L125 230 L90 250 Z" fill="#0a0a0a" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
          <path d="M55 230 L55 280 L90 300 L90 250 Z" fill="#080808" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <path d="M90 250 L90 300 L125 280 L125 230 Z" fill="#0c0c0c" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          
          {/* Brain icon with waves */}
          <g transform="translate(15, 185)">
            {/* Left waves */}
            <path d="M15 25 Q5 20 15 12" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
            <path d="M22 30 Q8 22 22 10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none"/>
            
            {/* Brain */}
            <path d="M55 15 C45 15 38 22 38 30 C38 35 40 38 40 38 C36 40 33 44 33 49 C33 55 38 60 45 60 L65 60 C72 60 77 55 77 49 C77 44 74 40 70 38 C70 38 72 35 72 30 C72 22 65 15 55 15" 
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <path d="M45 28 Q55 24 65 28 M45 42 Q55 38 65 42" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none"/>
            
            {/* Right waves */}
            <path d="M95 25 Q105 20 95 12" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
            <path d="M88 30 Q102 22 88 10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none"/>
          </g>
        </g>

        {/* ========== CUBE 2: FLOWCHART (Upper middle-left, tall) ========== */}
        <g>
          {/* Cube faces - taller */}
          <path d="M240 140 L285 115 L330 140 L285 165 Z" fill="#0a0a0a" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
          <path d="M240 140 L240 210 L285 235 L285 165 Z" fill="#080808" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <path d="M285 165 L285 235 L330 210 L330 140 Z" fill="#0c0c0c" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
          
          {/* Flowchart icon */}
          <g transform="translate(255, 55)">
            <rect x="15" y="5" width="25" height="14" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none"/>
            <line x1="27.5" y1="19" x2="27.5" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
            <line x1="27.5" y1="30" x2="12" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
            <line x1="27.5" y1="30" x2="43" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
            <rect x="2" y="42" width="20" height="12" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none"/>
            <rect x="33" y="42" width="20" height="12" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none"/>
          </g>
        </g>

        {/* ========== CUBE 3: CODE (Center, LARGEST) ========== */}
        <g>
          {/* Cube faces - largest */}
          <path d="M365 260 L420 225 L475 260 L420 295 Z" fill="#0a0a0a" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
          <path d="M365 260 L365 355 L420 390 L420 295 Z" fill="#080808" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
          <path d="M420 295 L420 390 L475 355 L475 260 Z" fill="#0c0c0c" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          
          {/* Code window icon */}
          <g transform="translate(378, 165)">
            <rect x="5" y="5" width="70" height="50" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <line x1="5" y1="18" x2="75" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            {/* Window dots */}
            <circle cx="14" cy="11.5" r="2.5" fill="rgba(255,255,255,0.4)"/>
            <circle cx="22" cy="11.5" r="2.5" fill="rgba(255,255,255,0.4)"/>
            <circle cx="30" cy="11.5" r="2.5" fill="rgba(255,255,255,0.4)"/>
            {/* Code text */}
            <text x="23" y="42" fontSize="18" fill="rgba(255,255,255,0.55)" fontFamily="monospace" fontWeight="500">&lt;/&gt;</text>
          </g>
        </g>

        {/* ========== CUBE 4: SEARCH/DB (Lower right) ========== */}
        <g>
          {/* Cube faces */}
          <path d="M555 295 L595 272 L635 295 L595 318 Z" fill="#0a0a0a" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
          <path d="M555 295 L555 360 L595 383 L595 318 Z" fill="#080808" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
          <path d="M595 318 L595 383 L635 360 L635 295 Z" fill="#0c0c0c" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          
          {/* Database + Search icon */}
          <g transform="translate(555, 220)">
            {/* Database */}
            <ellipse cx="22" cy="12" rx="16" ry="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none"/>
            <path d="M6 12 L6 35 C6 39 13 44 22 44 C31 44 38 39 38 35 L38 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none"/>
            <ellipse cx="22" cy="24" rx="16" ry="4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none"/>
            
            {/* Magnifying glass */}
            <circle cx="58" cy="25" r="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <line x1="67" y1="34" x2="78" y2="45" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        </g>

        {/* ========== CUBE 5: ROCKET (Right) ========== */}
        <g>
          {/* Cube faces */}
          <path d="M605 155 L650 130 L695 155 L650 180 Z" fill="#0a0a0a" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
          <path d="M605 155 L605 225 L650 250 L650 180 Z" fill="#080808" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          <path d="M650 180 L650 250 L695 225 L695 155 Z" fill="#0c0c0c" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
          
          {/* Rocket icon with smoke */}
          <g transform="translate(620, 40)">
            {/* Rocket body */}
            <path d="M30 20 L30 70 L22 82 L38 82 L30 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <path d="M18 70 L30 20 L42 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            {/* Fins */}
            <path d="M18 70 L8 82 L18 78" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none"/>
            <path d="M42 70 L52 82 L42 78" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none"/>
            {/* Window */}
            <circle cx="30" cy="45" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"/>
            
            {/* Smoke clouds */}
            <ellipse cx="30" cy="95" rx="18" ry="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"/>
            <ellipse cx="22" cy="102" rx="12" ry="6" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none"/>
            <ellipse cx="40" cy="100" rx="10" ry="5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
            <ellipse cx="30" cy="108" rx="22" ry="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
          </g>
        </g>

        {/* ========== ANIMATED FLOW PARTICLES ========== */}
        <circle r="4" fill="rgba(255,255,255,0.7)">
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            path="M115 255 Q130 255 145 245 Q160 235 180 225 L220 205 Q240 195 260 180"
          />
        </circle>
        <circle r="3" fill="rgba(255,255,255,0.5)">
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            begin="1s"
            path="M310 200 Q325 210 335 225 L345 250 Q355 270 370 285 L395 305"
          />
        </circle>
        <circle r="3" fill="rgba(255,255,255,0.5)">
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            begin="2s"
            path="M450 330 L480 345 Q500 355 520 355 L540 355 Q560 355 575 340"
          />
        </circle>
        <circle r="4" fill="rgba(255,255,255,0.7)">
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            begin="3s"
            path="M615 300 Q630 285 640 265 Q650 245 660 225 L670 200"
          />
        </circle>
      </svg>
    </div>
  )
}
