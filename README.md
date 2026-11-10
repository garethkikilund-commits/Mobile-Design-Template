# Mobile Design Template

React component library for the **Mobile Template Design System**, built from the Figma file and documented in Storybook. Independent apps consume the library as a package, so they stay linked to the design system.

```
Figma variables  ──►  tokens (CSS variables + typed JS)  ──►  ui (React components)  ──►  apps
                                                                  │
                                                                  └──►  Storybook (docs and demo)
```

## Packages

| Package | What it is |
|---|---|
| [`packages/tokens`](packages/tokens) | Token sources (JSON) and a build script that generates `tokens.css` and a typed JS module. |
| [`packages/ui`](packages/ui) | React components, their tests, and the Storybook that documents them. |

## Getting started

Requires Node 20.19 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run storybook      # builds the tokens, then opens Storybook on http://localhost:6006
npm test               # token checks and component tests
npm run typecheck
npm run build          # tokens, then the library
```

## How the tokens work

Token sources live in `packages/tokens/src` and are the single source of truth in code. **Never edit `dist/` or the generated CSS by hand.**

- `color.primitives.json`: the raw colour ramps, for example `"purple.60": "#9b40bf"`.
- `color.semantic.json`: usage tokens, one line each, with a `light` and `dark` value that reference primitives. `"grey.10/75"` means the `grey.10` primitive at 75% opacity.
- `sizing.json` and `typography.json`: spacing, radius, font family, weight and size.

The build turns Figma-style names into CSS custom properties:

| Figma | CSS variable |
|---|---|
| Colour Usage: `Background/Brand/Primary` | `--color-background-brand-primary` |
| Colour Primitives: `Purple / 60` | `--color-purple-60` |
| Sizing Primitives: `2XL` | `--size-2xl` |
| Typography: `Font Size/Paragraph/Body` | `--font-size-paragraph-body` |

Semantic variables point at primitive variables (`var(--color-purple-60)`), so changing a primitive cascades through everything that uses it.

**Components must only use semantic colour tokens.** That is what makes light and dark themes work without any per-component code.

### Themes

Add `data-theme="light"` or `data-theme="dark"` to the `<html>` element. With no attribute, the theme follows the operating system setting.

### Using the library in an app

```ts
import "@garethkikilund-commits/tokens/tokens.css";
import "@garethkikilund-commits/ui/styles.css";
import { Button } from "@garethkikilund-commits/ui";
```

The packages are marked `private` for now. Publishing (GitHub Packages) is a later step.

## Components

Components follow the Figma component sets. Figma variants become props, and interaction states (Hover, Pressing) become CSS states.

| Component | Status |
|---|---|
| Button | Built. Props: `size`, `variant`, `loading`, `disabled`, `iconLeft`, `iconRight` |
| Card (Media Card) | Partly built: Boxed and Inside, body Top or Bottom. Not built: Unboxed, Slider, Hover/Pressing/Active/Loading states |

## Decisions and differences from Figma

Decided:

1. **Dark `Text/Brand/Mid` differs from Figma on purpose.** Figma has `Purple / 90`, which is almost invisible on a dark background, and its Dark mode can't currently be edited. The code uses `Purple / 40`. When Dark mode becomes editable in Figma, change it there to match.
2. **Line heights are hard-coded.** Figma has no line-height tokens, so the Button uses 24px (Large, Medium) and 20px (Small), matching the Figma text layers. Revisit if line-height tokens are added.
3. **Font weight `200` is 300 in code.** In Figma the token named `200` is the `Light` style, which is weight 300 in Gothic A1. The CSS variable keeps Figma's name (`--font-weight-200`) so the mapping stays one to one, but its value is `300`. The other weights match their names.
4. **The dark brand gradient follows Figma.** `Purple / 100` at 0%, then `Purple / 30` and `Purple / 20` at 75%. It hasn't been reviewed on real dark screens yet.

Still open (need design input):

5. **Outline buttons take their text colour from `Background/Brand/*` tokens.** Text tokens would normally be used for text. The code follows Figma exactly.
6. **Small Button icon and spinner size is assumed to be 20px.** Figma only shows 24px icons on Large buttons.
7. **Focus ring.** Figma has no keyboard focus state, so the Button adds a 2px ring in `Border/Brand/Primary`.
8. **Placeholder icons.** The stories use simple stand-in icons. The real icon set needs to be added.
9. **Figma and code can drift in Dark mode.** Dark values can't be edited in Figma at the moment, so any dark difference is recorded in this list (see item 1).

## Roadmap

- [x] Token pipeline (colour, sizing, typography)
- [x] Storybook with a theme switch and token documentation pages
- [x] Button
- [ ] Remaining atoms, then molecules
- [ ] Figma Code Connect mappings
- [ ] Automated token sync from Figma
- [ ] Publishing and Storybook hosting
