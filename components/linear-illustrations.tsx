"use client"

// Linear-inspired clean wireframe illustrations
// Minimal, isometric, lots of negative space

// Card 1: Agents that collaborate - 5 cubes in formation
export function AgentCubesIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      {/* FIG label */}
      <span className="absolute top-0 left-0 text-[10px] font-mono text-foreground/30 tracking-widest">
        FIG 0.1
      </span>
      
      <svg 
        viewBox="0 0 300 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
        style={{ maxHeight: '200px' }}
      >
        {/* Cube 1 - Back left */}
        <g opacity="0.4">
          <path d="M80 80 L110 65 L140 80 L110 95 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M80 80 L80 115 L110 130 L110 95 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M110 95 L110 130 L140 115 L140 80 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
        </g>
        
        {/* Cube 2 - Back right */}
        <g opacity="0.4">
          <path d="M160 80 L190 65 L220 80 L190 95 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M160 80 L160 115 L190 130 L190 95 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M190 95 L190 130 L220 115 L220 80 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
        </g>
        
        {/* Cube 3 - Center (main, larger) */}
        <g opacity="0.7">
          <path d="M110 110 L150 90 L190 110 L150 130 Z" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground"/>
          <path d="M110 110 L110 160 L150 180 L150 130 Z" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground"/>
          <path d="M150 130 L150 180 L190 160 L190 110 Z" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground"/>
          {/* Small detail on top face */}
          <circle cx="150" cy="110" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-foreground" opacity="0.5"/>
        </g>
        
        {/* Cube 4 - Front left */}
        <g opacity="0.5">
          <path d="M60 140 L90 125 L120 140 L90 155 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M60 140 L60 175 L90 190 L90 155 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M90 155 L90 190 L120 175 L120 140 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
        </g>
        
        {/* Cube 5 - Front right */}
        <g opacity="0.5">
          <path d="M180 140 L210 125 L240 140 L210 155 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M180 140 L180 175 L210 190 L210 155 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
          <path d="M210 155 L210 190 L240 175 L240 140 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
        </g>
      </svg>
    </div>
  )
}

// Card 2: Ship in days - Speed bars / runway perspective
export function SpeedBarsIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      {/* FIG label */}
      <span className="absolute top-0 left-0 text-[10px] font-mono text-foreground/30 tracking-widest">
        FIG 0.2
      </span>
      
      <svg 
        viewBox="0 0 340 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
        style={{ maxHeight: '180px' }}
      >
        {/* Converging speed lines - runway perspective */}
        
        {/* Top lines */}
        <path d="M40 60 L300 85" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.25"/>
        <path d="M40 75 L300 92" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.35"/>
        
        {/* Main track lines */}
        <path d="M40 95 L300 100" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground" opacity="0.5"/>
        <path d="M40 115 L300 108" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-foreground" opacity="0.6"/>
        
        {/* Bottom lines */}
        <path d="M40 135 L300 116" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.35"/>
        <path d="M40 150 L300 123" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" opacity="0.25"/>
        
        {/* Vertical markers along the track */}
        <line x1="80" y1="70" x2="80" y2="145" stroke="currentColor" strokeWidth="1" className="text-foreground" opacity="0.2"/>
        <line x1="130" y1="75" x2="130" y2="138" stroke="currentColor" strokeWidth="1" className="text-foreground" opacity="0.25"/>
        <line x1="180" y1="80" x2="180" y2="130" stroke="currentColor" strokeWidth="1" className="text-foreground" opacity="0.3"/>
        <line x1="230" y1="85" x2="230" y2="122" stroke="currentColor" strokeWidth="1" className="text-foreground" opacity="0.35"/>
        <line x1="280" y1="88" x2="280" y2="118" stroke="currentColor" strokeWidth="1" className="text-foreground" opacity="0.4"/>
        
        {/* End point / destination marker */}
        <g opacity="0.6">
          <line x1="300" y1="82" x2="300" y2="126" stroke="currentColor" strokeWidth="1.5" className="text-foreground"/>
          <path d="M300 82 L315 90 L300 98" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground"/>
        </g>
      </svg>
    </div>
  )
}

// Card 3: Built for founders - Layered cube
export function LayeredCubeIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      {/* FIG label */}
      <span className="absolute top-0 left-0 text-[10px] font-mono text-foreground/30 tracking-widest">
        FIG 0.3
      </span>
      
      <svg 
        viewBox="0 0 280 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
        style={{ maxHeight: '200px' }}
      >
        {/* Main cube outline */}
        <g className="text-foreground">
          {/* Top face */}
          <path 
            d="M90 70 L140 45 L190 70 L140 95 Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            fill="none"
            opacity="0.6"
          />
          
          {/* Left face */}
          <path 
            d="M90 70 L90 170 L140 195 L140 95 Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            fill="none"
            opacity="0.4"
          />
          
          {/* Right face */}
          <path 
            d="M140 95 L140 195 L190 170 L190 70 Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            fill="none"
            opacity="0.5"
          />
          
          {/* Horizontal layer lines on left face */}
          <line x1="90" y1="95" x2="140" y2="120" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          <line x1="90" y1="120" x2="140" y2="145" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          <line x1="90" y1="145" x2="140" y2="170" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          
          {/* Horizontal layer lines on right face */}
          <line x1="140" y1="120" x2="190" y2="95" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          <line x1="140" y1="145" x2="190" y2="120" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          <line x1="140" y1="170" x2="190" y2="145" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          
          {/* Top layer detail - rounded rectangle on top face */}
          <path 
            d="M110 72 Q140 60 170 72 Q140 84 110 72" 
            stroke="currentColor" 
            strokeWidth="0.8" 
            fill="none"
            opacity="0.4"
          />
          <path 
            d="M115 77 Q140 67 165 77 Q140 87 115 77" 
            stroke="currentColor" 
            strokeWidth="0.8" 
            fill="none"
            opacity="0.35"
          />
        </g>
      </svg>
    </div>
  )
}
