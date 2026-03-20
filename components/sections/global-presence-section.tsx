"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const LOCATIONS = [
  { label: "UK",        city: "London",     lng: -0.1278,  lat: 51.5074 },
  { label: "Ireland",   city: "Dublin",     lng: -6.2603,  lat: 53.3498 },
  { label: "Austria",   city: "Vienna",     lng: 16.3738,  lat: 48.2082 },
  { label: "Israel",    city: "Tel Aviv",   lng: 34.7818,  lat: 32.0853 },
  { label: "UAE",       city: "Dubai",      lng: 55.2708,  lat: 25.2048 },
  { label: "India",     city: "New Delhi",  lng: 77.2090,  lat: 28.6139 },
  { label: "Thailand",  city: "Bangkok",    lng: 100.5018, lat: 13.7563 },
  { label: "Singapore", city: "Singapore",  lng: 103.8198, lat: 1.3521  },
]

/* Network connections between nodes — pairs of indices */
const CONNECTIONS: [number, number][] = [
  [0, 1], // London ↔ Dublin
  [0, 2], // London ↔ Vienna
  [2, 3], // Vienna ↔ Tel Aviv
  [3, 4], // Tel Aviv ↔ Dubai
  [4, 5], // Dubai ↔ New Delhi
  [5, 6], // New Delhi ↔ Bangkok
  [6, 7], // Bangkok ↔ Singapore
  [0, 4], // London ↔ Dubai
  [2, 5], // Vienna ↔ New Delhi
  [5, 7], // New Delhi ↔ Singapore
]

const COUNTRIES = LOCATIONS.map((l) => l.label)

/** Build GeoJSON curved arc features — quadratic Bézier for oval-like curves */
function buildLineFeatures(): GeoJSON.Feature<GeoJSON.LineString>[] {
  return CONNECTIONS.map(([a, b]) => {
    const start: [number, number] = [LOCATIONS[a].lng, LOCATIONS[a].lat]
    const end: [number, number] = [LOCATIONS[b].lng, LOCATIONS[b].lat]
    const steps = 80

    // Midpoint
    const mx = (start[0] + end[0]) / 2
    const my = (start[1] + end[1]) / 2

    // Perpendicular offset for oval curve
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const dist = Math.sqrt(dx * dx + dy * dy)
    const offset = dist * 0.25 // how far the curve bows out

    // Control point — perpendicular to the line, offset upward-left
    const cx = mx - (dy / dist) * offset
    const cy = my + (dx / dist) * offset

    const coords: [number, number][] = []
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const it = 1 - t
      // Quadratic Bézier: B(t) = (1-t)²·P0 + 2(1-t)t·C + t²·P1
      const lng = it * it * start[0] + 2 * it * t * cx + t * t * end[0]
      const lat = it * it * start[1] + 2 * it * t * cy + t * t * end[1]
      coords.push([lng, lat])
    }
    // Pin endpoints exactly
    coords[0] = start
    coords[steps] = end

    return {
      type: "Feature" as const,
      properties: {},
      geometry: { type: "LineString" as const, coordinates: coords },
    }
  })
}


