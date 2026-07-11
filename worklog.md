# Worklog

## 2025-01-XX — Shared & Loading Components (Batch 1)

### Overview
Created 7 production-ready shared/loading components for the Mani Shekofteh portfolio. All components are `'use client'`, fully typed, use design tokens from `@/config/design-tokens`, and pass ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/shared/aurora-background.tsx` | Animated aurora gradient background with 3 CSS orbs (blue/indigo/purple) + noise overlay |
| 2 | `src/components/loading/cinematic-loader.tsx` | Full-screen loading overlay: ink-spread text reveal → fade-out → `setLoadingComplete(true)` |
| 3 | `src/components/shared/scroll-progress.tsx` | 2 px gradient progress bar (indigo→cyan) at viewport top; uses `useScroll` + `useSpring` + `useMotionValueEvent` |
| 4 | `src/components/shared/section-wrapper.tsx` | `<section>` wrapper with `useInView` fade-up animation (`once: true`) + `.section-padding` |
| 5 | `src/components/shared/glass-panel.tsx` | Glass-morphism container (`default`/`strong`/`subtle` variants) with Framer Motion hover lift |
| 6 | `src/components/shared/magnetic-button.tsx` | Magnetic hover button; cursor-following via `useMotionValue`/`useSpring`/`useMotionTemplate` (max 8 px pull) |
| 7 | `src/components/shared/back-to-top.tsx` | Floating glass circular button (ArrowUp); appears after 400 px scroll; RTL-aware positioning |

---

### Design Decisions

- **Aurora Background**: Pure CSS approach (divs + keyframes) rather than canvas/WebGL to keep the component lightweight. The three orbs use `aurora-shift`, `aurora-shift-2`, and `aurora-shift-3` keyframes with staggered durations (15 s / 20 s / 25 s) for organic movement. Sizes use `vw` units with `max-h`/`max-w` caps for responsiveness.

- **Cinematic Loader**: State machine with three phases (`ink` → `fade` → `done`). The ink-spread is a pure CSS `clip-path` animation on the text. The fade-out is handled by Framer Motion's `animate` prop. `loadingComplete` is checked in the render (not via useEffect) to avoid the `react-hooks/set-state-in-effect` lint rule.

- **Scroll Progress**: `useMotionValueEvent` is used to toggle opacity — the bar is invisible at the very top and fades in once the user starts scrolling, avoiding a distracting 0-width line.

- **Magnetic Button**: Uses `useMotionTemplate` to compose `translateX` and `translateY` into a single CSS `transform` string, applied via `style={{ transform }}`. The spring config (`stiffness: 300, damping: 20, mass: 0.5`) gives a snappy but not jittery feel.

- **Back to Top**: Uses a native `scroll` event listener with `{ passive: true }` for performance. RTL support flips the horizontal position via `useApp().rtl`. The z-index uses `tokens.zIndex.dotNav` (40) to sit above content but below the navbar (50).

---

### Dependencies Used
- `framer-motion` — `motion`, `useScroll`, `useSpring`, `useMotionValue`, `useMotionTemplate`, `useMotionValueEvent`, `useInView`, `AnimatePresence`
- `lucide-react` — `ArrowUp` icon
- `@/config/design-tokens` — `tokens` for colors, z-indices, surfaces
- `@/components/providers/app-provider` — `useApp()` for `loadingComplete`, `setLoadingComplete`, `rtl`
- `@/lib/utils` — `cn()` for class merging

---

## 2025-01-XX — About Section & Soft Skills Panel (Batch 2)

### Overview
Created 2 components for the About section of the Mani Shekofteh portfolio — a narrative two-column glass-card grid and a floating desktop-only soft-skills side panel. All code is `'use client'`, fully typed, locale-aware (en/fa/ar), RTL-ready, and passes ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/about/about-section.tsx` | Main About section: gradient title, 3-column narrative grid (3 strong glass paragraphs + 3 insight cards) with staggered fade-up |
| 2 | `src/components/about/soft-skills-panel.tsx` | Fixed floating panel (lg+ only) showing soft skills with animated progress bars, slides in/out based on #about visibility |

### File Modified

| # | File | Change |
|---|------|--------|
| 3 | `src/app/page.tsx` | Replaced placeholder with `<AboutSection />` |

---

### Design Decisions

- **About Section Layout**: 5-column CSS grid (`lg:grid-cols-5`) — left column spans 3 for the three narrative paragraphs, right column spans 2 for the insight cards (Philosophy, Approach, Aspirations). On mobile it collapses to a single column. The 3/2 split gives the narrative text more breathing room while keeping the insight cards visually distinct.

- **Glass Variant Differentiation**: Main paragraphs use `variant="strong"` (more opaque, heavier backdrop blur) to anchor the reading experience. Insight cards use `variant="default"` (lighter glass) to feel secondary. The soft-skills panel uses `variant="subtle"` (most transparent) since it's an overlay and shouldn't compete with the main content.

