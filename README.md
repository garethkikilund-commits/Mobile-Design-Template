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

## Known gaps and decisions

These came out of building the first version. Each one needs a decision in Figma or from the design team.

1. **Dark `Text/Brand/Mid` in Figma is `Purple / 90`**, which is almost invisible on a dark background. The code uses `Purple / 40`. Change it in Figma to match, otherwise the two will drift.
2. **No line-height tokens.** Line heights are set on the Figma text layers (24px and 20px for the Button), so the Button hard-codes them.
3. **Font weight `200` is labelled "Light" in Figma**, but Light is weight 300 in Gothic A1. The code uses the number in the token name. Confirm which is intended.
4. **Outline buttons take their text colour from `Background/Brand/*` tokens.** Text tokens would normally be used for text. The code follows Figma exactly.
5. **Button icons and spinner sizes for the Small button are assumed to be 20px.** Figma only shows 24px icons on Large buttons.
6. **Focus ring**: Figma has no keyboard focus state, so the Button adds a 2px ring in `Border/Brand/Primary`.
7. **Placeholder icons**: the stories use simple stand-in icons. The real icon set needs to be added.
8. **The dark brand gradient tokens** now use lavender end stops, set in Figma by hand. Confirm they look right on dark screens.
9. **Figma plan limit**: only one mode per variable collection is editable through automation, so Dark mode edits in Figma are manual.

## Roadmap

- [x] Token pipeline (colour, sizing, typography)
- [x] Storybook with a theme switch and token documentation pages
- [x] Button
- [ ] Remaining atoms, then molecules
- [ ] Figma Code Connect mappings
- [ ] Automated token sync from Figma
- [ ] Publishing and Storybook hosting
