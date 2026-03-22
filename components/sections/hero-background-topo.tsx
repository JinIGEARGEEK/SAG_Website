"use client"

import { useEffect, useRef } from "react"

export function HeroBackgroundTopo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrame: number
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Generate contour line paths using layered sine waves
    function getY(x: number, lineIndex: number, time: number) {
      const h = canvas.height
      const base = h * (0.15 + lineIndex * 0.072)
      return (
        base +
        Math.sin(x * 0.004 + lineIndex * 0.8 + time * 0.3) * 38 +
        Math.sin(x * 0.009 + lineIndex * 1.4 + time * 0.18) * 22 +
        Math.sin(x * 0.002 + lineIndex * 0.5 + time * 0.12) * 55
      )
    }

    function draw() {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const lineCount = 14

      for (let i = 0; i < lineCount; i++) {
        const progress = i / lineCount          // 0 = top, 1 = bottom
        const alpha    = 0.06 + progress * 0.22  // lines get slightly brighter lower

        ctx.beginPath()
        for (let x = 0; x <= w; x += 3) {
          const y = getY(x, i, t)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }

        // Cyan-blue gradient stroke
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0,    `rgba(60,140,210,0)`)
        grad.addColorStop(0.15, `rgba(80,160,230,${alpha})`)
        grad.addColorStop(0.5,  `rgba(100,185,245,${alpha * 1.4})`)
        grad.addColorStop(0.85, `rgba(80,160,230,${alpha})`)
        grad.addColorStop(1,    `rgba(60,140,210,0)`)

        ctx.strokeStyle = grad
        ctx.lineWidth   = 1.2
        ctx.stroke()
      }

      t += 0.008
      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Dark base */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 160% 100% at 60% 120%, #0D2844 0%, #060F1C 50%, #020810 100%)",
      }} />

      {/* Left atmospheric glow behind text */}
      <div className="absolute" style={{
        left: "22%", top: "38%", width: "500px", height: "400px",
        background: "radial-gradient(ellipse, rgba(18,50,100,0.5) 0%, transparent 68%)",
        transform: "translate(-50%,-50%)",
      }} />

      {/* Animated contour canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40" style={{
        background: "linear-gradient(to top, #020810, transparent)",
      }} />
    </div>
  )
}