- **Stagger Animation**: Uses Framer Motion's custom variant pattern — `fadeUp` defines `hidden` and `visible` states with a `custom` index for delay. All 6 cards animate from the same `useInView` trigger on the grid container, so they enter as a choreographed group rather than independently.

- **Insight Card Icons**: Each insight card gets a small icon container with a subtle glass background and a distinct accent color (amber for Philosophy, emerald for Approach, rose for Aspirations). This adds visual variety without introducing a new design system.

- **Soft Skills Panel — Visibility Tracking**: Uses a native `IntersectionObserver` on `#about` (not Framer Motion's `useInView`) because the panel sits outside the section DOM tree (it's `position: fixed`). The observer fires `setAboutVisible(true/false)` which drives `AnimatePresence`.

- **Soft Skills Panel — Slide Direction**: RTL-aware — slides from the right on LTR, from the left on RTL. Position is also flipped using dynamic style properties.

- **Soft Skills Panel — Progress Bar Animation**: Each bar uses `motion.div` with `initial={{ width: 0 }}` → `animate={{ width: level% }}`. Bars are triggered by a nested `useInView` on the panel's inner container (`once: true`), so they fill up only when the panel is actually visible to the user. Each bar is staggered by `tokens.motion.stagger.fast` (40ms).

- **Icon Lookup Map**: Soft skills store icon names as strings (`'MessageSquare'`, `'Shield'`, etc.). A static `iconMap` record maps these to the actual lucide-react components. This avoids dynamic imports while keeping the data structure clean. Falls back to `MessageSquare` if an unknown icon name is encountered.

- **z-index**: The floating panel uses `z-[45]` to sit above content cards (10) and dot nav (40) but below the navbar (50).

---

### Dependencies Used
- `framer-motion` — `motion`, `useInView`, `AnimatePresence`
- `lucide-react` — `Sparkles`, `Target`, `Rocket` (insight cards); `MessageSquare`, `Shield`, `Compass`, `Lightbulb`, `Puzzle`, `RefreshCw`, `Users`, `BookOpen` (soft skills)
- `@/config/design-tokens` — `tokens` for durations, easings, stagger values, line heights
- `@/components/providers/app-provider` — `useApp()` for `locale`, `rtl`, `t`
- `@/components/shared/section-wrapper` — `SectionWrapper`
- `@/components/shared/glass-panel` — `GlassPanel`
- `@/lib/constants` — `SOFT_SKILLS` array

---

## 2025-01-XX — Navigation System (Batch 3)

