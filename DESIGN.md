# Design System Strategy: Urban Duality

## 1. Overview & Creative North Star: "The Brutalist Alchemist"
This design system is built on the friction between two worlds: the sun-drenched, disciplined ritual of the morning cafe and the neon-pulsed, uninhibited energy of the night-time bar. Our Creative North Star is **"The Brutalist Alchemist."** 

We reject the "friendly" curves of contemporary tech. Instead, we embrace sharp 0px corners, massive typographic scales, and a high-contrast editorial layout that feels like a premium street-culture magazine. We break the "template" look through **intentional asymmetry**: images are never perfectly centered, and type is allowed to bleed off the edge of containers, creating a sense of motion and urban grit.

## 2. Color Theory & Spatial Logic
The palette is a sophisticated split-personality. We use the contrast between `secondary` (Creamy Beige) and `primary_container` (Vibrant Orange) to signal the transition from Caffeine to Cocktails.

### The "No-Line" Rule
Traditional UI relies on borders to separate content. We do not. **Explicitly prohibit 1px solid borders for sectioning.** 
- Boundaries must be defined solely through background color shifts. 
- Use `surface_container_low` against a `surface` background to create a section. 
- The eye should follow the change in tonal value, not a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical, stacked slabs.
- **Base Layer:** `surface` (#131313) for the deep, urban dark mode.
- **Mid Layer:** `surface_container` for secondary content blocks.
- **Top Layer:** `surface_container_highest` for interactive elements or focused messaging.
This "nested" depth provides a sophisticated structure without the clutter of lines.

### The "Glass & Gradient" Rule
To elevate the "Bar" side of the brand, use Glassmorphism on floating navigation or menu overlays. Use semi-transparent `surface` colors with a heavy backdrop-blur (20px+). 
- **Signature Texture:** Use a subtle linear gradient from `primary` to `primary_container` on high-impact CTAs to simulate the glow of a neon sign.

## 3. Typography: The High-Impact Voice
Our type scale is designed to be felt as much as read.

- **Display & Headlines (Epilogue):** These are our "Screaming" levels. Use `display-lg` and `headline-lg` in heavy weights. These should be set with tight letter-spacing (-2% to -4%) to feel like a bold, black block of ink.
- **Body & Titles (Manrope):** This is our "Functional" voice. Manrope provides a clean, neutral counterpoint to the aggressive headlines.
- **Labels (Space Grotesk):** For technical data—like ABV percentages, coffee origins, or timestamps—use Space Grotesk. Its monospaced feel adds a "lab" or "industrial" quality to the urban aesthetic.

**Rule:** Never center-align a headline. Always flush-left to maintain the edgy, editorial grid.

## 4. Elevation & Depth: Tonal Layering
In this system, 0px roundedness means we cannot use rounded corners to suggest "buttons." We use depth and contrast instead.

- **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a "recessed" or "carved" look, fitting for a modern urban spot.
- **Ambient Shadows:** Shadows are rare. When used for floating modals, they must be "Ambient": 15% opacity of the `on_surface` color, with a 40px blur and 0px spread. It shouldn't look like a shadow; it should look like a soft glow.
- **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in a search input), use `outline_variant` at 20% opacity. 100% opaque borders are strictly forbidden.

## 5. Components

### Buttons
- **Primary:** `primary_container` background with `on_primary_container` text. Sharp 0px corners. Massive padding (16px top/bottom, 32px left/right).
- **Secondary:** `secondary` background with `on_secondary` text. Used for the "Cafe" side of the interface.
- **State Change:** On hover, buttons should invert (Background becomes text color, text becomes background color) instantly. No slow transitions; the interaction should feel "snappy."

### Cards & Lists
- **The "No Divider" Rule:** Forbid the use of horizontal rules. Use `48px` of vertical white space from our spacing scale to separate list items, or shift the background from `surface_container` to `surface_container_high`.
- **Imagery:** Photography must be full-bleed within its container. High-contrast, moody lighting only.

### Input Fields
- Sharp 0px boxes with a `surface_container_highest` background. 
- Use `label-md` (Space Grotesk) for the label, positioned strictly above the field, never inside.

### Signature Component: The "Duality Toggle"
A high-impact switch that toggles the entire site's theme from "Cafe" (Beige/Light-focused) to "Bar" (Orange/Dark-focused). This should be a persistent, oversized element.

## 6. Do’s and Don’ts

### Do:
- **Do** allow typography to overlap image edges to create a "collage" feel.
- **Do** use `display-lg` for single words to create a massive visual anchor.
- **Do** use the `primary` orange as a highlight for crucial data (prices, "Open Now").

### Don't:
- **Don't** use any border-radius. 0px is the law.
- **Don't** use generic iconography. If an icon is needed, it must be ultra-thin (1pt) and custom-drawn to match the sharp edges of the type.
- **Don't** use soft transitions. This brand is disruptive; animations should be "Hard-cuts" or fast (150ms) linear eases.
- **Don't** use "centered" layouts. Stay flush-left or use extreme right-alignment for a "broken" grid effect.