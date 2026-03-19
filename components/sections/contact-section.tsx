"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Check } from "lucide-react"

const INQUIRY_TYPES = [
  "General Enquiry",
  "Corporate Risk & Due Diligence",
  "Governance & Integrity Advisory",
  "Security & Operational Resilience",
  "Cyber Security Advisory",
  "Other",
]

export function ContactSection() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    message: "",
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function selectInquiry(value: string) {
    setForm((prev) => ({ ...prev, inquiryType: value }))
    setDropdownOpen(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  const inputClass = "w-full rounded border px-4 py-3 text-body-small text-primary placeholder:text-dark-gray/40 outline-none bg-white transition-colors focus:border-secondary"
  const inputStyle = { borderColor: "var(--color-light-gray-2)" }

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--color-light-gray-1)" }}>
      <div className="site-container">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-heading-2 text-primary mb-1">
            Request a Confidential Introduction
          </h2>
          <p className="text-body text-dark-gray max-w-md mx-auto">
            Discuss your requirement in confidence with our senior team. All enquiries are treated with the utmost discretion.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-body-small font-medium text-primary">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Smith"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-body-small font-medium text-primary">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-body-small font-medium text-primary">
                  Company <span className="text-dark-gray/50 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-body-small font-medium text-primary">
                  Phone <span className="text-dark-gray/50 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 555 123 4567"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Inquiry Type — custom dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-small font-medium text-primary">
                Inquiry Type <span className="text-red-500">*</span>
              </label>
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between rounded border px-4 py-3 text-body-small bg-white transition-colors text-left"
                  style={{
                    borderColor: dropdownOpen ? "var(--color-secondary)" : "var(--color-light-gray-2)",
                    color: form.inquiryType ? "var(--color-primary)" : "rgba(0,0,0,0.35)",
                  }}
                >
                  <span>{form.inquiryType || "Select inquiry type"}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: "var(--color-dark-gray)",
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <ul
                    className="absolute z-20 mt-1 w-full rounded border bg-white shadow-lg overflow-hidden"
                    style={{ borderColor: "var(--color-light-gray-2)" }}
                  >
                    {INQUIRY_TYPES.map((t) => (
                      <li key={t}>
                        <button
                          type="button"
                          onClick={() => selectInquiry(t)}
                          className="w-full flex items-center justify-between px-4 py-3 text-body-small text-left transition-colors hover:bg-secondary-bg"
                          style={{ color: "var(--color-primary)" }}
                        >
                          <span>{t}</span>
                          {form.inquiryType === t && (
                            <Check size={14} style={{ color: "var(--color-secondary)" }} />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-small font-medium text-primary">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your inquiry..."
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-body-small font-medium text-white rounded transition-opacity hover:opacity-85"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Send Message
                <ArrowRight size={16} />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  )
}