### Overview
Created 2 navigation components for the Mani Shekofteh portfolio — a premium glass-morphism top navbar and a vertical dot navigation sidebar. Both are `'use client'`, fully typed, locale-aware (en/fa/ar), RTL-ready, and pass ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/navigation/glass-navbar.tsx` | Fixed glass-morphism navbar: auto-hide on scroll down, glass-strong after 50 px scroll, MS logo, section links with active indicator, theme toggle, language dropdown, animated mobile hamburger menu |
| 2 | `src/components/navigation/dot-navigation.tsx` | Fixed vertical dot nav (md+ only): dots for each section, active dot expands to pill with glow and tooltip, thin connecting line, RTL position flip |

---

### Design Decisions

- **Scroll Tracking (shared logic)**: Both components use an identical `useActiveSection` hook — a native `scroll` event listener with `{ passive: true }` that compares `scrollY + viewport/3` against each section's `offsetTop`. This 1/3 offset means the active indicator shifts when the next section's top third is visible, giving a natural feel. Both components independently track state to avoid coupling.

- **Glass Navbar — Auto-hide**: Uses a `useRef<number>` for `prevScrollY` compared inside Framer Motion's `useMotionValueEvent(scrollY, 'change', ...)`. If the latest scroll is greater than previous *and* past 200 px, `hidden` flips to `true`. The header is animated with `motion.header animate={{ y: hidden ? -100 : 0 }}` using `tokens.motion.ease.spring` for a snappy slide-out/slide-in.

- **Glass Navbar — Glass Transition**: At scroll ≤ 50 px the bar is fully transparent with `border-transparent`. At > 50 px it gains `.glass-strong` (white 10 % bg, 24 px blur, 15 % border). The `transition-colors duration-500` makes the transition feel gradual rather than abrupt. A subtle `border-b border-white/[0.08]` appears simultaneously.

- **MS Logo**: Custom inline SVG with two path elements — an "M" formed by two overlapping chevrons and an "S" formed by a flowing curve. Both strokes reference a single `<linearGradient>` from indigo (#6366f1) through violet (#8b5cf6) to light-violet (#a78bfa). The logo is 32×32 viewBox rendered at `w-8 h-8` with `whileHover={{ scale: 1.1 }}`.

- **Active Link Indicator**: Desktop nav links use a `layoutId="navbar-active-indicator"` `motion.span` — a 1 px tall, 16 px wide gradient line (indigo → cyan → violet) positioned at the button's bottom. Framer Motion's layout animation automatically slides the indicator between active items, creating a smooth morphing underline effect.

- **Language Dropdown**: Uses shadcn's `DropdownMenu` with `align={rtl ? 'start' : 'end'}`. Each item shows a flag emoji + locale label. The active locale gets a small dot indicator via `layoutId="locale-check"` for a smooth repositioning animation. The dropdown content uses `glass-strong` styling for visual consistency.

- **Mobile Menu**: The hamburger icon is built with three `motion.span` bars animated between `closed` and `open` variants (the outer bars rotate ±45°, the middle fades out). The dropdown uses `animate={{ height: 'auto' | 0, opacity: 1 | 0 }}` with spring easing. Each menu item staggers in with a 40 ms delay using `tokens.motion.stagger.fast`.

- **Dot Navigation — Active State**: The active dot transitions from a 10×10 px circle (`w-2.5 h-2.5 glass-strong`) to a 4×32 px pill (`w-1 h-8`) with a `bg-gradient-to-b` (indigo → violet → cyan) and the `.glow-primary` box-shadow. Framer Motion's `layout` prop handles the shape morphing automatically.

- **Dot Navigation — Tooltip**: Appears on the *opposite* side of the dots (right for LTR, left for RTL). Uses `AnimatePresence` with a fade + slide animation. The tooltip is shown for both active and hovered states, with the active tooltip getting `text-foreground` vs `text-muted-foreground` for hovered.

- **Dot Navigation — Connecting Line**: A single `absolute w-px bg-white/[0.06]` div spans the full height of the nav, creating a subtle vertical track behind the dots. This gives the dots a visual "rail" to sit on.

- **z-index Layering**: Navbar at z-50, dot nav at z-40 — consistent with `tokens.zIndex.navbar` and `tokens.zIndex.dotNav`.

- **RTL Handling**: Both components check `useApp().rtl` to flip layout direction. The navbar reverses nav items (`flex-row-reverse`) and swaps side alignment on the language dropdown. The dot nav swaps `left-5` ↔ `right-5` and the tooltip position.

---

### Dependencies Used
- `framer-motion` — `motion`, `useScroll`, `useMotionValueEvent`, `AnimatePresence`, `layoutId`
- `lucide-react` — `Sun`, `Moon`, `Globe`
- `next-themes` — `useTheme` for theme toggle
- `@/components/ui/button` — `Button` (ghost, icon variants)
- `@/components/ui/dropdown-menu` — `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`
- `@/config/design-tokens` — `tokens` for durations, easings, spring configs, z-indices, layout max-width
- `@/components/providers/app-provider` — `useApp()`, `LOCALES`, `LOCALE_LABELS`
- `@/lib/constants` — `SECTIONS` array
- `@/lib/utils` — `cn()` for class merging
- `@/types` — `Locale` type

---

## 2025-01-XX — Hero Section & Social Links (Batch 4)

### Overview
Created 2 components for the hero section of the Mani Shekofteh portfolio — the cinematic full-viewport hero with animated portrait and a reusable social-links row. All code is `'use client'`, fully typed, locale-aware, RTL-ready, and passes ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/home/hero-section.tsx` | Full-viewport hero: split layout (portrait + content), parallax portrait, rotating conic-gradient border, word-by-word name reveal, glass CTA buttons, social links row |
| 2 | `src/components/home/social-links.tsx` | Reusable social-link icon buttons with magnetic hover effect, glass styling, and glow-on-hover |

### File Modified

| # | File | Change |
|---|------|--------|
| 3 | `src/app/globals.css` | Added `.portrait-border-wrap`, `@keyframes border-spin`, `.portrait-border-inner`, `.social-glow` CSS rules |
| 4 | `src/app/page.tsx` | Replaced `<AboutSection />` with `<HeroSection onOpenResume={() => {}} />` for preview |

---

### Design Decisions

- **Split Layout with RTL**: Uses `flex-col lg:flex-row`. The portrait is first in the DOM, content second. CSS flexbox respects the document's `dir` attribute (set by `AppProvider`), so LTR naturally places portrait-left/content-right, and RTL reverses to portrait-right/content-left without any `rtl:` utility classes.

- **Portrait Parallax**: Uses `useMotionValue` for raw normalised cursor position (0→1 across the container). `useTransform` maps this to ±15 px displacement range. A `useSpring` (stiffness: 100, damping: 20) smooths the movement for a cinematic float feel. On mouse leave, values reset to 0.5 (center = zero displacement).

- **Animated Gradient Border**: Pure CSS approach — a wrapper div with `overflow: hidden` and `padding: 2px`. A `::before` pseudo-element is sized at `inset: -50%` with a `conic-gradient` (indigo/violet spotlight at 50%) that rotates via `@keyframes border-spin` over 4 seconds. The inner content (z-index: 1) covers the center, revealing only the 2 px border ring of the rotating gradient.

