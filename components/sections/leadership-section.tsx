"use client"

import { useState } from "react"

const LEADERS = [
  { name: "Morris Stern",       role: "Founder & CEO" },
  { name: "Simon Bentley",      role: "Chairman & Board of Director" },
  { name: "Adv. Gal Rofe",      role: "Partner M&A" },
  { name: "Prateek Srivastava", role: "Founder & Managing Director, Stern Advisory India" },
  { name: "Victor Abramkin",    role: "FSU & CIS Operations" },
  { name: "Sam Zonensien",      role: "Special Adviser" },
  { name: "Marc Meyer",         role: "Head of M&A" },
  { name: "Alan Ogden",         role: "Corporate Communications, Member of Advisory Council" },
]

export function LeadershipSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="site-container">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-heading-2 text-primary mb-1">Leadership</h2>
          <p className="text-body text-dark-gray max-w-xl mx-auto">
            The firm works with organisations facing complex operational,
            governance and security challenges across multiple jurisdictions.
          </p>
        </div>

        {/* 4-column initial card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--color-light-gray-2)" }}>
          {LEADERS.map((person, i) => {
            const isHovered = hovered === i
            const initials = person.name
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
            return (
              <div
                key={person.name}
                className="flex flex-col px-7 py-8 transition-colors duration-200 cursor-default"
                style={{ backgroundColor: isHovered ? "var(--color-secondary)" : "#ffffff" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Large initials */}
                <span
                  className="text-heading-1 leading-none mb-6 select-none transition-colors duration-200"
                  style={{
                    color: isHovered ? "rgba(255,255,255,0.2)" : "var(--color-light-gray-2)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {initials}
                </span>
                {/* Name */}
                <p
                  className="text-title-3 mb-1 transition-colors duration-200"
                  style={{ color: isHovered ? "#ffffff" : "var(--color-primary)" }}
                >
                  {person.name}
                </p>
                {/* Role */}
                <p
                  className="text-body-small leading-snug transition-colors duration-200"
                  style={{ color: isHovered ? "rgba(255,255,255,0.7)" : "var(--color-dark-gray)" }}
                >
                  {person.role}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
