import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { tokens } from "@garethkikilund-commits/tokens";

const meta = {
  title: "Foundations/Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generated from the Figma variables. Swatches use the live CSS custom properties, so use the **Theme** switch in the toolbar to see light and dark values.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const cssVar = (key: string) => `var(--color-${key.replace(/\./g, "-")})`;
const mono: CSSProperties = { font: "12px/16px ui-monospace, SFMono-Regular, Menlo, monospace" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 };
const checker = "repeating-conic-gradient(#8884 0% 25%, transparent 0% 50%) 50% / 12px 12px";

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span
        style={{
          flex: "none",
          width: 40,
          height: 40,
          borderRadius: 8,
          border: "1px solid var(--color-border-neutral-secondary)",
          background: `linear-gradient(${value}, ${value}), ${checker}`,
        }}
      />
      <span style={{ ...mono, color: "var(--color-text-neutral-primary)", wordBreak: "break-all" }}>{name}</span>
    </div>
  );
}

const heading: CSSProperties = { margin: "24px 0 12px", font: "700 18px/24px var(--font-family-headers)", color: "var(--color-text-neutral-primary)" };

export const SemanticColours: Story = {
  render: () => {
    const groups = new Map<string, string[]>();
    for (const key of Object.keys(tokens.color.light)) {
      const group = key.split(".")[0] ?? "other";
      groups.set(group, [...(groups.get(group) ?? []), key]);
    }
    return (
      <div>
        {[...groups.entries()].map(([group, keys]) => (
          <section key={group}>
            <h3 style={{ ...heading, textTransform: "capitalize" }}>{group}</h3>
            <div style={grid}>
              {keys.map((key) => (
                <Swatch key={key} name={key} value={cssVar(key)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

export const PrimitiveColours: Story = {
  render: () => {
    const groups = new Map<string, string[]>();
    for (const key of Object.keys(tokens.color.primitives)) {
      const group = key.split(".")[0] ?? "other";
      groups.set(group, [...(groups.get(group) ?? []), key]);
    }
    return (
      <div>
        {[...groups.entries()].map(([group, keys]) => (
          <section key={group}>
            <h3 style={{ ...heading, textTransform: "capitalize" }}>{group}</h3>
            <div style={grid}>
              {keys.map((key) => (
                <Swatch key={key} name={`${key}  ${tokens.color.primitives[key]}`} value={cssVar(key)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

export const Sizing: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 10 }}>
      {Object.entries(tokens.size).map(([key, px]) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ ...mono, width: 160, color: "var(--color-text-neutral-primary)" }}>
            --size-{key} ({px}px)
          </span>
          <span
            style={{
              height: 16,
              width: `min(${px}px, 100%)`,
              borderRadius: 4,
              background: "var(--color-background-brand-primary)",
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {Object.entries(tokens.font.size).map(([key, px]) => (
        <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ ...mono, width: 220, flex: "none", color: "var(--color-text-neutral-tertiary)" }}>
            {key} ({px}px)
          </span>
          <span
            style={{
              fontFamily: key.startsWith("headers") ? "var(--font-family-headers)" : "var(--font-family-body)",
              fontSize: `var(--font-size-${key.replace(/\./g, "-")})`,
              fontWeight: key.startsWith("headers") ? 700 : 400,
              color: "var(--color-text-neutral-primary)",
            }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      ))}
    </div>
  ),
};
