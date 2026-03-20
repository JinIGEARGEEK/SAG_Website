"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

/* ── Data ── */

const DEFAULT_ACTIVE = "UK"

const LOCATIONS = [
  { label: "UK",        city: "London",    lng: -0.1278,  lat: 51.5074 },
  { label: "Ireland",   city: "Dublin",    lng: -6.2603,  lat: 53.3498 },
  { label: "Austria",   city: "Vienna",    lng: 16.3738,  lat: 48.2082 },
  { label: "Israel",    city: "Tel Aviv",  lng: 34.7818,  lat: 32.0853 },
  { label: "UAE",       city: "Dubai",     lng: 55.2708,  lat: 25.2048 },
  { label: "India",     city: "New Delhi", lng: 77.2090,  lat: 28.6139 },
  { label: "Thailand",  city: "Bangkok",   lng: 100.5018, lat: 13.7563 },
  { label: "Singapore", city: "Singapore", lng: 103.8198, lat: 1.3521  },
] as const

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [2, 3], [3, 4],
  [4, 5], [5, 6], [6, 7],
  [0, 4], [2, 5], [5, 7],
]

const COUNTRY_LABELS = LOCATIONS.map((l) => l.label)

/* ── Helpers ── */

function buildBezierArc(
  start: [number, number],
  end: [number, number],
  steps = 80,
  bowFactor = 0.25,
): [number, number][] {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const dist = Math.sqrt(dx * dx + dy * dy)
  const mx = (start[0] + end[0]) / 2
  const my = (start[1] + end[1]) / 2
  const cx = mx - (dy / dist) * dist * bowFactor
  const cy = my + (dx / dist) * dist * bowFactor

  const coords: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const it = 1 - t
    coords.push([
      it * it * start[0] + 2 * it * t * cx + t * t * end[0],
      it * it * start[1] + 2 * it * t * cy + t * t * end[1],
    ])
  }
  coords[0] = start
  coords[steps] = end
  return coords
}

function buildLineFeatures(): GeoJSON.FeatureCollection<GeoJSON.LineString> {
  return {
    type: "FeatureCollection",
    features: CONNECTIONS.map(([a, b]) => ({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: buildBezierArc(
          [LOCATIONS[a].lng, LOCATIONS[a].lat],
          [LOCATIONS[b].lng, LOCATIONS[b].lat],
        ),
      },
    })),
  }
}

function getResponsiveMapConfig(width: number) {
  if (width < 480) return { zoom: 1.0, center: [55, 30] as [number, number] }
  if (width < 768) return { zoom: 1.5, center: [55, 30] as [number, number] }
  return { zoom: 2.0, center: [48, 30] as [number, number] }
}

function createMarkerElement(label: string, staggerIndex: number) {
  const el = document.createElement("div")
  el.className = label === DEFAULT_ACTIVE ? "sag-node sag-node--active" : "sag-node"
  el.dataset.label = label

  const delay = staggerIndex * 0.4

  const wave1 = document.createElement("div")
  wave1.className = "sag-node-wave"
  wave1.style.animationDelay = `${delay}s`
  el.appendChild(wave1)

  const wave2 = document.createElement("div")
  wave2.className = "sag-node-wave"
  wave2.style.animationDelay = `${delay + 1}s`
  el.appendChild(wave2)

  for (const cls of ["sag-node-glow", "sag-node-core"]) {
    const div = document.createElement("div")
    div.className = cls
    el.appendChild(div)
  }

  return el
}

/* ── Map style ── */

const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "cyber-dark",
  sources: {
    countries: {
      type: "vector",
      url: "https://demotiles.maplibre.org/tiles/tiles.json",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "rgba(0,0,0,0)" },
    },
    {
      id: "countries-fill",
      type: "fill",
      source: "countries",
      "source-layer": "countries",
      paint: { "fill-color": "#1A3E6D", "fill-opacity": 0.6 },
    },
    {
      id: "countries-border",
      type: "line",
      source: "countries",
      "source-layer": "countries",
      paint: { "line-color": "#489AAF", "line-width": 0.6, "line-opacity": 0.5 },
    },
  ],
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
}

/* ── CSS ── */

