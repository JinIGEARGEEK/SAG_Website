# ข้อกำหนดความต้องการซอฟต์แวร์ (SRS)

## Stern Advisory Global — เว็บไซต์องค์กร

| รายการ | รายละเอียด |
|--------|-----------|
| เวอร์ชัน | 1.0.0 |
| วันที่ | 2026-03-20 |
| สถานะ | ร่าง (Draft) |
| โปรเจกต์ | stern-revamp |

---

## สารบัญ

1. [บทนำ](#1-บทนำ)
2. [ภาพรวมระบบ](#2-ภาพรวมระบบ)
3. [สถาปัตยกรรมระบบ](#3-สถาปัตยกรรมระบบ)
4. [ความต้องการเชิงฟังก์ชัน](#4-ความต้องการเชิงฟังก์ชัน)
   - 4.1 การนำทางและส่วนหัว
   - 4.2 ส่วนต่าง ๆ ของหน้าแรก
   - 4.3 โมดูลบริการ (Services)
   - 4.4 โมดูลอุตสาหกรรม (Sectors)
   - 4.5 แบบฟอร์มติดต่อ
   - 4.6 ระบบหลายภาษา (i18n)
   - 4.7 แผนที่สำนักงานทั่วโลก
5. [ความต้องการเชิงคุณภาพ](#5-ความต้องการเชิงคุณภาพ)
6. [ระบบออกแบบและมาตรฐาน UI](#6-ระบบออกแบบและมาตรฐาน-ui)
7. [รายการหน้าและเส้นทาง (Routes)](#7-รายการหน้าและเส้นทาง-routes)
8. [โมเดลข้อมูล](#8-โมเดลข้อมูล)
9. [การเชื่อมต่อภายนอก](#9-การเชื่อมต่อภายนอก)
10. [งานที่ยังค้างและแผนในอนาคต](#10-งานที่ยังค้างและแผนในอนาคต)

---

## 1. บทนำ

### 1.1 วัตถุประสงค์

เอกสารนี้กำหนดความต้องการเชิงฟังก์ชันและเชิงคุณภาพสำหรับเว็บไซต์องค์กร **Stern Advisory Global** เว็บไซต์นี้เป็นช่องทางดิจิทัลหลักของบริษัทที่ปรึกษาระดับโลก โดยสื่อสารบริการ ความเชี่ยวชาญรายอุตสาหกรรม ทีมผู้นำ และการปรากฏตัวทั่วโลกต่อลูกค้าและพันธมิตรที่มีศักยภาพ

### 1.2 ขอบเขต

ระบบเป็น **เว็บไซต์การตลาดสาธารณะ** สร้างด้วย Next.js (App Router) ประกอบด้วย:

- หน้าแรกแบบ Single-page ที่เลื่อนผ่านหลายส่วน
- หน้ารายละเอียดสำหรับแต่ละบริการและอุตสาหกรรม
- รองรับหลายภาษา (EN, RU, DE, AT)
- แผนที่โลกแบบโต้ตอบแสดงที่ตั้งสำนักงาน
- แบบฟอร์มสอบถามข้อมูล

### 1.3 คำจำกัดความ

| คำศัพท์ | ความหมาย |
|---------|----------|
| Service (บริการ) | หนึ่งใน 4 สายบริการให้คำปรึกษาของบริษัท เช่น Corporate Risk & Due Diligence |
| Sector (อุตสาหกรรม) | กลุ่มอุตสาหกรรมที่บริษัทให้บริการ เช่น Financial Services, Energy |
| site-container | คลาส CSS ที่จำกัดความกว้างเนื้อหาสูงสุดที่ 1240px และจัดกึ่งกลาง |
| RSC | React Server Component — เรนเดอร์บนเซิร์ฟเวอร์ ไม่มี JS bundle ฝั่ง client |
| i18n | การรองรับหลายภาษา (Internationalisation) |
| slug | ตัวระบุในรูปแบบ URL สำหรับบริการหรืออุตสาหกรรม เช่น `corporate-risk` |

### 1.4 ผู้มีส่วนเกี่ยวข้อง

| บทบาท | ความรับผิดชอบ |
|-------|--------------|
| เจ้าของธุรกิจ | กำหนดข้อความสื่อสาร เนื้อหาบริการ และอุตสาหกรรมเป้าหมาย |
| ทีมพัฒนาเว็บ | สร้างและดูแลรักษา codebase |
| ผู้แก้ไขเนื้อหา | อัปเดตข้อความ เพิ่มสมาชิกทีม อัปเดตที่ตั้งสำนักงาน |
| ผู้ใช้งาน | ลูกค้าและพันธมิตรที่มีศักยภาพที่เข้าชมเว็บไซต์ |

---

## 2. ภาพรวมระบบ

### 2.1 บริบทของผลิตภัณฑ์

เว็บไซต์เป็นแบบ Static Generation (Next.js `generateStaticParams`) รองรับด้วยชั้นข้อมูลในรูปแบบ TypeScript ยังไม่มี CMS ในระยะนี้ — เนื้อหาจัดการโดยตรงในไฟล์ข้อมูลใน source code

### 2.2 ฟังก์ชันหลักของระบบ

- นำเสนอแบรนด์ ค่านิยม และการปรากฏตัวทั่วโลกของบริษัท
- อธิบายแต่ละบริการให้คำปรึกษาอย่างละเอียด
- แสดงความเชี่ยวชาญรายอุตสาหกรรม
- เปิดให้ลูกค้าที่มีศักยภาพส่งคำถาม
- นำเสนอเนื้อหาในหลายภาษา
- แสดงที่ตั้งสำนักงานบนแผนที่โลกแบบโต้ตอบ

### 2.3 ลักษณะผู้ใช้งาน

| ประเภทผู้ใช้ | คำอธิบาย |
|-------------|---------|
| ลูกค้าที่มีศักยภาพ | ผู้บริหาร, ที่ปรึกษากฎหมาย, คณะกรรมการบริษัท ที่ต้องการบริการให้คำปรึกษา |
| นักลงทุน / PE Fund | ตรวจสอบข้อมูลบริษัทที่ปรึกษา |
| นักข่าว / นักวิจัย | ค้นหาข้อมูลพื้นฐานของบริษัท |

### 2.4 ข้อจำกัด

- ยังไม่มี backend API — การส่งแบบฟอร์มยังไม่ถูกบันทึก
- เนื้อหาจัดการผ่าน source files (ยังไม่มี CMS)
- แผนที่ขึ้นอยู่กับบริการ `demotiles.maplibre.org`
- ไอคอนธงชาติขึ้นอยู่กับ `flagcdn.com`

---

## 3. สถาปัตยกรรมระบบ

### 3.1 เทคโนโลยีที่ใช้

| ชั้น | เทคโนโลยี |
|------|----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| ภาษา | TypeScript 5 |
| การจัดสไตล์ | Tailwind CSS v4 (CSS-first) |
| ระบบ Component | shadcn/ui (new-york style) + Radix UI |
| ไอคอน | Lucide React, Material Symbols Rounded |
| แผนที่ | MapLibre GL v5 |
| หลายภาษา | next-intl v4 (cookie-based) |
| Animation | CSS keyframes + IntersectionObserver |
| Global State | Zustand (เฉพาะ console) |
| Forms | react-hook-form + Zod v3 |
| การแจ้งเตือน | Sonner |
| ฟอนต์ | Playfair Display (หัวข้อ), Inter (เนื้อหา) |

### 3.2 Route Groups

| กลุ่ม | Prefix | Layout |
|-------|--------|--------|
| `(blank)` | — | ไม่มี sidebar — หน้า public |
| `(console)` | — | มี Sidebar + Header (backoffice) |

### 3.3 กลยุทธ์การ Render

| ประเภทหน้า | กลยุทธ์ |
|-----------|--------|
| หน้าแรก | Server Component (RSC) |
| `/services` | Server Component (RSC) |
| `/services/[slug]` | Static Generation (`generateStaticParams`) |
| `/sectors/[slug]` | Static Generation (`generateStaticParams`) |
| ส่วนที่โต้ตอบได้ | Client Components (`"use client"`) |

---

## 4. ความต้องการเชิงฟังก์ชัน

---

### 4.1 การนำทางและส่วนหัว

#### 4.1.1 Navbar แบบ Sticky

| รหัส | ความต้องการ |
|------|-----------|
| NAV-01 | Header ต้องยึดอยู่ด้านบนของ viewport ตลอดเวลา |
| NAV-02 | พื้นหลัง header ต้องโปร่งใสเมื่ออยู่ที่ด้านบนสุด และเปลี่ยนเป็นสีหลัก (`#0A1F3C`) เมื่อเลื่อนเกิน 60px |
| NAV-03 | Header ต้องแสดงชื่อบริษัท "STERN ADVISORY GLOBAL" ทางด้านซ้าย |
| NAV-04 | บน desktop (breakpoint `xl`, ≥1280px): แสดง nav links, ตัวเลือกภาษา และปุ่ม Contact |
| NAV-05 | บน tablet/mobile (ต่ำกว่า `xl`): แสดงปุ่ม hamburger ที่เปิดเมนู overlay เต็มหน้าจอ |
| NAV-06 | การเลื่อนหน้าต้องถูกล็อกขณะที่เมนู mobile เปิดอยู่ |

#### 4.1.2 ลิงก์การนำทาง

ลิงก์ทั้งหมดเลื่อนไปยัง anchor บนหน้าแรก หากผู้ใช้อยู่ในหน้าย่อย ลิงก์จะนำทางไปที่ `/#anchor`

| ป้ายกำกับ | Anchor |
|----------|--------|
| Home | `#hero` |
| About | `#about` |
| Situations | `#situations` |
| Advisory Services | `#advisory` |
| Sectors | `#sectors` |
| International Presence | `#presence` |
| Leadership | `#leadership` |

#### 4.1.3 ตัวเลือกภาษา

| รหัส | ความต้องการ |
|------|-----------|
| LANG-01 | ต้องมีตัวเลือกภาษาบน desktop (ใน header) และใน mobile menu (แบบปุ่มกลุ่ม) |
| LANG-02 | ภาษาที่รองรับ: UK-English (EN 🇬🇧), Russian (RU 🇷🇺), Deutsche (DE 🇩🇪), Austrian (AT 🇦🇹) |
| LANG-03 | ภาษาที่เลือกอยู่ต้องแสดงด้วยการ highlight ที่ชัดเจน |
| LANG-04 | การเลือกภาษาต้องเรียก Server Action `setLocale()` ซึ่งบันทึกค่าใน cookie อายุ 1 ปี และ revalidate layout |
| LANG-05 | ไอคอนธงชาติต้องเป็นรูปวงกลมจาก `flagcdn.com` |
| LANG-06 | บน desktop: แสดงธง + รหัสภาษา + chevron คลิกแล้วเปิด dropdown แสดงธง + ชื่อภาษาเต็ม |

---

### 4.2 ส่วนต่าง ๆ ของหน้าแรก

หน้าแรก (`/`) ประกอบด้วย 8 ส่วนที่มี scroll anchor ของตัวเอง

#### 4.2.1 ส่วน Hero (`#hero`)

| รหัส | ความต้องการ |
|------|-----------|
| HERO-01 | แสดงพาดหัวหลักและพาดหัวรองบนพื้นหลัง gradient สีเข้ม |
| HERO-02 | แสดงปุ่ม CTA 2 ปุ่ม: "Request Introduction" (เลื่อนไป `#contact`) และ "View Our Advisory Services" (เลื่อนไป `#advisory`) |
| HERO-03 | แสดงรูปแผนที่โลกด้านล่างพาดหัว พร้อม gradient overlay ด้านบนและด้านข้างเพื่อกลมกลืนกับพื้นหลัง |

#### 4.2.2 ส่วน About (`#about`)

| รหัส | ความต้องการ |
|------|-----------|
| ABOUT-01 | แสดงหัวข้อและย่อหน้าอธิบายบริษัทแบบจัดกึ่งกลาง |
| ABOUT-02 | แสดงการ์ดความสามารถ 4 ใบในรูปแบบ grid (1 คอลัมน์ mobile → 2 คอลัมน์ tablet → 4 คอลัมน์ desktop) |
| ABOUT-03 | แต่ละการ์ดมีไอคอน ชื่อ และคำอธิบายสั้น |
| ABOUT-04 | การ์ดคั่นด้วยเส้น divider ที่ปรับตามรูปแบบ grid |

**การ์ด:**

| # | ไอคอน | หัวข้อ |
|---|-------|-------|
| 1 | Briefcase | Governance |
| 2 | Shield | Security |
| 3 | ShieldCheck | Risk Advisory |
| 4 | RefreshCw | Operational Resilience |

#### 4.2.3 ส่วน Situations (`#situations`)

| รหัส | ความต้องการ |
|------|-----------|
| SIT-01 | แสดงหัวข้อและย่อหน้าแนะนำส่วนนี้แบบจัดกึ่งกลาง |
| SIT-02 | แสดงการ์ด 6 ใบในรูปแบบ full-bleed grid (1 col mobile → 2 col tablet → 3 col desktop) |
| SIT-03 | Grid ขยายเต็มความกว้างหน้าจอ (ไม่มี `site-container`) padding ของ cell ต้องตรงกับ `site-container` ในแต่ละ breakpoint |
| SIT-04 | Padding ของ cell: 16px mobile, 32px tablet, ตรงกับ `site-container` บน desktop (ผ่าน CSS utilities `.grid-cell-pl` / `.grid-cell-pr`) |
| SIT-05 | แต่ละการ์ดแสดงชื่อและคำอธิบาย |

**สถานการณ์:**

| # | หัวข้อ |
|---|-------|
| 1 | Market Entry |
| 2 | Digital Transformation |
| 3 | Operational Excellence |
| 4 | Merger & Acquisition |
| 5 | Crisis Management |
| 6 | Strategic Planning |

#### 4.2.4 ส่วน Advisory Services (`#advisory`)

| รหัส | ความต้องการ |
|------|-----------|
| ADV-01 | แสดงบนพื้นหลัง gradient สีเข้ม |
| ADV-02 | แสดงหัวข้อจัดกึ่งกลางและย่อหน้าแนะนำ |
| ADV-03 | แสดงบริการทั้ง 4 ในรูปแบบ stacked พร้อม divider |
| ADV-04 | แต่ละแถวแสดง: ลำดับเลขสองหลัก, ชื่อบริการ (คอลัมน์ซ้าย) และคำอธิบาย + ลิงก์ "Explore services" (คอลัมน์ขวา) |
| ADV-05 | ลิงก์ "Explore services" นำทางไปยัง `/services/[slug]` |

#### 4.2.5 ส่วน Sectors (`#sectors`)

| รหัส | ความต้องการ |
|------|-----------|
| SEC-01 | บน desktop: แสดงสองคอลัมน์ — รูป SVG แบบ sticky (ซ้าย) และ accordion list (ขวา) |
| SEC-02 | บน tablet และ mobile: ซ่อนคอลัมน์รูป (`hidden lg:block`) |
| SEC-03 | Accordion แสดงอุตสาหกรรมทั้ง 10 คลิกแถวแล้วขยายแสดงคำอธิบายและลิงก์ "Read more" ไปยัง `/sectors/[slug]` |
| SEC-04 | เปิดได้ครั้งละ 1 อุตสาหกรรมเท่านั้น รูป SVG ของอุตสาหกรรมที่เลือกแสดงทางซ้าย (desktop เท่านั้น) |
| SEC-05 | แผง illustration เป็นแบบ sticky (`top-24`) และสูงเต็ม viewport ลบด้วย 8rem |

#### 4.2.6 ส่วน International Presence (`#presence`)

ดู [หัวข้อ 4.7](#47-แผนที่สำนักงานทั่วโลก)

#### 4.2.7 ส่วน Leadership (`#leadership`)

| รหัส | ความต้องการ |
|------|-----------|
| LEAD-01 | แสดงหัวข้อและหัวข้อรอง |
| LEAD-02 | แสดงสมาชิกทีมผู้นำ 8 คนในรูปแบบ grid (2 col mobile → 4 col desktop) |
| LEAD-03 | แต่ละการ์ดแสดง: ชื่อ ตำแหน่ง และประวัติย่อ |
| LEAD-04 | การ์ดมี hover state ที่เปลี่ยนสีพื้นหลังและสีข้อความ |

#### 4.2.8 ส่วน Contact (`#contact`)

ดู [หัวข้อ 4.5](#45-แบบฟอร์มติดต่อ)

---

### 4.3 โมดูลบริการ (Services)

#### 4.3.1 หน้ารายการบริการ (`/services`)

| รหัส | ความต้องการ |
|------|-----------|
| SVC-L-01 | แสดงบริการทั้ง 4 ในรูปแบบรายการแบบ stacked |
| SVC-L-02 | แต่ละแถวแสดง: ลำดับเลขสองหลัก, ชื่อบริการ, subtitle, ตัวอย่าง capability tags และลิงก์ "Explore" |
| SVC-L-03 | แถวมี hover state (เปลี่ยนสีพื้นหลัง) |
| SVC-L-04 | แต่ละแถวลิงก์ไปยัง `/services/[slug]` |

#### 4.3.2 หน้ารายละเอียดบริการ (`/services/[slug]`)

| รหัส | ความต้องการ |
|------|-----------|
| SVC-D-01 | แสดง hero section พร้อมพื้นหลัง gradient, ลิงก์กลับ `/#advisory`, ชื่อบริการ และ subtitle |
| SVC-D-02 | แสดงส่วน "Services Include" — รายการ 2–4 บริการย่อยในรูปแบบ grid 2 คอลัมน์ แต่ละการ์ดมีเลขลำดับ ชื่อ และคำอธิบาย |
| SVC-D-03 | แสดงส่วน "Other Advisory Services" แสดงบริการที่เหลืออีก 3 รายการ |
| SVC-D-04 | แต่ละแถว "Other Services" แสดง: ชื่อ, subtitle และไอคอนลูกศร |
| SVC-D-05 | Mobile: แสดงชื่อ + คำอธิบายแบบ stacked | Desktop: ชื่อ / คำอธิบาย / ลูกศร ใน grid 3 คอลัมน์ |
| SVC-D-06 | ระยะห่างระหว่างแถวใน "Other Services": padding บน 40px mobile, 56px desktop; padding ซ้าย-ขวา 24px เฉพาะ desktop |
| SVC-D-07 | แสดงส่วน CTA "Discuss Your Requirements" พร้อมลิงก์ไปยัง `/#contact` |
| SVC-D-08 | หน้าถูก generate แบบ static ขณะ build ผ่าน `generateStaticParams` |
| SVC-D-09 | Slug ที่ไม่ถูกต้องต้องแสดงหน้า 404 ผ่าน `notFound()` |

**บริการทั้ง 4:**

| Slug | ชื่อ |
|------|------|
| `corporate-risk` | Corporate Risk & Due Diligence |
| `governance` | Governance & Integrity Advisory |
| `security` | Security & Operational Resilience |
| `cyber-security` | Cyber Security Advisory |

---

### 4.4 โมดูลอุตสาหกรรม (Sectors)

#### 4.4.1 หน้ารายละเอียดอุตสาหกรรม (`/sectors/[slug]`)

| รหัส | ความต้องการ |
|------|-----------|
| SCT-D-01 | แสดง hero section พร้อมพื้นหลัง gradient, ลิงก์กลับ `/#sectors` และชื่ออุตสาหกรรม |
| SCT-D-02 | แสดงข้อความอธิบายอุตสาหกรรม |
| SCT-D-03 | แสดงแผง CTA "Discuss Your Requirements" ภายในคอลัมน์เนื้อหาหลัก |
| SCT-D-04 | บน desktop: แสดง sidebar แบบ sticky แสดงอุตสาหกรรมอื่น ๆ ทั้งหมดพร้อมลิงก์ลูกศร |
| SCT-D-05 | Sidebar ซ่อนบน mobile และ tablet (`hidden lg:block`) |
| SCT-D-06 | Padding ด้านบน: 40px mobile, 112px desktop (`pt-10 lg:py-28`) |
| SCT-D-07 | หน้าถูก generate แบบ static ขณะ build ผ่าน `generateStaticParams` |
| SCT-D-08 | Slug ที่ไม่ถูกต้องต้องแสดงหน้า 404 ผ่าน `notFound()` |

**อุตสาหกรรมทั้ง 10:**

| Slug | ชื่อ |
|------|------|
| `financial-services` | Financial Services |
| `private-equity` | Private Equity & Venture Capital |
| `energy-and-resources` | Energy & Natural Resources |
| `infrastructure-and-real-assets` | Infrastructure & Real Assets |
| `technology-and-digital-economy` | Technology & Digital Economy |
| `industrial-and-manufacturing` | Industrial & Manufacturing |
| `media-and-communications` | Media & Communications |
| `life-sciences` | Life Sciences & Healthcare |
| `consumer-markets` | Consumer Markets & Retail |
| `legal-and-professional-services` | Legal & Professional Services |

---

### 4.5 แบบฟอร์มติดต่อ

| รหัส | ความต้องการ |
|------|-----------|
| FORM-01 | แบบฟอร์มติดต่อต้องปรากฏในส่วน Contact บนหน้าแรก (`#contact`) |
| FORM-02 | แบบฟอร์มต้องรับข้อมูลฟิลด์ดังนี้: |

| ฟิลด์ | ประเภท | บังคับ | การตรวจสอบ |
|-------|--------|--------|-----------|
| ชื่อ-นามสกุล | Text input | ใช่ | ต้องไม่ว่าง |
| อีเมล | Email input | ใช่ | รูปแบบอีเมลถูกต้อง |
| บริษัท | Text input | ไม่ | — |
| เบอร์โทรศัพท์ | Tel input | ไม่ | — |
| ประเภทการสอบถาม | Dropdown | ใช่ | ต้องเลือกตัวเลือก |
| ข้อความ | Textarea | ใช่ | ต้องไม่ว่าง |

**ตัวเลือกประเภทการสอบถาม:**
1. General Enquiry (สอบถามทั่วไป)
2. Corporate Risk & Due Diligence
3. Governance & Integrity Advisory
4. Security & Operational Resilience
5. Cyber Security Advisory
6. Other (อื่น ๆ)

| รหัส | ความต้องการ |
|------|-----------|
| FORM-03 | Dropdown แบบกำหนดเองต้องเปิด/ปิดเมื่อคลิก และปิดเมื่อคลิกนอกพื้นที่ |
| FORM-04 | การส่งแบบฟอร์มต้องป้องกัน default browser behaviour |
| FORM-05 | *(อนาคต)* เมื่อส่งแบบฟอร์ม ข้อมูลจะถูกส่งไปยัง backend และผู้ใช้จะได้รับข้อความยืนยัน |

---

### 4.6 ระบบหลายภาษา (i18n)

| รหัส | ความต้องการ |
|------|-----------|
| I18N-01 | ระบบต้องรองรับ 4 ภาษา: EN, RU, DE, AT |
| I18N-02 | ภาษาที่เลือกต้องถูกเก็บใน cookie ชื่อ `locale` อายุ 1 ปี |
| I18N-03 | ระบบตรวจสอบ locale จาก cookie ถ้าไม่มีหรือไม่ถูกต้องให้ใช้ `en` เป็นค่าเริ่มต้น |
| I18N-04 | รับเฉพาะค่า locale ที่รู้จัก (`en`, `ru`, `de`, `at`) ค่าอื่น ๆ ใช้ `en` แทน |
| I18N-05 | ไฟล์แปลภาษาอยู่ที่ `messages/{locale}.json` |
| I18N-06 | Server Components ใช้ `getTranslations()` จาก `next-intl/server` |
| I18N-07 | Client Components ใช้ `useTranslations()` จาก `next-intl` |
| I18N-08 | การเปลี่ยนภาษาต้องเรียก Server Action `setLocale()` และ revalidate root layout |

---

### 4.7 แผนที่สำนักงานทั่วโลก

| รหัส | ความต้องการ |
|------|-----------|
| MAP-01 | แสดงแผนที่ MapLibre GL แบบโต้ตอบในส่วน International Presence |
| MAP-02 | แผนที่ต้องไม่อนุญาตให้ผู้ใช้ pan หรือ zoom |
| MAP-03 | แสดงสำนักงาน 8 แห่งทั่วโลกเป็น marker nodes แบบ animation |
| MAP-04 | Marker มี animation แบบ wave/glow เพื่อดึงดูดความสนใจ |
| MAP-05 | คลิกหรือ hover บน marker แสดง popup ชื่อเมืองและภูมิภาค |
| MAP-06 | วาดเส้นโค้ง Bezier เชื่อมระหว่างสำนักงานเป็น SVG overlay |
| MAP-07 | ระดับการซูมของแผนที่ปรับตามความกว้างของ viewport |
| MAP-08 | แผนที่ใช้สไตล์สีเข้ม: สีพื้นประเทศ `#1A3E6D`, เส้นขอบ `#489AAF` |

**ที่ตั้งสำนักงาน:**

| เมือง | ภูมิภาค |
|-------|--------|
| London | United Kingdom |
| Dublin | Ireland |
| Vienna | Austria |
| Tel Aviv | Israel |
| Dubai | UAE |
| New Delhi | India |
| Bangkok | Thailand |
| Singapore | Singapore |

---

## 5. ความต้องการเชิงคุณภาพ

### 5.1 ประสิทธิภาพ

| รหัส | ความต้องการ |
|------|-----------|
| PERF-01 | หน้าเนื้อหา static ทั้งหมด (services, sectors) ต้องถูก pre-render ขณะ build |
| PERF-02 | รูปแผนที่โลกใน hero ต้องใช้ `priority` loading เพื่อหลีกเลี่ยงการชะลอ LCP |
| PERF-03 | Animation ที่ triggered ด้วย scroll ต้องใช้ `IntersectionObserver` |
| PERF-04 | ลด JS bundle ฝั่ง client โดยใช้ Server Components เป็นค่าเริ่มต้น |

### 5.2 การตอบสนองต่อขนาดหน้าจอ (Responsiveness)

| Breakpoint | ความกว้างขั้นต่ำ | พฤติกรรม |
|------------|----------------|---------|
| Mobile | 0px | 1 คอลัมน์, hamburger nav, padding 16px |
| Tablet | 640px (sm) | 2 คอลัมน์, padding 32px |
| Desktop | 1024px (lg) | หลายคอลัมน์, desktop nav, แสดงรูป illustration |
| Wide Desktop | 1280px (xl) | Desktop nav เต็มรูปแบบ, grid ตรงกับ site-container |

### 5.3 การเข้าถึง (Accessibility)

| รหัส | ความต้องการ |
|------|-----------|
| A11Y-01 | รูปภาพทั้งหมดต้องมี `alt` attribute ที่เหมาะสม |
| A11Y-02 | องค์ประกอบที่โต้ตอบได้ (ปุ่ม, ลิงก์) ต้องสามารถ focus ด้วยแป้นพิมพ์ |
| A11Y-03 | ปุ่ม hamburger ต้องมี `aria-label="Toggle menu"` |
| A11Y-04 | ฟิลด์ในแบบฟอร์มต้องเชื่อมกับ label |
| A11Y-05 | ความตัดกันของสีต้องผ่านมาตรฐาน WCAG AA |

### 5.4 เบราว์เซอร์ที่รองรับ

- Chrome 120+
- Firefox 120+
- Safari 16+
- Edge 120+

### 5.5 ความปลอดภัย

| รหัส | ความต้องการ |
|------|-----------|
| SEC-01 | Cookie locale ต้องตั้งค่า `path: "/"` และ `maxAge: 60 * 60 * 24 * 365` |
| SEC-02 | ค่า locale ต้องผ่าน whitelist บนเซิร์ฟเวอร์ก่อนใช้ใน dynamic import |
| SEC-03 | เนื้อหาที่ผู้ใช้สร้างต้องผ่าน sanitisation ก่อน render |

---

## 6. ระบบออกแบบและมาตรฐาน UI

### 6.1 Color Tokens

| Token | Hex | การใช้งาน |
|-------|-----|---------|
| `--color-primary` | `#0A1F3C` | Navy เข้ม — หัวข้อ, พื้นหลัง |
| `--color-secondary` | `#1A3E6D` | Navy กลาง — accent, hover |
| `--color-dark-gray` | `#606874` | ข้อความเนื้อหา |
| `--color-light-gray-1` | `#F0F2F5` | พื้นหลังการ์ด |
| `--color-light-gray-2` | `#D9DEE6` | เส้น border, divider |
| `--color-success` | `#499B49` | สถานะสำเร็จ |
| `--color-info` | `#489AAF` | สถานะข้อมูล |
| `--color-warning` | `#E1C14C` | สถานะเตือน |
| `--color-danger` | `#C84940` | สถานะข้อผิดพลาด |

### 6.2 ขนาดตัวอักษร (Typography Scale)

| Class | ฟอนต์ | น้ำหนัก | ขนาด (โดยประมาณ) | การใช้งาน |
|-------|-------|--------|-----------------|---------|
| `text-heading-1` | Playfair Display | 700 | 48–64px | ชื่อหน้า |
| `text-heading-2` | Playfair Display | 700 | 36–48px | หัวข้อ section |
| `text-title-1` – `text-title-4` | Playfair Display | 600 | 24–32px | หัวข้อการ์ด |
| `text-subtitle` | Inter | 500 | 18px | Subtitle |
| `text-body` | Inter | 400 | 16px | ย่อหน้า |
| `text-body-small` | Inter | 400 | 14px | ข้อความรอง |
| `text-body-tiny` | Inter | 400 | 12px | Label, caption |
| `text-button` | Inter | 600 | 14px | ปุ่ม |
| `text-link` | Inter | 400 | 14px | ลิงก์ inline |

### 6.3 Layout

| Token | ค่า |
|-------|-----|
| `--site-max-width` | `1240px` |
| `--site-padding-x` | `0rem` (xl+; ใช้ max-width centering) |
| Container padding (mobile) | `1rem` |
| Container padding (tablet) | `2rem` |
| Container padding (lg) | `2.5rem` |

### 6.4 มาตรฐาน Animation

- **FadeIn:** Scroll-triggered, 400ms ease, delay 0–500ms (staggered)
- **Map waves:** CSS keyframes, 2s infinite radial expand
- **Hover transitions:** 200ms สำหรับสี/opacity, 300ms สำหรับ transform

---

## 7. รายการหน้าและเส้นทาง (Routes)

| Route | Component | ประเภท | คำอธิบาย |
|-------|-----------|--------|---------|
| `/` | `HomePage` | RSC | หน้าแรกการตลาดเต็มรูปแบบ |
| `/services` | `ServicesPage` | RSC | รายการบริการ |
| `/services/corporate-risk` | `ServicePage` | Static | รายละเอียด Corporate Risk |
| `/services/governance` | `ServicePage` | Static | รายละเอียด Governance |
| `/services/security` | `ServicePage` | Static | รายละเอียด Security |
| `/services/cyber-security` | `ServicePage` | Static | รายละเอียด Cyber Security |
| `/sectors/financial-services` | `SectorPage` | Static | รายละเอียด Financial Services |
| `/sectors/private-equity` | `SectorPage` | Static | รายละเอียด Private Equity |
| `/sectors/energy-and-resources` | `SectorPage` | Static | รายละเอียด Energy |
| `/sectors/infrastructure-and-real-assets` | `SectorPage` | Static | รายละเอียด Infrastructure |
| `/sectors/technology-and-digital-economy` | `SectorPage` | Static | รายละเอียด Technology |
| `/sectors/industrial-and-manufacturing` | `SectorPage` | Static | รายละเอียด Industrial |
| `/sectors/media-and-communications` | `SectorPage` | Static | รายละเอียด Media |
| `/sectors/life-sciences` | `SectorPage` | Static | รายละเอียด Life Sciences |
| `/sectors/consumer-markets` | `SectorPage` | Static | รายละเอียด Consumer Markets |
| `/sectors/legal-and-professional-services` | `SectorPage` | Static | รายละเอียด Legal Services |

---

## 8. โมเดลข้อมูล

### 8.1 Service (บริการ)

```typescript
interface Service {
  slug: string             // ตัวระบุใน URL
  title: string            // ชื่อแสดงผล
  subtitle: string         // คำอธิบายสั้น 1 บรรทัด
  services: {              // 2–4 บริการย่อย
    title: string
    description: string
  }[]
  overview: string[]       // 1–2 ย่อหน้าภาพรวม
  capabilities: {          // 6 ความสามารถหลัก
    title: string
    description: string
  }[]
  approach: {              // 4 ขั้นตอนวิธีการทำงาน
    step: string
    title: string
    description: string
  }[]
}
```

### 8.2 Sector (อุตสาหกรรม)

```typescript
interface Sector {
  slug: string             // ตัวระบุใน URL
  title: string            // ชื่อแสดงผล
  subtitle: string         // แท็กไลน์สั้น
  description: string      // คำอธิบายย่อหน้าเต็ม
  challenges: {            // 4 ความท้าทายหลัก
    title: string
    description: string
  }[]
  relatedServiceSlugs: string[]  // 2–3 slug ของ Service ที่เกี่ยวข้อง
}
```

### 8.3 Office Location (ที่ตั้งสำนักงาน)

```typescript
interface Office {
  city: string
  region: string
  coordinates: [number, number]  // [ลองจิจูด, ละติจูด]
}
```

---

## 9. การเชื่อมต่อภายนอก

### 9.1 MapLibre GL

| รายการ | ค่า |
|--------|-----|
| Library | `maplibre-gl` v5 |
| Map Tiles | `demotiles.maplibre.org` |
| การตั้งค่า | ไม่อนุญาต pan/zoom |
| Markers | DOM elements แบบ CSS animation |
| Popups | MapLibre native popup |

### 9.2 Flag CDN

| รายการ | ค่า |
|--------|-----|
| ผู้ให้บริการ | `flagcdn.com` |
| รูปแบบ URL | `https://flagcdn.com/w40/{country-code}.png` |
| การใช้งาน | ไอคอนธงในตัวเลือกภาษา (วงกลม, 18–20px) |

### 9.3 ฟอนต์

| ฟอนต์ | แหล่งที่มา | การใช้งาน |
|-------|-----------|---------|
| Playfair Display | Google Fonts | หัวข้อ |
| Inter | Google Fonts | เนื้อหา |
| Material Symbols Rounded | `/public/fonts/` (self-hosted) | Icon font |

---

## 10. งานที่ยังค้างและแผนในอนาคต

| # | งาน | ความสำคัญ |
|---|-----|----------|
| 1 | **Backend สำหรับแบบฟอร์มติดต่อ** — เชื่อมต่อการส่งแบบฟอร์มกับ email หรือ CRM | สูง |
| 2 | **Analytics** — ผสาน tracking (GA4 หรือเทียบเท่า) | สูง |
| 3 | **แปลเนื้อหาเต็มรูปแบบ** — แปลเนื้อหาทุกหน้า (ปัจจุบันมีเฉพาะ UI shell) | สูง |
| 4 | **เชื่อมต่อ CMS** — แทนที่ data files แบบ static ด้วย headless CMS | กลาง |
| 5 | **SEO metadata** — เพิ่ม `title` และ `description` แบบ dynamic ต่อหน้า | กลาง |
| 6 | **Authentication** — ระบบ login สำหรับ backoffice console | กลาง |
| 7 | **UI สำหรับ Service capabilities** — แสดงข้อมูล `capabilities` และ `approach` ในหน้า service detail | ต่ำ |
| 8 | **UI สำหรับ Sector challenges** — แสดง array `challenges` ในหน้า sector detail | ต่ำ |
| 9 | **Error boundaries** — จัดการข้อผิดพลาดของแผนที่และแบบฟอร์ม | ต่ำ |
| 10 | **Self-host map tiles** — แทนที่ `demotiles.maplibre.org` ด้วย tiles ที่โฮสต์เอง | ต่ำ |

---

*เอกสารนี้ดูแลที่ `/biz_spec/SRS-TH.md` — อัปเดตเวอร์ชันและวันที่ทุกครั้งที่มีการแก้ไข*