export function GlobalPresenceSection() {
  const [hovered, setHovered] = useState<string>("UK")
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
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
            paint: {
              "fill-color": "#1A3E6D",
              "fill-opacity": 0.6,
            },
          },
          {
            id: "countries-border",
            type: "line",
            source: "countries",
            "source-layer": "countries",
            paint: {
              "line-color": "#489AAF",
              "line-width": 0.6,
              "line-opacity": 0.5,
            },
          },
        ],
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      },
      center: [48, 30],
      zoom: 2.0,
      minZoom: 2.0,
      maxZoom: 2.0,
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
      // ── Route lines (GeoJSON) ──
      map.addSource("routes", {
        type: "geojson",
        data: { type: "FeatureCollection", features: buildLineFeatures() },
      })
      map.addLayer({
        id: "routes-glow",
        type: "line",
        source: "routes",
        paint: {
          "line-color": "#60A5FA",
          "line-width": 3,
          "line-opacity": 0.2,
          "line-blur": 4,
        },
      })
      map.addLayer({
        id: "routes-line",
        type: "line",
        source: "routes",
        paint: {
          "line-color": "#60A5FA",
          "line-width": 1,
          "line-opacity": 0.4,
          "line-dasharray": [4, 4],
        },
      })

      // ── HTML markers with animated white wave ──
      LOCATIONS.forEach((loc, i) => {
        const el = document.createElement("div")
        el.className = loc.label === "UK" ? "sag-node sag-node--active" : "sag-node"
        el.dataset.label = loc.label
        el.style.animationDelay = `${i * 0.4}s`

        // Wave ring 1
        const wave1 = document.createElement("div")
        wave1.className = "sag-node-wave"
        wave1.style.animationDelay = `${i * 0.4}s`
        el.appendChild(wave1)

        // Wave ring 2 (staggered)
        const wave2 = document.createElement("div")
        wave2.className = "sag-node-wave sag-node-wave--delayed"
        wave2.style.animationDelay = `${i * 0.4 + 1}s`
        el.appendChild(wave2)

        // Glow
        const glow = document.createElement("div")
        glow.className = "sag-node-glow"
        el.appendChild(glow)

        // Core dot
        const core = document.createElement("div")
        core.className = "sag-node-core"
        el.appendChild(core)

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

        // Show UK popup on initial load
        if (loc.label === "UK") {
          popup.addTo(map)
        }
      })
    })

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = []
    }
  }, [])

  // Hover sync from country tags
  useEffect(() => {
    markersRef.current.forEach((marker) => {
      const el = marker.getElement()
      const label = el.dataset.label
      if (label === hovered) {
        el.classList.add("sag-node--active")
        marker.getPopup()?.addTo(mapRef.current!)
      } else {
        el.classList.remove("sag-node--active")
        if (!el.matches(":hover")) marker.getPopup()?.remove()
      }
    })
  }, [hovered])

  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--gradient-primary)" }}>
      <style>{`
        /* ── Node — zero-size anchor so center aligns exactly with the coordinate ── */
        .sag-node {
          width: 0; height: 0;
          cursor: pointer;
          position: relative;
          overflow: visible;
        }

        /* Wave rings — blue by default */
        .sag-node-wave {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(72,154,175,0.6);
          animation: sag-wave 2.5s ease-out infinite;
          pointer-events: none;
        }
        /* Active/hovered node — white wave */
        .sag-node--active .sag-node-wave,
        .sag-node:hover .sag-node-wave {
          border-color: rgba(255,255,255,0.7);
        }

        @keyframes sag-wave {
          0%   { width: 8px; height: 8px; top: -4px; left: -4px; opacity: 0.8; }
          100% { width: 48px; height: 48px; top: -24px; left: -24px; opacity: 0; }
        }

        /* Ambient glow — blue by default */
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

        /* Core dot — blue by default */
        .sag-node-core {
          position: absolute; width: 8px; height: 8px;
          top: -4px; left: -4px;
          border-radius: 50%;
          background: #489AAF;
          box-shadow: 0 0 6px rgba(72,154,175,0.8), 0 0 14px rgba(72,154,175,0.3);
          pointer-events: none;
          transition: background 0.2s, box-shadow 0.2s;
        }
        /* Active/hovered node — white dot */
        .sag-node--active .sag-node-core,
        .sag-node:hover .sag-node-core {
          background: #ffffff;
          box-shadow: 0 0 6px rgba(255,255,255,0.8), 0 0 14px rgba(255,255,255,0.3);
        }

        /* ── Popup ── */
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
        .sag-cyber-popup-inner {
          padding: 8px 14px;
        }
        .sag-cyber-popup-label {
          font-size: 13px; font-weight: 600;
          color: #93C5FD;
          letter-spacing: 0.02em;
        }
        .sag-cyber-popup-sub {
          font-size: 10px; font-weight: 500;
          color: rgba(148,163,184,0.7);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 1px;
        }

        .maplibregl-canvas { outline: none; }
      `}</style>

      <div className="site-container">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end mb-12" style={{ gap: "112px" }}>
          <div className="lg:w-2/5 shrink-0">
            <h2 className="text-heading-2 text-white mb-1">International Presence</h2>
            <p className="text-body-small leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Stern Advisory Global supports engagements across multiple regions
              through its direct presence and international advisory network.
            </p>
          </div>

          <div className="lg:w-3/5 flex flex-nowrap items-end gap-x-8">
            {COUNTRIES.map((c) => (
              <span
                key={c}
                className="text-body-small cursor-pointer transition-colors duration-200"
                style={{ color: hovered === c ? "#ffffff" : "#489AAF" }}
                onMouseEnter={() => setHovered(c)}
                onClick={() => setHovered(c)}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.1)" }}>
          <div
            ref={mapContainer}
            className="w-full"
            style={{ height: "460px", background: "transparent" }}
          />
        </div>
      </div>
    </section>
  )
}
