"use client"

import { useState } from "react"

const COUNTRIES = ["UK", "Ireland", "Austria", "Israel", "UAE", "India", "Thailand", "Singapore"]

export function GlobalPresenceSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--gradient-primary)" }}>
      <div className="site-container">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end mb-12" style={{ gap: "112px" }}>
          {/* Left: title + subtitle */}
          <div className="lg:w-2/5 shrink-0">
            <h2 className="text-heading-2 text-white mb-1">International Presence</h2>
            <p className="text-body-small leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Stern Advisory Global supports engagements across multiple regions
              through its direct presence and international advisory network.
            </p>
          </div>

          {/* Right: country tags */}
          <div className="lg:w-3/5 flex flex-nowrap items-end gap-x-8">
            {COUNTRIES.map((c) => (
              <span
                key={c}
                className="text-body-small cursor-pointer transition-colors duration-200"
                style={{ color: hovered === c ? "#ffffff" : "rgba(255,255,255,0.55)" }}
                onMouseEnter={() => setHovered(c)}
                onMouseLeave={() => setHovered(null)}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Map + Stats container */}
        <div className="overflow-hidden">
          {/* World map */}
          <div className="relative w-full" style={{ paddingTop: "42%" }}>
            <div className="absolute inset-0">
              <WorldMapSVG hovered={hovered} />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

const PINS: { cx: number; cy: number; label: string; city: string }[] = [
  { cx: 473, cy: 90,  label: "UK",        city: "London, UK" },
  { cx: 460, cy: 95,  label: "Ireland",   city: "Dublin, Ireland" },
  { cx: 518, cy: 88,  label: "Austria",   city: "Vienna, Austria" },
  { cx: 568, cy: 144, label: "Israel",    city: "Tel Aviv, Israel" },
  { cx: 588, cy: 160, label: "UAE",       city: "Dubai, UAE" },
  { cx: 643, cy: 192, label: "India",     city: "Mumbai, India" },
  { cx: 768, cy: 218, label: "Thailand",  city: "Bangkok, Thailand" },
  { cx: 796, cy: 230, label: "Singapore", city: "Singapore" },
]

function WorldMapSVG({ hovered }: { hovered: string | null }) {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const activePin = hoveredPin ?? hovered

  const CONTINENT_PATHS = [
    // Greenland
    "M 290,5 C 312,2 355,4 385,15 C 408,24 418,42 414,62 C 408,82 388,96 360,100 C 330,104 298,92 282,74 C 266,56 265,30 278,14 Z",
    // Alaska peninsula
    "M 18,130 C 28,118 46,112 62,118 C 74,124 78,138 68,148 C 56,156 36,150 24,140 Z",
    // North America
    "M 62,100 C 82,84 112,76 140,78 C 164,80 182,90 192,106 C 172,106 158,108 150,112 C 160,116 172,118 182,128 C 188,140 186,158 176,170 C 162,184 142,190 128,182 C 116,175 108,160 108,142 C 100,148 94,158 96,170 C 92,182 84,190 76,186 C 68,180 66,166 70,152 C 60,162 50,175 48,190 C 44,206 50,222 60,232 C 56,230 46,230 38,224 C 32,218 30,208 34,196 C 28,204 24,216 28,228 C 32,240 42,248 54,252 C 68,256 84,252 96,244 C 112,260 118,280 118,300 C 118,320 110,338 98,350 C 90,358 80,362 70,358 L 48,390 L 140,418 L 196,400 L 214,378 C 224,368 230,354 228,340 C 236,350 240,364 236,378 C 248,370 258,358 260,344 C 264,360 264,376 258,390 L 280,390 C 286,374 290,356 288,338 C 296,350 298,366 294,380 L 314,368 C 316,352 312,336 304,324 C 314,332 322,344 324,358 L 338,348 C 336,332 326,318 312,310 C 322,312 332,318 338,328 L 348,316 C 342,302 328,292 312,288 C 298,285 284,290 276,300 C 280,288 292,278 306,276 C 288,264 266,262 248,270 C 258,256 276,250 294,252 C 308,254 320,262 328,274 C 328,258 322,242 312,230 C 326,236 338,248 342,264 C 348,248 346,230 338,216 C 344,220 350,228 352,238 C 356,222 354,204 344,190 C 338,182 328,176 318,174 C 324,166 334,162 344,164 C 342,152 332,142 320,138 C 312,134 302,134 294,138 C 296,130 304,122 314,120 C 302,112 286,110 274,116 C 270,106 270,94 276,86 C 264,90 256,100 256,112 C 248,100 244,86 248,72 C 238,80 232,92 232,106 C 224,94 220,80 224,66 C 210,74 202,88 202,104 C 194,90 192,74 198,60 C 184,66 176,80 176,96 C 170,82 170,66 178,52 C 164,58 156,72 156,88 C 148,74 148,58 156,44 C 140,50 132,64 132,80 C 122,66 122,50 132,36 C 116,42 108,56 110,72 C 98,58 98,42 108,28 C 90,34 82,48 84,64 C 74,50 74,34 84,20 C 66,26 58,40 60,56 C 50,42 52,26 62,14 Z",
    // Central America
    "M 196,378 C 206,372 218,372 226,380 C 230,390 224,402 214,406 C 204,408 196,400 196,390 Z",
    // South America
    "M 222,358 C 238,342 262,334 284,338 C 306,342 322,358 326,376 C 330,396 322,416 306,426 C 290,436 270,436 254,426 C 238,416 226,398 222,378 Z M 240,416 C 248,430 256,444 258,460 L 248,460 C 244,446 238,432 232,420 Z",
    // Iceland
    "M 418,44 C 430,38 448,38 458,48 C 466,58 462,74 450,80 C 436,84 420,76 416,62 C 412,50 414,46 418,44 Z",
    // UK
    "M 454,76 C 462,70 474,70 480,80 C 484,90 480,104 470,108 C 460,110 450,102 450,90 Z",
    // Ireland
    "M 444,82 C 450,76 460,76 464,84 C 466,92 460,100 452,100 C 444,98 440,90 444,82 Z",
    // Scandinavia
    "M 484,28 C 502,20 528,22 544,36 C 556,48 556,66 548,80 C 538,94 518,102 500,98 C 482,94 470,78 472,60 C 472,46 476,34 484,28 Z",
    // Continental Europe
    "M 460,86 C 484,76 522,74 556,84 C 578,92 594,110 594,130 C 594,150 580,166 560,172 C 536,178 508,170 490,154 C 470,138 456,116 460,86 Z",
    // Russia + Central Asia (large)
    "M 556,20 C 630,8 740,6 840,16 C 910,24 960,44 980,70 C 995,90 990,120 970,138 C 945,158 905,164 860,158 C 810,152 755,132 702,120 C 652,110 604,104 568,90 C 546,78 542,46 556,20 Z",
    // Middle East
    "M 554,128 C 580,118 632,118 666,134 C 690,146 700,170 694,194 C 686,218 658,232 628,228 C 596,224 568,204 556,178 C 544,152 542,138 554,128 Z",
    // Africa
    "M 462,150 C 490,138 542,134 576,148 C 604,160 622,184 626,214 C 630,248 618,284 600,314 C 580,346 550,366 516,370 C 480,372 448,352 430,320 C 412,288 408,246 416,208 C 424,170 440,158 462,150 Z",
    // Madagascar
    "M 596,274 C 606,266 620,268 626,280 C 630,294 622,310 610,314 C 598,316 590,304 596,274 Z",
    // India
    "M 624,156 C 650,146 684,148 702,164 C 718,178 722,204 716,228 C 708,252 686,268 660,270 C 632,270 610,252 602,226 C 594,200 600,166 624,156 Z",
    // South/SE Asia mainland
    "M 694,136 C 730,122 780,120 820,136 C 848,148 864,172 860,198 C 854,226 828,244 796,248 C 760,252 720,236 702,210 C 682,182 674,152 694,136 Z",
    // East Asia (China/Korea)
    "M 752,68 C 816,56 892,60 940,82 C 968,96 982,122 976,150 C 968,178 940,196 904,200 C 864,204 818,188 790,164 C 762,140 746,108 752,68 Z",
    // Japan
    "M 934,82 C 948,72 968,72 978,84 C 986,96 982,116 968,124 C 952,130 934,120 932,106 Z",
    // Maritime SE Asia / Indonesia
    "M 754,252 C 790,238 846,236 886,252 C 912,264 924,288 916,310 C 906,332 876,342 842,336 C 808,330 776,312 758,286 C 742,262 742,258 754,252 Z",
    // Philippines
    "M 866,192 C 880,182 900,184 908,198 C 914,210 908,228 894,234 C 878,240 862,228 864,212 Z",
    // Australia
    "M 784,286 C 832,268 904,266 952,288 C 982,304 1000,334 998,368 C 994,402 966,424 928,428 C 886,432 840,414 814,386 C 788,360 762,316 784,286 Z",
    // New Zealand
    "M 966,340 C 978,330 994,332 1000,346 C 1006,360 1000,378 986,382 C 972,384 958,372 966,340 Z",
  ]

  return (
    <svg
      viewBox="0 0 1000 420"
      className="w-full h-full"
      style={{ backgroundColor: "transparent" }}
    >
      <defs>
        {/* Small dot pattern */}
        <pattern id="dotpat" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.3" fill="var(--color-primary-bg)" />
        </pattern>

        {/* Clip path = all land areas */}
        <clipPath id="landmask">
          {CONTINENT_PATHS.map((d, i) => <path key={i} d={d} />)}
        </clipPath>

        {/* Glow filter */}
        <filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="pinGlowBig" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Dotted world map ── */}
      <rect width="1000" height="420" fill="url(#dotpat)" clipPath="url(#landmask)" />

      {/* ── Pins ── */}
      {PINS.map((pin) => {
        const active = activePin === pin.label
        return (
          <g
            key={pin.label}
            style={{ cursor: "default" }}
            onMouseEnter={() => setHoveredPin(pin.label)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            {/* Outer glow ring */}
            <circle
              cx={pin.cx} cy={pin.cy}
              r={active ? 18 : 10}
              fill={active ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.08)"}
              filter={active ? "url(#pinGlowBig)" : "url(#pinGlow)"}
              style={{ transition: "all 0.25s" }}
            />
            {/* Mid ring */}
            {active && (
              <circle cx={pin.cx} cy={pin.cy} r="10"
                fill="none" stroke="rgba(99,102,241,0.35)" strokeWidth="1.5" />
            )}
            {/* Core dot */}
            <circle
              cx={pin.cx} cy={pin.cy}
              r={active ? 5 : 3.5}
              fill={active ? "#6366F1" : "#818CF8"}
              style={{ transition: "all 0.25s" }}
            />
            <circle
              cx={pin.cx} cy={pin.cy}
              r={active ? 5 : 3.5}
              fill="none" stroke="#ffffff" strokeWidth="1.2"
              style={{ transition: "all 0.25s" }}
            />
          </g>
        )
      })}

      {/* ── Tooltips (rendered last so they appear above all pins) ── */}
      {PINS.map((pin) => {
        const active = activePin === pin.label
        if (!active) return null
        const tw = 130; const th = 40
        const tx = pin.cx - tw / 2
        const ty = pin.cy - th / 2
        const cx = pin.cx; const cy = pin.cy + th / 2
        return (
          <g
            key={`tooltip-${pin.label}`}
            style={{
              pointerEvents: "none",
              transformOrigin: `${cx}px ${cy}px`,
              animation: "tooltipIn 0.18s ease-out both",
            }}
          >
            <rect x={tx} y={ty} width={tw} height={th} rx="4"
              fill="white" stroke="#E2E8F0" strokeWidth="1"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))" }} />
            <text x={tx + 10} y={ty + 14} fontSize="8.5" fontWeight="600"
              fill="#0F172A" fontFamily="Inter, sans-serif">
              {pin.city}
            </text>
            <text x={tx + 10} y={ty + 26} fontSize="7.5"
              fill="#64748B" fontFamily="Inter, sans-serif">
              {pin.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
