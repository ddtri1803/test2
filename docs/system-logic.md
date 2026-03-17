# System Logic & Navigation Restructure

## 1) North-star product model

The platform operates as **prescribed commerce**:

- Diagnosis is the clinical gate
- Treatment plan is the medical output
- Kit purchase is the operational next step

Users move forward through a guided protocol. They do not browse or assemble routines.

---

## 2) Navigation architecture (diagnosis-first)

## Public navigation

1. Start Diagnosis  
   Bắt đầu chẩn đoán da
2. How Treatment Works  
   Cách liệu trình hoạt động
3. Clinical Results  
   Kết quả lâm sàng
4. Medical Team  
   Đội ngũ chuyên môn
5. Support  
   Hỗ trợ

## Utility navigation

- EN | VI
- Secure Account  
  Tài khoản bảo mật

## Removed from global nav

- Shop
- Product category listing
- Program chooser
- Bundle comparison table

Commercial surfaces appear only after diagnosis output.

---

## 3) System logic (state-driven flow)

## State machine

1. `UNASSESSED`
   - User has not completed clinical intake
   - Primary action: Start Diagnosis
2. `ASSESSED`
   - Clinical profile computed
   - Primary action: Unlock Treatment Plan
3. `PLAN_UNLOCKED`
   - Plan assigned and timeline shown
   - Primary action: Get Prescribed Kit
4. `KIT_ACTIVE`
   - Treatment underway
   - Primary action: Continue Treatment
5. `REVIEW_DUE`
   - Follow-up checkpoint reached
   - Primary action: Book Follow-up Review

## Guardrails

- If state = `UNASSESSED`, block plan and kit pages behind diagnosis gate.
- If state = `ASSESSED`, hide alternate plans and recommendation carousels.
- If state = `PLAN_UNLOCKED`, show only one prescribed kit CTA.
- Keep exactly one primary CTA per page.

---

## 4) End-to-end prescribed-commerce journey

## Step 1 — Diagnosis entry

Entry pages and high-intent sections share one primary CTA:

**Start Skin Diagnosis**  
**Bắt đầu chẩn đoán da**

## Step 2 — Clinical intake

Collect only treatment-relevant inputs:

- Concern clusters (acne, pigment, redness, texture)
- Severity + duration
- Trigger profile (sun, hormones, irritation)
- Skin history and current usage
- Contraindications (pregnancy, known allergies)
- Standardized photos (front, left, right)

## Step 3 — Assessment output

Output format is clinical and singular:

- Skin condition summary
- Clinical goals
- Prescribed protocol length (8–12 weeks)

No plan grid. No user-side program choice.

## Step 4 — Plan unlock

Primary CTA:

**Unlock Your Treatment Plan**  
**Mở phác đồ điều trị dành riêng cho bạn**

## Step 5 — Kit conversion

Commercial intent is reframed as treatment readiness:

- “Your prescribed treatment kit is ready”
- “Physician-selected components, schedule, and follow-up guidance included”

Primary CTA:

**Get Your Prescribed Kit**  
**Nhận liệu trình điều trị phù hợp**

---

## 5) Treatment page redesign (outcome, not selection)

## Anti-patterns to remove

- “Choose your program” cards
- “Most popular” ranking labels
- Add-to-cart at individual product level

## Required page structure

1. Diagnosis Summary  
   Tóm tắt chẩn đoán
2. Clinical Objective  
   Mục tiêu điều trị lâm sàng
3. Protocol Timeline (Week 1–2, 3–6, 7–12)
4. Prescribed Kit Components  
   Thành phần liệu trình theo chỉ định
5. Monitoring & Adjustment Rules  
   Quy tắc theo dõi và điều chỉnh
6. Next Action: Get Your Prescribed Kit

## Naming model

Internal only:

- Acne Recovery Protocol
- Pigment Control Protocol
- Barrier Reset Protocol

User-facing:

**Your Assigned Plan: Recovery Protocol**  
**Phác đồ của bạn: Phác đồ phục hồi**

---

## 6) Conversion language framework

Replace retail verbs with clinical progression language:

- Buy now → Get your prescribed kit
- Choose program → Unlock your treatment plan
- Products → Clinical components
- Cart → Treatment summary
- Checkout → Confirm treatment start

## Conversion checkpoints

1. Post-diagnosis summary
2. Plan details page
3. Treatment start confirmation
4. Follow-up milestone prompt

Each checkpoint keeps one primary action and one confidence-supporting explanation.

---

## 7) UX tone and interaction rules

- Clinical, concise, calm
- Premium layout with high whitespace and clear hierarchy
- Evidence-forward copy, not promotional copy
- No sale urgency, discount language, or “shop now” framing
- Reassure users with process clarity (assess → prescribe → monitor → adjust)

This preserves medical credibility while maintaining subtle, high-intent conversion.