const NODE_STYLES = `
  .sag-node {
    width: 0; height: 0;
    cursor: pointer;
    position: relative;
    overflow: visible;
  }
  .sag-node-wave {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(72,154,175,0.6);
    animation: sag-wave 2.5s ease-out infinite;
    pointer-events: none;
  }
  .sag-node--active .sag-node-wave,
  .sag-node:hover .sag-node-wave {
    border-color: rgba(255,255,255,0.7);
  }
  @keyframes sag-wave {
    0%   { width: 8px; height: 8px; top: -4px; left: -4px; opacity: 0.8; }
    100% { width: 48px; height: 48px; top: -24px; left: -24px; opacity: 0; }
  }
  .sag-node-glow {
    position: absolute; width: 20px; height: 20px;
    top: -10px; left: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(72,154,175,0.3) 0%, transparent 70%);
    pointer-events: none;
  }
  .sag-node--active .sag-node-glow,
  .sag-node:hover .sag-node-glow {
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  }
  .sag-node-core {
    position: absolute; width: 8px; height: 8px;
    top: -4px; left: -4px;
    border-radius: 50%;
    background: #489AAF;
    box-shadow: 0 0 6px rgba(72,154,175,0.8), 0 0 14px rgba(72,154,175,0.3);
    pointer-events: none;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .sag-node--active .sag-node-core,
  .sag-node:hover .sag-node-core {
    background: #ffffff;
    box-shadow: 0 0 6px rgba(255,255,255,0.8), 0 0 14px rgba(255,255,255,0.3);
  }
  .sag-cyber-popup .maplibregl-popup-content {
    background: rgba(10, 25, 50, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(59,130,246,0.3);
    border-radius: 4px;
    padding: 0;
    box-shadow: 0 0 20px rgba(59,130,246,0.15), 0 4px 12px rgba(0,0,0,0.4);
  }
  .sag-cyber-popup .maplibregl-popup-tip {
    border-top-color: rgba(10, 25, 50, 0.9);
  }
  .sag-cyber-popup-inner { padding: 8px 14px; }
  .sag-cyber-popup-label {
    font-size: 13px; font-weight: 600;
    color: #93C5FD; letter-spacing: 0.02em;
  }
  .sag-cyber-popup-sub {
    font-size: 10px; font-weight: 500;
    color: rgba(148,163,184,0.7);
    text-transform: uppercase;
    letter-spacing: 0.08em; margin-top: 1px;
  }
  .maplibregl-canvas { outline: none; }
`

/* ── Component ── */

export function GlobalPresenceSection() {
  const [active, setActive] = useState(DEFAULT_ACTIVE)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const { zoom, center } = getResponsiveMapConfig(mapContainer.current.clientWidth)

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center,
      zoom,
      minZoom: zoom,
      maxZoom: zoom,
      attributionControl: false,
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
      touchZoomRotate: false,
      touchPitch: false,
      doubleClickZoom: false,
      keyboard: false,
      pitchWithRotate: false,
    })

    map.on("load", () => {
      // Route lines
      map.addSource("routes", { type: "geojson", data: buildLineFeatures() })
      map.addLayer({
        id: "routes-glow",
        type: "line",
        source: "routes",
        paint: { "line-color": "#60A5FA", "line-width": 3, "line-opacity": 0.2, "line-blur": 4 },
      })
      map.addLayer({
        id: "routes-line",
        type: "line",
        source: "routes",
        paint: { "line-color": "#60A5FA", "line-width": 1, "line-opacity": 0.4, "line-dasharray": [4, 4] },
      })

      // Markers
      LOCATIONS.forEach((loc, i) => {
        const el = createMarkerElement(loc.label, i)

        const popup = new maplibregl.Popup({
          offset: 20,
          closeButton: false,
          closeOnClick: false,
          className: "sag-cyber-popup",
        }).setHTML(`
          <div class="sag-cyber-popup-inner">
            <div class="sag-cyber-popup-label">${loc.city}</div>
            <div class="sag-cyber-popup-sub">${loc.label}</div>
          </div>
        `)

        el.addEventListener("mouseenter", () => popup.addTo(map))
        el.addEventListener("mouseleave", () => popup.remove())

        const marker = new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([loc.lng, loc.lat])
          .setPopup(popup)
          .addTo(map)

        markersRef.current.push(marker)

        if (loc.label === DEFAULT_ACTIVE) popup.addTo(map)
      })
    })

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = []
    }
  }, [])

  // Sync active state to markers
  useEffect(() => {
    markersRef.current.forEach((marker) => {
      const el = marker.getElement()
      const label = el.dataset.label
      if (label === active) {
        el.classList.add("sag-node--active")
        marker.getPopup()?.addTo(mapRef.current!)
      } else {
        el.classList.remove("sag-node--active")
        if (!el.matches(":hover")) marker.getPopup()?.remove()
      }
    })
  }, [active])

  return (
    <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--gradient-primary)" }}>
      <style>{NODE_STYLES}</style>

      <div className="site-container">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-28 mb-8 md:mb-12">
          <div className="lg:w-2/5 shrink-0">
            <h2 className="text-heading-2 text-white mb-1">International Presence</h2>
            <p className="text-body-small leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Stern Advisory Global supports engagements across multiple regions
              through its direct presence and international advisory network.
            </p>
          </div>

          <div className="lg:w-3/5 flex flex-wrap lg:flex-nowrap items-end gap-x-4 gap-y-2 md:gap-x-6 lg:gap-x-8">
            {COUNTRY_LABELS.map((c) => (
              <span
                key={c}
                className="text-body-small cursor-pointer transition-colors duration-200"
                style={{ color: active === c ? "#ffffff" : "#489AAF" }}
                onMouseEnter={() => setActive(c)}
                onClick={() => setActive(c)}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.1)" }}>
          <div
            ref={mapContainer}
            className="w-full"
            style={{ height: "clamp(240px, 40vw, 460px)", background: "transparent" }}
          />
        </div>
      </div>
    </section>
  )
}