- **Radial Glow**: A blurred `radial-gradient` div (`-inset-8`, `blur-2xl`) sits behind the portrait container, creating a soft indigo-to-purple ambient glow that reinforces the portrait's prominence.

- **Word-by-Word Name Reveal**: `t.hero.name` is split on spaces via `useMemo`. Each word is a `motion.span` with `initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}` → `animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}`. Stagger is 100 ms per word starting at 500 ms. The blur adds a subtle "materialise from light" feel.

- **Sequential Animation Cascade**: `loadingComplete` gates the entire hero via `AnimatePresence mode="wait"`. The animation sequence is: portrait (0 s), greeting (0.3 s), name (0.5 s + word stagger), tagline (1.0 s), CTA buttons (1.3 s, 1.5 s), social links (1.7 s). A shared `fadeUp` variant with `custom` delay parameter keeps the choreography consistent.

- **Social Links — Magnetic Effect**: Each link is a `motion.a` with its own `useMotionValue` pair for X/Y displacement (max 6 px pull) and a `hovered` motion value for scale (1 → 1.15). All three are composed into a single CSS `transform` via `useMotionTemplate`, avoiding conflicts between Framer Motion's `style` and `whileHover`. The `.social-glow` CSS class adds the indigo box-shadow glow on hover.

- **CTA Buttons**: Both use the existing `MagneticButton` component. The "View Activity" button wraps a semantic `<a>` tag with `glass` styling. The "Resume" button uses a primary-tinted outline style (`bg-primary/10 text-primary border-primary/20`) and calls `onOpenResume` via the magnetic button's `onClick`.

- **Portrait Image**: Uses `next/image` with `priority` (above the fold) and the photo at `/upload/IMG_20260220_003143_304.jpg`. A gradient overlay (`linear-gradient(to top, rgba(255,255,255,0.04), transparent)`) at the bottom 1/3 creates the glass-subtle fade-up effect.

---

### Dependencies Used
- `framer-motion` — `motion`, `AnimatePresence`, `useMotionValue`, `useSpring`, `useTransform`, `useMotionTemplate`
- `lucide-react` — `Activity`, `FileText` (CTA buttons); `Mail`, `Github`, `Linkedin`, `Send` (social links)
- `next/image` — `Image` for portrait
- `@/components/providers/app-provider` — `useApp()` for `t`, `loadingComplete`
- `@/components/shared/magnetic-button` — `MagneticButton` for CTA buttons
- `@/config/design-tokens` — `tokens` for motion durations, easings
- `@/lib/constants` — `SOCIAL_LINKS` array
- `@/lib/utils` — `cn()` for class merging

---

## 2025-01-XX — Skills & Projects Sections (Batch 5)

