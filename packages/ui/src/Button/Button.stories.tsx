import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

// Placeholder icons that follow the text colour. Swap for the real icon set once it is added to the library.
const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PlusIcon = () => (
  <svg {...iconProps}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg {...iconProps}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Mirrors the Figma **Buttons / Button** component set. Hover and Pressing are CSS states, so they appear when you hover or press a button here rather than as props. The Figma **Submission** state is the `loading` prop.",
      },
    },
  },
  args: { children: "Button text", size: "large", variant: "fill", disabled: false, loading: false },
  argTypes: {
    size: { control: "inline-radio", options: ["large", "medium", "small"] satisfies ButtonSize[] },
    variant: { control: "inline-radio", options: ["fill", "outline", "none"] satisfies ButtonVariant[] },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIcons: Story = {
  args: { iconLeft: <PlusIcon />, iconRight: <ArrowRightIcon /> },
};

const row: CSSProperties = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 };
const label: CSSProperties = { width: 88, font: "500 12px/16px var(--font-family-body)", color: "var(--color-text-neutral-tertiary)" };

const Row = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={row}>
    <span style={label}>{title}</span>
    {children}
  </div>
);

const variants: ButtonVariant[] = ["fill", "outline", "none"];
const sizes: ButtonSize[] = ["large", "medium", "small"];

export const Variants: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      {variants.map((variant) => (
        <Row key={variant} title={variant}>
          {sizes.map((size) => (
            <Button key={size} {...args} variant={variant} size={size}>
              {size}
            </Button>
          ))}
        </Row>
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      {variants.map((variant) => (
        <Row key={variant} title={variant}>
          <Button {...args} variant={variant}>
            Default
          </Button>
          <Button {...args} variant={variant} disabled>
            Disabled
          </Button>
          <Button {...args} variant={variant} loading>
            Loading
          </Button>
        </Row>
      ))}
    </div>
  ),
};

export const IconPlacement: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      {sizes.map((size) => (
        <Row key={size} title={size}>
          <Button {...args} size={size}>
            No icon
          </Button>
          <Button {...args} size={size} iconLeft={<PlusIcon />}>
            Left
          </Button>
          <Button {...args} size={size} iconRight={<ArrowRightIcon />}>
            Right
          </Button>
          <Button {...args} size={size} iconLeft={<PlusIcon />} iconRight={<ArrowRightIcon />}>
            Both
          </Button>
        </Row>
      ))}
    </div>
  ),
};
