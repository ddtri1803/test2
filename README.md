# Dermatology Frontend Theme System

This repository provides a **frontend-only theme foundation** for a prescribed dermatology treatment platform.

Flow reflected in UI:

Diagnosis → Assigned Plan → Treatment Kit → Monitoring

## Structure

- `frontend/`
  - `index.html`
  - `diagnosis.html`
  - `plan.html`
  - `kit.html`
  - `monitoring.html`
- `admin/`
  - `dashboard.html`
  - `diagnosis.html`
  - `plan-builder.html`
  - `kit-builder.html`
  - `monitoring.html`
- `assets/`
  - `css/theme.css`
  - `js/state.js`

## Implementation notes

- Plain HTML + TailwindCSS (CDN) + minimal vanilla JS
- State simulation via `body[data-state="pre-diagnosis|diagnosed|active-treatment"]`
- Bilingual content with English line first and Vietnamese line below
- Minimal, clinical, premium visual style