### Overview
Created 2 premium portfolio sections — a "technology ecosystem" skills grid with animated progress bars and a project showcase with 3D tilt cards, filter bar, and glass shine effects. Both are `'use client'`, fully typed, locale-aware (en/fa/ar), RTL-ready, and pass ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/skills/skills-section.tsx` | Technology ecosystem grid: 7 category cards with icon headers and animated skill progress bars |
| 2 | `src/components/projects/projects-section.tsx` | Premium project showcase: filter bar with layoutId indicator, 3D tilt cards with glass shine, cover gradients |

---

### Design Decisions

- **Icon Lookup (Skills)**: Icons are pre-rendered as `React.ReactElement` instances in a module-level `iconElements` map (keyed by string name). This avoids the `react-hooks/static-components` lint error that fires when a component is created from a variable during render. The pre-rendered elements are simply referenced in JSX, not instantiated.

- **Animated Progress Bars (Skills)**: Each skill row has its own `useInView` trigger with a small `-20px` margin for early activation. The bar animates from `width: 0` to `width: {level}%` with an 0.8 s ease-out, staggered by 50 ms per skill. The percentage label fades in after the bar has partially filled (0.5 s delay). The gradient fill uses `from-indigo-500 via-violet-500 to-cyan-400` for a cohesive accent palette.

- **Category Card Layout (Skills)**: Responsive grid — 1 column on mobile, 2 on `md`, 3 on `lg`. Each card is a `GlassPanel` (default variant) with a header (icon in a `bg-primary/10` badge + locale-aware name), a thin `bg-white/[0.06]` divider, and the skill list. Cards use Framer Motion staggered entrance via `containerVariants`/`cardVariants`.

- **Filter Bar (Projects)**: Horizontal row of filter buttons inside a `glass-strong` pill container. The active button gets a sliding background indicator using Framer Motion's `layoutId="project-filter-indicator"`. This creates a smooth morphing animation when switching between All/Backend/Frontend/Experimental. The spring config (`stiffness: 380, damping: 30`) gives a snappy but not bouncy transition.

- **3D Tilt Effect (Projects)**: Each card tracks mouse position via `onMouseMove`, computing `rotateX`/`rotateY` (max ±6°) from the cursor's offset relative to the card center. The tilt is applied through Framer Motion's `animate` prop with a spring config (`stiffness: 300, damping: 20, mass: 0.5`) for a smooth, weighty feel. On mouse leave, values reset to zero and the card settles.

- **Glass Shine Effect (Projects)**: Two layered effects on hover: (1) A `radial-gradient` spotlight that follows the cursor position, creating a localized highlight; (2) A diagonal linear-gradient sweep overlay that adds a subtle reflection. Both fade in/out with the hover state.

- **Card Lift**: `whileHover={{ y: -8 }}` is applied via the `animate` prop alongside the tilt, so the lift and rotation happen in a single composited transform with no conflicts.

- **Project Card Cover**: Uses the project's `coverGradient` string as a Tailwind `bg-gradient-to-br` class. A `bg-gradient-to-t from-black/70` overlay at the bottom ensures the project name text is readable. A category badge sits in the top-right corner.

- **Card Content Stack**: Description (3-line clamp), Architecture label + text, tech stack pills (glass-subtle, rounded-full), 2-3 feature items with CheckCircle2 icons, and action buttons in a bottom row separated by a thin border.

- **Action Buttons**: Use shadcn `Button` (ghost variant) wrapped in `<a>` tags with `target="_blank" rel="noopener noreferrer"`. Only rendered if the project has the corresponding URL.

- **AnimatePresence for Filtering**: The grid uses `key={activeFilter}` on the container and `AnimatePresence mode="popLayout"` to animate cards in/out when the filter changes. Cards that don't match the new filter exit with a scale-down + fade, and matching cards enter with the staggered entrance.

- **RTL Support**: Both components are inherently RTL-compatible. The skills section uses flexbox which respects `dir="rtl"`. The projects section uses `end-4` (logical property) for the category badge position. Text alignment is handled by the global `[dir="rtl"]` rule.

---

### Dependencies Used
- `framer-motion` — `motion`, `useInView`, `AnimatePresence`, `layoutId`
- `lucide-react` — `Server`, `Monitor`, `Database`, `Layers`, `Cloud`, `Brain`, `Wrench` (skills icons); `ExternalLink`, `Github`, `CheckCircle2` (project cards)
- `@/components/providers/app-provider` — `useApp()` for `locale`, `t`, `rtl`
- `@/components/shared/section-wrapper` — `SectionWrapper`
- `@/components/shared/glass-panel` — `GlassPanel`
- `@/components/ui/button` — `Button` (ghost variant)
- `@/lib/constants` — `SKILL_CATEGORIES`, `PROJECTS` arrays
- `@/lib/utils` — `cn()` for class merging
- `@/types` — `Project` type

---

## 2025-01-XX — AI Assistant Chat & Resume Modal (Batch 6)

### Overview
Created 3 components for the Mani Shekofteh portfolio — a floating AI assistant chat system (trigger button + full chat window) and a premium resume viewer modal. All code is `'use client'`, fully typed, locale-aware (en/fa/ar), RTL-ready, and passes ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/ai-assistant/ai-chat-button.tsx` | Circular floating glass button with Brain icon, pulsing glow animation, RTL-aware positioning (opposite back-to-top) |
| 2 | `src/components/ai-assistant/ai-chat-window.tsx` | Full chat window: AnimatePresence enter/exit, suggestion chips, glass message bubbles, regex-based markdown rendering, thinking dots, graceful error fallback |
| 3 | `src/components/resume/resume-modal.tsx` | Premium visual resume modal (shadcn Dialog): two-column layout, animated skill bars, timeline experience, project cards, contact info |

### File Modified

| # | File | Change |
|---|------|--------|
| 4 | `src/app/globals.css` | Moved Google Fonts `@import url(...)` before Tailwind imports to fix CSS compilation order error; added `.ai-chat-pulse` keyframe animation and hover glow |
| 5 | `src/app/page.tsx` | Wired AiChatButton, AiChatWindow, and ResumeModal into the page with local open/close state |

---

### Design Decisions

- **AI Chat Button — Positioning**: Placed at `bottom-6 left-6` for LTR (opposite of the back-to-top button at `bottom-6 right-6`). RTL flips this to `right-6` via the `useApp().rtl` flag. Both use `z-40` to stay above content but below the navbar.

- **AI Chat Button — Pulse Glow**: A CSS `@keyframes ai-chat-pulse` animation oscillates `box-shadow` between subtle (`0.12/0.05` alpha) and moderate (`0.3/0.1` alpha) over 3 seconds. On hover, the animation is disabled via `animation: none` and replaced with a stronger static glow (`0.4/0.15` alpha) for an instant response feel.

- **AI Chat Button — Framer Motion**: `whileHover={{ scale: 1.1 }}` and `whileTap={{ scale: 0.92 }}` give tactile feedback. The button is a `motion.button` with `z-40` from design tokens.

