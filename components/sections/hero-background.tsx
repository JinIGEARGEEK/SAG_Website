"use client"

// Globe geometry — smaller, shifted right, clear of navbar
const GX = 820
const GY = 400
const R  = 210
const TILT = 20 * (Math.PI / 180)
const S = Math.sin(TILT)  // foreshorten y of latitude ellipses
const C = Math.cos(TILT)  // compress vertical position of latitude rings

// Office locations re-projected for GX=820, GY=400, R=210, center meridian ~50°E
const NODES = [
  { label: "Dublin",    cx: 660, cy: 242, delay: 0.0 },
  { label: "London",    cx: 665, cy: 246, delay: 1.4 },
  { label: "Vienna",    cx: 687, cy: 253, delay: 0.7 },
  { label: "Tel Aviv",  cx: 717, cy: 296, delay: 2.1 },
  { label: "Dubai",     cx: 783, cy: 316, delay: 0.3 },
  { label: "N.Delhi",   cx: 862, cy: 306, delay: 1.8 },
  { label: "Bangkok",   cx: 933, cy: 358, delay: 1.1 },
  { label: "Singapore", cx: 950, cy: 397, delay: 2.5 },
]

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [6, 7],
]

const LAT_ANGLES = [0, 30, 60]
const LON_ANGLES = [0, 30, 60, 90]

function arc(a: { cx: number; cy: number }, b: { cx: number; cy: number }) {
  const mx = (a.cx + b.cx) / 2
  const my = (a.cy + b.cy) / 2 - 20
  return `M${a.cx},${a.cy} Q${mx},${my} ${b.cx},${b.cy}`
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <style>{`
        @keyframes hbg-node  { 0%,100%{opacity:.2}  50%{opacity:1} }
        @keyframes hbg-ring  { 0%{opacity:.55;transform:scale(1)} 100%{opacity:0;transform:scale(4.5)} }
        @keyframes hbg-globe { 0%,100%{opacity:.18} 50%{opacity:.28} }
        @keyframes hbg-glow  { 0%,100%{opacity:.85;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
      `}</style>

      {/* Dark radial base */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 150% 100% at 68% 110%, #122d50 0%, #070f1e 50%, #020810 100%)",
      }} />

      {/* Blue atmospheric glow — left behind text */}
      <div className="absolute" style={{
        left: "20%", top: "40%", width: "480px", height: "380px",
        background: "radial-gradient(ellipse, rgba(22,58,115,0.55) 0%, transparent 68%)",
        transform: "translate(-50%,-50%)",
        animation: "hbg-glow 8s ease-in-out infinite",
      }} />

      {/* Cyan glow — globe area */}
      <div className="absolute" style={{
        left: "76%", top: "52%", width: "520px", height: "400px",
        background: "radial-gradient(ellipse, rgba(55,130,180,0.22) 0%, transparent 62%)",
        transform: "translate(-50%,-50%)",
        animation: "hbg-glow 11s ease-in-out infinite",
        animationDelay: "4.5s",
      }} />

      {/* Globe wireframe + city nodes */}
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ animation: "hbg-globe 8s ease-in-out infinite" }}
      >
        <defs>
          <clipPath id="hbg-clip">
            <circle cx={GX} cy={GY} r={R + 1} />
          </clipPath>
          {/* Glow filter for city nodes */}
          <filter id="hbg-node-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hbg-node-glow-soft" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="7" result="blur" />
          </filter>
        </defs>

        {/* Latitude ellipses */}
        {LAT_ANGLES.map(phi => {
          const p  = phi * Math.PI / 180
          const rx = R * Math.cos(p)
          const ry = rx * S
          const dy = R * Math.sin(p) * C
          return (
            <g key={phi} clipPath="url(#hbg-clip)">
              <ellipse cx={GX} cy={GY - dy} rx={rx} ry={ry} fill="none" stroke="rgba(100,165,225,0.42)" strokeWidth="0.5" />
              {phi > 0 && <ellipse cx={GX} cy={GY + dy} rx={rx} ry={ry} fill="none" stroke="rgba(100,165,225,0.42)" strokeWidth="0.5" />}
            </g>
          )
        })}

        {/* Longitude ellipses */}
        {LON_ANGLES.map(theta => {
          const t  = theta * Math.PI / 180
          const rx = theta === 0 ? 0.4 : R * Math.sin(t)
          const ry = R * C
          return (
            <ellipse key={theta} cx={GX} cy={GY} rx={rx} ry={ry}
              fill="none" stroke="rgba(100,165,225,0.42)" strokeWidth="0.5"
              clipPath="url(#hbg-clip)" />
          )
        })}

        {/* Globe outline */}
        <circle cx={GX} cy={GY} r={R} fill="none" stroke="rgba(120,185,240,0.9)" strokeWidth="1" />

        {/* Connection arcs between offices */}
        {CONNECTIONS.map(([a, b]) => (
          <path key={`${a}-${b}`} d={arc(NODES[a], NODES[b])}
            fill="none" stroke="rgba(90,180,210,0.45)" strokeWidth="0.9" />
        ))}

        {/* City nodes */}
        {NODES.map(node => (
          <g key={node.label} style={{ animation: "hbg-node 3.5s ease-in-out infinite", animationDelay: `${node.delay}s` }}>
            {/* Soft outer glow bloom */}
            <circle cx={node.cx} cy={node.cy} r={6}
              fill="rgba(120,210,255,0.35)"
              filter="url(#hbg-node-glow-soft)" />
            {/* Expanding pulse ring */}
            <circle cx={node.cx} cy={node.cy} r={5}
              fill="none" stroke="rgba(120,210,255,0.55)" strokeWidth="0.8"
              style={{
                animation: "hbg-ring 3.5s ease-out infinite",
                animationDelay: `${node.delay}s`,
                transformOrigin: `${node.cx}px ${node.cy}px`,
              }} />
            {/* Core dot with glow filter */}
            <circle cx={node.cx} cy={node.cy} r={2.8}
              fill="rgba(220,245,255,1)"
              filter="url(#hbg-node-glow)" />
          </g>
        ))}
      </svg>

    </div>
  )
}
