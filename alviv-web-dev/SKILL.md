---
name: alviv-web-dev
description: Specialized skill for developing and maintaining the ALVIV medical dashboard. Use when refactoring UI/UX components, updating clinical data, or ensuring RTL Hebrew support in the dashboard.
---

# ALVIV Web Development Skill

This skill centralizes the design system, RTL layout logic, and clinical data structures for the ALVIV medical dashboard.

## Design System (Tokens)

- **Colors**:
  - Navy: `#0F172A` (Backgrounds, Headings)
  - Cyan: `#0EA5E9` (Primary Brand, Links, Active States)
  - Green: `#10B981` (Success, Positive results)
  - Amber: `#F59E0B` (Warnings, Mid-states)
  - Red: `#EF4444` (Risks, Negative states)
- **Typography**: 'Inter', sans-serif. 14px base, 1.6 line-height.
- **Borders**: 1px solid `#E2E8F0` (var(--border)).
- **Radius**: 16px (var(--rad)).
- **Shadows**: 
  - Standard: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
  - MD: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
  - LG: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

## RTL Layout Patterns (Hebrew)

Always ensure `dir="rtl"` on the `html` or container level.

### Horizontal Card Pattern (e.g., Histology)
Structure:
1. **Title**: Top (full width).
2. **Content Row**: `display: flex; gap: 24px;`
   - **Image**: Visual RIGHT (RTL start). `flex: 0 0 200px;`
   - **Text**: Visual LEFT (RTL end). `flex: 1;`

### 4-Card Emoji Grid (e.g., Market Entry Barriers)
Structure:
- `display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;` (for 4 cards, use 2x2).
- Each card: `background: var(--white); border: 1px solid var(--border); border-radius: var(--rad); padding: 24px;`

## Clinical Narrative Integration

- **UVP**: "אספקת פתרון זעיר-פולשני, מותאם אישית, המטפל בשורש הבעיה של אי-ספיקת סוגרים (FI) — ללא כאב וללא צורך באשפוז."
- **Operating Principle (עקרון פעולה)**: Replaces "Real-time temperature monitoring". Focus on personalized medicine and physiological triggers.

## Media Assets
- FIH Results: `clusters.jpeg`
- Market Distribution: `התפלגות עלגבי גילאים.jpg.jpeg`
- Clinical Sketch: `temp_docx/word/media/image11.png` (2MB)

## Guidelines for Sub-agents
When delegating to `generalist` or `fullstack-engineer`:
1. Use the CSS variables defined in `:root`.
2. Maintain Hebrew terminology extracted from `אלביב 22.2.docx`.
3. Prioritize surgical `replace` calls over full file rewrites.