- **AI Chat Window — Enter/Exit**: Uses `AnimatePresence` with slide-up + fade + scale animation. Initial state: `opacity: 0, y: 24, scale: 0.95`. The window sits at `bottom-24` (above the button) to avoid overlap. Width is `380px` on desktop, `calc(100% - 3rem)` on mobile. Max height is `600px` with `glass-strong` background and `rounded-2xl`.

- **AI Chat Window — Gradient Accent Line**: A 1px `bg-gradient-to-r from-transparent via-primary/60 to-transparent` line at the very top of the window adds a premium accent without being heavy.

- **Suggestion Chips**: Shown only when `messages.length === 0` and not loading. Each chip is a `glass` pill button. Clicking a chip directly calls `sendMessage(suggestion)`. Chips stagger in with a 0.15 s delay.

- **Message Alignment**: User messages are right-aligned (or left in RTL), using `glass-strong` for higher visual weight. Assistant messages are left-aligned (or right in RTL), using `glass-subtle` to feel lighter. The alignment flips based on `useApp().rtl`.

- **Markdown Rendering**: A lightweight `renderMarkdown()` function handles bold (`**text**`), inline code (`` `code` ``), and links (`[text](url)`) via regex splitting. No external markdown library is used. Line breaks are preserved. This keeps the bundle small while covering the most common formatting needs.

- **Thinking Indicator**: Three `motion.span` dots with staggered `opacity` and `y` animations (0.8 s cycle, 0.2 s stagger). The label text comes from `t.ai_assistant.thinking`.

- **Graceful Error Handling**: When `api.chat.sendMessage()` fails (which it will, since no backend exists yet), the catch block silently creates an assistant message with the fixed text "The AI assistant will be available soon. This feature is being set up." — no console errors are exposed to the user.

- **Auto-scroll**: `useEffect` triggers `scrollIntoView({ behavior: 'smooth' })` on `chatEndRef` whenever `messages` or `isLoading` changes.

- **Input Area**: A `glass-subtle` rounded container with a transparent input and a send button. The send button transitions from `text-muted-foreground/40` (disabled) to `bg-primary text-primary-foreground` (enabled) based on whether input is non-empty and not loading. Enter key sends the message.

- **Resume Modal — Dialog Configuration**: Uses shadcn's `Dialog` with `showCloseButton={false}` to avoid the default close button (the top bar has its own controls). `max-w-4xl` and `h-[90vh]` with `overflow-hidden` on the dialog and `overflow-y-auto` on the content area create a full-height document viewer feel.

- **Resume Modal — Header**: "Mani Shekofteh" in `font-display` with `.gradient-text`, "Backend Engineer" in uppercase `tracking-[0.2em]` below, followed by a contact row with small icons (Mail, Github, Linkedin, Phone, MapPin).

- **Resume Modal — Two-Column Layout**: `lg:grid-cols-12` — left column spans 4 (skills, languages, education), right column spans 8 (summary, experience, projects). On mobile it collapses to single column with a bottom border separator.

- **Resume Modal — Skill Bars**: Each skill has a label (24px width, truncated) and an animated bar. The bar uses `motion.div` with `initial={{ width: 0 }}` → `animate={{ width: level% }}` with a 0.8 s ease-out. Bars are grouped by category (Backend, Frontend, Databases, Tools) in `glass-subtle` section blocks.

- **Resume Modal — Experience Timeline**: A vertical timeline with `TimelineDot` components. The first (most recent) experience gets an active state (`border-primary bg-primary/30`), others are inactive. Each entry shows role, company, period, achievement bullets with ChevronRight icons, and tech stack pills.

- **Resume Modal — Projects Section**: Brief project cards with name, external link icon (if GitHub URL exists), description, and tech pills. Hover effect uses `bg-white/[0.04]` background transition.

- **Resume Modal — Action Buttons**: Two buttons in the top bar: "View Resume" and "Download Resume". The active button gets `bg-primary/15 text-primary` styling. Download links to `/upload/manishekofteh-cv.pdf` with the `download` attribute.

- **CSS Fix — @import Order**: Moved the Google Fonts `@import url(...)` to the very top of `globals.css`, before `@import "tailwindcss"`. Tailwind CSS 4 expands its import into thousands of CSS rules, and the Google Fonts import was ending up after them in the compiled output, violating the CSS spec rule that `@import` must precede all other rules. Placing it first ensures it remains at the top of the compiled output.

---

### Dependencies Used
- `framer-motion` — `motion`, `AnimatePresence`
- `lucide-react` — `Brain`, `X`, `Send` (AI chat); `Download`, `Eye`, `Mail`, `Github`, `Linkedin`, `Phone`, `MapPin`, `ExternalLink`, `ChevronRight` (resume)
- `@/components/ui/dialog` — `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`
- `@/components/ui/button` — `Button` (ghost variant)
- `@/components/providers/app-provider` — `useApp()` for `t`, `rtl`
- `@/config/design-tokens` — `tokens` for z-indices, motion durations/easings
- `@/lib/api` — `api.chat.sendMessage()` for AI chat backend
- `@/lib/utils` — `cn()` for class merging
- `@/types` — `ChatMessage` type

