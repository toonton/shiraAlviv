---
name: hebrew-safe-coding
description: Rules for safe Hebrew text editing to avoid 400 INVALID_ARGUMENT API errors. Use when editing index.html or other files containing Hebrew text to ensure UTF-8 preservation, zero-touch for strings, and atomic edits.
---

# Hebrew-Safe Coding

When editing files (specifically `index.html`) containing Hebrew text, follow these strict rules to avoid `400 INVALID_ARGUMENT` API errors.

## Strict Hebrew Handling Rules

1.  **Zero-Touch for Hebrew Strings**: Never rewrite, reformat, or re-type lines containing Hebrew characters unless explicitly asked to change the text itself.
2.  **Structural Offsets Only**: When removing elements (like `.avatar` circles), use precise line-deletion or CSS-class targeting. Do not include the Hebrew text in your 'Search' or 'Replace' buffer if possible.
3.  **UTF-8 Preservation**: Ensure all edits are returned in strict UTF-8 encoding. Do not attempt to 'fix' RTL (Right-to-Left) visual alignment in the code block, as this corrupts the API payload.
4.  **Atomic Edits**: If a section contains Hebrew, perform the edit in the smallest possible 'hunk' (1-2 lines) rather than replacing the entire parent `<div>`.
5.  **Script-Based Editing (Preferred)**: For complex structural changes or multi-line merges involving Hebrew text, **always prefer using a script** (e.g., Python) to perform the modification. This bypasses the risk of the LLM/API misinterpreting or corrupting Hebrew strings during the `replace` process.
6.  **Validation**: Before sending the final API write request, verify that no Hebrew characters were accidentally transformed into Unicode escape sequences (like `\u05d0`).

## Workflow

### 1. Research & Targeting
Identify the specific lines to be changed. Use `read_file` with `start_line` and `end_line` to isolate the Hebrew text.

### 2. Strategic Execution
Choose the safest method:
- **Small Edits**: Use the `replace` tool with surrounding ASCII markers.
- **Complex Edits**: Write and run a **Python script** that reads the file, performs the logic (e.g., regex, line replacement), and writes the file back. This is much safer for Hebrew.

### 3. Verification
Verify the final content using `read_file` to ensure no encoding corruption occurred and delete any temporary scripts used.
