"use client"

import { useEffect, useRef, useState } from "react"

const OFFICES = ["London", "Dublin", "Vienna", "Dubai", "New Delhi", "Bangkok"]

export function FooterSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden pt-12 pb-10"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent)" }}
      />

      <div className="site-container flex flex-col items-center text-center">

        {/* Large display brand name */}
        <h2
          className="text-title-1 font-bold tracking-[0.08em] uppercase text-white w-full transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Stern Advisory Global
        </h2>

        {/* Thin divider */}
        <div
          className="my-8 h-px w-24 transition-all duration-700 delay-100"
          style={{
            background: "rgba(255,255,255,0.2)",
            opacity: visible ? 1 : 0,
          }}
        />

        {/* Address + email */}
        <div
          className="flex flex-col gap-1.5 transition-all duration-700 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <p className="text-body-small" style={{ color: "rgba(255,255,255,0.5)" }}>
            Nova North | 11 Bressenden Place | London | SW1E 5BY | United Kingdom
          </p>
          <a
            href="mailto:info@sternadvisory.com"
            className="text-body-small transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            info@sternadvisory.com
          </a>
        </div>

        {/* Offices */}
        <p
          className="mt-5 text-body-small transition-all duration-700 delay-300"
          style={{
            color: "rgba(255,255,255,0.3)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {OFFICES.join(" · ")}
        </p>

        {/* Copyright */}
        <p
          className="mt-8 text-body-tiny transition-all duration-700 delay-[400ms]"
          style={{
            color: "rgba(255,255,255,0.2)",
            opacity: visible ? 1 : 0,
          }}
        >
          © {new Date().getFullYear()} Stern Advisory Global. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
