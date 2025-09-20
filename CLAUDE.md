# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server (Vite)
- `pnpm check` - Run Biome linting and formatting checks

## Project Architecture

This is an accessibility challenge project for implementing a modal form component in React + TypeScript. The codebase is minimal and focused:

- **Entry Point**: Implementation starts from `src/ModalFormPage.tsx` (currently placeholder)
- **Main Challenge**: Build an accessible modal with declarative API (`const result = await openFormModal()`)
- **Technology**: React 19.1.1, TypeScript with strict mode, Vite build tool, Biome for linting

## Key Implementation Requirements

### Modal API Design
- Must support `const result = await openFormModal()` pattern
- Returns form data on submit, `null` on cancel/close

### Accessibility Features Required
- ESC key and overlay click to close
- Focus management: title on open → trigger button on close
- Tab/Shift+Tab navigation within modal
- ARIA attributes: `aria-modal`, `aria-labelledby`, `aria-describedby`
- Screen reader error announcements
- `prefers-reduced-motion` support

### Form Requirements
- Keyboard-only operation
- Email validation (minimum)
- Background scroll prevention
- Internal scrolling for overflow

## Code Style

- Biome configuration: single quotes, space indentation
- TypeScript strict mode enabled
- Uses modern-normalize for CSS reset