"use client"

import { useEffect, useRef } from "react"

// Office nodes on the radar (x, y as fraction of canvas 0–1)
const BLIPS = [
  { x: 0.52, y: 0.32, delay: 0.0 },  // London / Dublin
  { x: 0.58, y: 0.38, delay: 0.6 },  // Vienna
  { x: 0.65, y: 0.50, delay: 1.2 },  // Tel Aviv
  { x: 0.72, y: 0.54, delay: 0.3 },  // Dubai
  { x: 0.80, y: 0.48, delay: 1.8 },  // New Delhi
  { x: 0.88, y: 0.60, delay: 0.9 },  // Bangkok
  { x: 0.90, y: 0.68, delay: 2.1 },  // Singapore
]

export function HeroBackgroundRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrame: number
    let angle = 0  // sweep angle in radians

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Track when each blip was last "hit" by the sweep
    const blipHitTime: number[] = new Array(BLIPS.length).fill(-999)

    function draw(timestamp: number) {
      const w = canvas.width
      const h = canvas.height

      // Radar centred slightly right of hero content
      const cx = w * 0.68
      const cy = h * 0.52
      const maxR = Math.min(w, h) * 0.42

      ctx.clearRect(0, 0, w, h)

      // ── Concentric rings ──────────────────────────────────────────
      for (let i = 1; i <= 4; i++) {
        const r = (i / 4) * maxR
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(72,154,175,${0.08 + i * 0.03})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // ── Cross hairs ───────────────────────────────────────────────
      ctx.strokeStyle = "rgba(72,154,175,0.10)"
      ctx.lineWidth = 0.6
      ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke()

      // ── Sweep gradient (conic-like via arc fill) ──────────────────
      const sweepSpan = Math.PI * 0.55
      const grad = ctx.createConicalGradient
        ? null  // not standard; use manual approach below
        : null

      // Draw sweep as filled arc sector
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxR, angle - sweepSpan, angle, false)
      ctx.closePath()

      // Radial fade for the sweep
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
      sweepGrad.addColorStop(0,   "rgba(72,200,220,0.0)")
      sweepGrad.addColorStop(0.3, "rgba(72,180,210,0.04)")
      sweepGrad.addColorStop(1,   "rgba(72,154,175,0.12)")
      ctx.fillStyle = sweepGrad
      ctx.fill()
      ctx.restore()

      // Sweep leading edge (bright line)
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
      ctx.strokeStyle = "rgba(120,220,240,0.55)"
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()

      // ── Check blip hits ───────────────────────────────────────────
      BLIPS.forEach((blip, idx) => {
        const bx = blip.x * w
        const by = blip.y * h
        const dx = bx - cx
        const dy = by - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > maxR) return  // outside radar

        // Blip angle
        const bAngle = Math.atan2(dy, dx)
        // Normalise both angles to [0, 2π]
        const norm = (a: number) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const diff = norm(angle) - norm(bAngle)
        if (diff >= 0 && diff < 0.12) {
          blipHitTime[idx] = timestamp
        }
      })

      // ── Draw blips ────────────────────────────────────────────────
      BLIPS.forEach((blip, idx) => {
        const bx = blip.x * w
        const by = blip.y * h
        const dx = bx - cx
        const dy = by - cy
        if (Math.sqrt(dx * dx + dy * dy) > maxR) return

        const age    = (timestamp - blipHitTime[idx]) / 1000  // seconds since last hit
        const decay  = Math.max(0, 1 - age / 2.5)             // fade over 2.5s

        if (decay <= 0) return

        // Expanding ring
        const ringR = 4 + (1 - decay) * 14
        ctx.beginPath()
        ctx.arc(bx, by, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(100,220,240,${decay * 0.5})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Glow bloom
        const bloom = ctx.createRadialGradient(bx, by, 0, bx, by, 10)
        bloom.addColorStop(0,   `rgba(160,240,255,${decay * 0.6})`)
        bloom.addColorStop(1,   "rgba(72,154,175,0)")
        ctx.beginPath()
        ctx.arc(bx, by, 10, 0, Math.PI * 2)
        ctx.fillStyle = bloom
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(bx, by, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,245,255,${decay * 0.9 + 0.1})`
        ctx.fill()
      })

      // Always draw dim static dot for all blips
      BLIPS.forEach((blip) => {
        const bx = blip.x * w
        const by = blip.y * h
        const dx = bx - cx, dy = by - cy
        if (Math.sqrt(dx * dx + dy * dy) > maxR) return
        ctx.beginPath()
        ctx.arc(bx, by, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(140,210,230,0.25)"
        ctx.fill()
      })

      // ── Advance sweep ─────────────────────────────────────────────
      angle = (angle + 0.008) % (Math.PI * 2)
      animFrame = requestAnimationFrame(draw)
    }

    animFrame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Dark base */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 160% 100% at 65% 115%, #0C2640 0%, #060F1C 52%, #020810 100%)",
      }} />

      {/* Left atmospheric glow behind text */}
      <div className="absolute" style={{
        left: "22%", top: "40%", width: "480px", height: "380px",
        background: "radial-gradient(ellipse, rgba(16,46,95,0.5) 0%, transparent 68%)",
        transform: "translate(-50%,-50%)",
      }} />

      {/* Radar canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