---

## 2025-01-XX — Experience Timeline & Contact Section (Batch 7)

### Overview
Created 2 portfolio sections — a scroll-animated experience timeline with alternating desktop cards and a premium contact card grid as the page's final section. Both are `'use client'`, fully typed, locale-aware (en/fa/ar), RTL-ready, and pass ESLint with zero warnings.

---

### Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/experience/experience-section.tsx` | Scroll-driven animated timeline: growing line, pulsing dots, alternating GlassPanel cards, staggered achievements & tech pills |
| 2 | `src/components/contact/contact-section.tsx` | Premium contact closing: 2×2 glass card grid (Email/GitHub/LinkedIn/Telegram), per-card glow, copy-to-clipboard, open-in-new-tab |

### File Modified

| # | File | Change |
|---|------|--------|
| 3 | `src/app/page.tsx` | Added `<ExperienceSection />` and `<ContactSection />` after HeroSection |

---

### Design Decisions

- **Timeline Line — Scroll-Driven Growth**: Uses Framer Motion's `useScroll({ target: containerRef, offset: ['start end', 'end start'] })` to get `scrollYProgress` (0→1) as the timeline container moves through the viewport. A `useTransform` maps this to `scaleY` (clamped at 1 via `Math.min(1, v * 1.25)`). The line uses `transform-origin: top` so it grows downward. The gradient goes from `primary/0` → `primary/30` → `primary/0` for a fade-at-edges effect.

- **Desktop vs. Mobile Line Position**: On desktop (`md:`), the line is absolutely positioned at `left-1/2 -translate-x-1/2` (centered). On mobile, it's at `left-5` (LTR) or `right-5` (RTL). Two separate `motion.div` elements are rendered, each hidden on the opposite breakpoint with `hidden md:block` / `md:hidden`.

- **Dot Positioning — Mobile**: The line is at `left-5` (1.25rem). The dot (w-3 = 0.75rem) needs its center at 1.25rem, so its left edge is at `left-3.5` (0.875rem). In RTL, `right-3.5`. On desktop, `left-1/2 -translate-x-1/2` centers it. RTL overrides the mobile position via `md:right-auto`.

- **Card Alternation — Desktop**: Each card is `w-[calc(50%-2rem)]` and positioned with `mr-auto pr-8` (left side) or `ml-auto pl-8` (right side). A `cardOnLeft` variable is computed as `rtl ? !isEven : isEven` to handle the RTL mirror. The 2rem gap (via pr-8/pl-8) keeps cards visually separated from the center line.

- **Card Alternation — Mobile**: All cards are on one side of the line. LTR: `pl-10` (space for line + dot on the left). RTL: `pr-10`. Desktop resets these paddings with `md:pl-0 md:pr-0`.

- **TimelineDot Component**: A `motion.div` with `initial={{ scale: 0, opacity: 0 }}` → `animate={{ scale: 1, opacity: 1 }}` triggered by the card's `isInView`. The dot is a 12×12 px circle with `bg-primary` and a `.glow-primary` duplicate behind it. The first (most recent) item gets an additional pulsing ring (`scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5]` on infinite loop) to indicate the current position.

- **Achievement Stagger**: Each achievement `motion.li` uses a custom variant with `delay: j * 0.06` (60 ms per item). The animation slides from `x: -10, opacity: 0` to `x: 0, opacity: 1`. CheckCircle2 icons at `text-primary/50` provide visual rhythm.

- **Tech Stack Pills**: Each pill uses a `techFade` variant with `initial={{ opacity: 0, scale: 0.8 }}` and a stagger of `j * 0.03 + 0.15`. The base delay of 0.15 s ensures pills appear after the card and achievements have settled. Pills use `glass-subtle` background with `text-foreground/50` text.

- **Contact Cards — Visual Differentiation**: Each of the 4 cards has a unique color identity defined in a `CARD_CONFIG` record: Email (indigo), GitHub (neutral), LinkedIn (blue), Telegram (cyan). The config stores `iconColor` (Tailwind text class), `iconGlow` (CSS `drop-shadow` filter string), and `glowColor` (Tailwind bg class for the hover blur element).

- **Contact Cards — Background Glow**: A `pointer-events-none` div with `rounded-full blur-3xl` is positioned at `-top-12 -right-12` inside each card. It starts at `opacity-0` and transitions to `opacity-100` on `group-hover` with a 0.5 s duration. This creates a subtle color wash that appears on hover.

- **Contact Cards — Icon Animation**: The icon container is a `motion.div` with `whileHover={{ scale: 1.1, y: -4 }}` using a bouncy spring (`stiffness: 400, damping: 15`). The icon itself has a permanent `drop-shadow` filter via inline `style={{ filter: config.iconGlow }}` for ambient glow.

