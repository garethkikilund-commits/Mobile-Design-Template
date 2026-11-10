import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Card } from "./Card";

// Placeholder image and icons. Swap for the real image and icon set once they are added to the library.
const Placeholder = () => (
  <svg viewBox="0 0 342 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="342" height="200" fill="#f2f2f2" />
    <rect x="151" y="75" width="40" height="40" rx="4" fill="#b2b2b2" />
  </svg>
);
const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", width: 24, height: 24 } as const;
const roundButton = (size: number, children: ReactNode, background?: string) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--size-full)",
      background,
      color: "var(--color-icon-neutral-primary)",
      backdropFilter: "blur(12px)",
    }}
  >
    {children}
  </span>
);
const MoreButton = () =>
  roundButton(
    32,
    <svg {...iconProps} width={20} height={20} fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>,
    "var(--color-background-overlay-neutral-3quarter-overlay)"
  );
const ArrowButton = () =>
  roundButton(
    40,
    <svg {...iconProps}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
const Stars = ({ filled = 4 }: { filled?: number }) => (
  <div style={{ display: "flex", gap: "var(--size-3xs)" }} aria-label={`${filled} out of 5`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} {...iconProps} fill={i < filled ? "currentColor" : "none"} aria-hidden="true">
        <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
      </svg>
    ))}
  </div>
);

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Mirrors the Figma **Card / Media Card** component set. Built so far: **Boxed** and **Inside**, with the body at the **Bottom** or **Top**. Not built yet: **Unboxed**, the **Slider**, and the Hover, Pressing, Active and Loading states.",
      },
    },
  },
  args: {
    cardType: "boxed",
    body: "bottom",
    title: "Card Header",
    description: "This is a card description",
    media: <Placeholder />,
    action: <MoreButton />,
    footer: <Stars />,
    trailing: <ArrowButton />,
  },
  argTypes: {
    cardType: { control: "inline-radio", options: ["boxed", "inside"] },
    body: { control: "inline-radio", options: ["bottom", "top"] },
  },
  decorators: [(Story) => <div style={{ width: 342 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Boxed: Story = { args: { cardType: "boxed" } };
export const Inside: Story = { args: { cardType: "inside", trailing: undefined } };
export const BoxedBodyTop: Story = { args: { cardType: "boxed", body: "top" } };
export const InsideBodyTop: Story = { args: { cardType: "inside", body: "top", trailing: undefined } };
