# System Logic & Navigation Restructure

## 1) Navigation model (diagnosis-first)

### Primary navigation

1. Start Diagnosis  
   Bắt đầu chẩn đoán
2. How It Works  
   Quy trình điều trị
3. Skin Journal  
   Theo dõi tiến triển da
4. Medical Team  
   Đội ngũ bác sĩ
5. Support  
   Hỗ trợ

### Utility navigation

- EN | VI language toggle
- Secure Account  
  Tài khoản bảo mật

### Removed from top-level navigation

- Shop
- Product categories
- Program selector cards
- Price grid by product line

These elements can exist downstream only after diagnosis and plan unlock.

---

## 2) Prescribed-commerce flow

### Step A: Entry (always diagnosis CTA)

All high-intent pages use the same primary action:

**Start Skin Diagnosis**  
**Bắt đầu chẩn đoán da**

### Step B: Clinical intake

- Condition concerns
- Symptom severity
- Skin type history
- Photo capture (front/left/right)
- Contraindications and allergies

### Step C: Assessment output

Users do **not** see multiple programs to choose from.

They see:

- Diagnosed concern summary
- Clinical objective (e.g., barrier repair + pigment control)
- Recommended treatment cadence (8 or 12 weeks)

### Step D: Plan unlock

Primary CTA:

**Unlock Your Treatment Plan**  
**Mở phác đồ điều trị dành riêng cho bạn**

### Step E: Prescribed kit conversion

Checkout framing is medical and guided:

- “Your prescribed treatment kit”
- “Includes physician-selected actives, schedule, and follow-up checkpoints”

Primary CTA:

**Get Your Prescribed Kit**  
**Nhận liệu trình điều trị phù hợp**

---

## 3) Program page redesign (outcome-based, not selectable)

## Current anti-pattern to avoid

- "Choose Program A/B/C"
- Comparison cards with “Most popular”
- Add-to-cart by individual SKU

## New page structure

1. **Clinical Goal**  
   Mục tiêu điều trị lâm sàng
2. **What Your Plan Targets**  
   Vấn đề mà phác đồ tập trung xử lý
3. **Protocol Timeline** (Week 1-2 / 3-6 / 7-12)
4. **Your Prescribed Kit Includes**
5. **Physician Monitoring & Adjustments**
6. **Next Step CTA**: Get your prescribed kit

Program labels become internally clinical, not consumer-choice labels:

- Acne Recovery Protocol (internal)
- Pigment Control Protocol (internal)
- Barrier Reset Protocol (internal)

On UI, users only see their assigned plan name as an outcome, e.g.:

**Your Recommended Plan: Recovery Protocol**  
**Phác đồ được khuyến nghị: Phác đồ phục hồi**

---

## 4) Conversion architecture (subtle monetization)

## Language substitutions

- Buy now → Get your prescribed kit
- Choose your program → Unlock your treatment plan
- Products → Clinical components
- Cart → Treatment summary

## Conversion checkpoints

1. Post-diagnosis summary
2. Plan details panel
3. Progress setup screen
4. Follow-up reminder screens

Each checkpoint contains one primary action only, reducing choice friction and preserving clinical authority.

---

## 5) UX tone rules

- Minimal text blocks
- Clinical verbs (assess, prescribe, monitor, adjust)
- Soft reassurance without marketing hype
- Avoid discounts/flash sale language
- Avoid “shopping” metaphors

This ensures experience remains premium, medical, and conversion-focused.