- **Contact Cards — Copy to Clipboard**: The email card has a "Copy" button that calls `navigator.clipboard.writeText(value)` and triggers `toast({ title: t.contact.copied })` via the project's `useToast` hook. A try/catch silently handles environments where clipboard is unavailable. Other cards only show the "Open" button.

- **Contact Cards — Layout**: A 2×2 grid on `sm:` breakpoint, single column on mobile. Each card is `GlassPanel variant="strong"` with `overflow-hidden` to contain the blur glow. A centered closing message ("Built with Next.js, Framer Motion & attention to detail") is hardcoded in English below the cards at `text-muted-foreground/40` — intentionally subtle as the final farewell.

- **No Footer**: The contact section is the last element on the page. No footer component exists.

---

### Dependencies Used
- `framer-motion` — `motion`, `useScroll`, `useTransform`, `useInView`
- `lucide-react` — `MapPin`, `CheckCircle2` (experience); `Mail`, `Github`, `Linkedin`, `Send`, `Copy`, `ExternalLink` (contact)
- `@/components/providers/app-provider` — `useApp()` for `locale`, `rtl`, `t`
- `@/components/shared/section-wrapper` — `SectionWrapper`
- `@/components/shared/glass-panel` — `GlassPanel`
- `@/hooks/use-toast` — `useToast` for copy-to-clipboard feedback
- `@/config/design-tokens` — `tokens` for motion durations, easings, stagger values
- `@/lib/constants` — `EXPERIENCES`, `SOCIAL_LINKS` arrays
- `@/lib/utils` — `cn()` for class merging
- `@/types` — `Experience`, `LucideIcon` types
---
Task ID: 1
Agent: Main Agent (continuation session)
Task: Fix critical issues, implement AI chat API, and verify portfolio site

Work Log:
- Analyzed full project state from previous session (7 batches of work already completed)
- Identified 3 critical bugs:
  1. Hero section portrait image path: `/upload/IMG_20260220_003143_304.jpg` → `/portrait.jpg` (was causing 404s on every page load)
  2. Resume modal download link: `/upload/manishekofteh-cv.pdf` → `/resume.pdf` (wrong path)
  3. Favicon missing: `favicon.ico` referenced but not present in public/
- Implemented AI Chat API at `/api/chat/route.ts` using z-ai-web-dev-sdk with:
  - Full system prompt containing Mani's profile, skills, experience, projects
  - Context window of last 10 messages
  - Multilingual support (responds in user's language)
  - Graceful error handling (returns user-friendly message instead of 500)
  - LLM singleton pattern for SDK instance reuse
- Created SVG favicon (`public/favicon.svg`) matching the MS logo gradient
- Converted Grand Hotel font from `<link>` tag to `next/font/google` (fixed ESLint warning)
- Updated `.font-display` CSS to use CSS variable `var(--font-grand-hotel)` instead of hardcoded font name
- Updated `metadata.icons` to point to `/favicon.svg`

Stage Summary:
- All 3 critical path bugs fixed (portrait 404, resume PDF path, missing favicon)
- AI Chat API fully functional — tested with curl, returns accurate responses about Mani
- ESLint: 0 errors, 0 warnings
- Agent Browser verification:
  - ✅ All 7 sections render (Home, About, Skills, Projects, Experience, Contact)
  - ✅ Loading cinematic sequence plays
  - ✅ Glass navbar with scroll hide/show
  - ✅ Dot navigation visible
  - ✅ Hero section with portrait, name, tagline, CTAs, social links
  - ✅ About section with narrative paragraphs + insight cards
  - ✅ Skills section with 7 category cards and animated progress bars
  - ✅ Projects section with 4 project cards and filter bar
  - ✅ Experience timeline with 4 entries
  - ✅ Contact section with 4 cards (email, GitHub, LinkedIn, Telegram)
  - ✅ AI Chat window opens with suggestions
  - ✅ Theme toggle (dark/light) works
  - ✅ Mobile responsive (375px): hamburger menu, stacked layout
  - ✅ Zero console errors
  - ✅ Back-to-top button visible
---
Task ID: 1
Agent: main
Task: Fix CinematicLoader getting stuck on page load

Work Log:
- Analyzed the screenshot showing the loader stuck on "Mani Shekofteh" text
- Identified the root cause: fragile state machine relying on CSS onAnimationEnd + framer-motion onAnimationComplete callbacks that could fail silently
- Rewrote CinematicLoader with a robust setTimeout-based approach (hard-capped at 2 seconds)
- Used AnimatePresence for clean exit animation
- Verified via Agent Browser: loader shows at 500ms, disappears by 2s, no console errors

Stage Summary:
- Replaced phase-based state machine (ink → fade → done) with single useEffect + setTimeout
- Total loader duration: ~2 seconds (1.2s ink-spread + 0.3s hold + 0.5s fade)
- Hard cap ensures the loader can NEVER get stuck regardless of animation event failures
- Zero console errors, clean compilation
