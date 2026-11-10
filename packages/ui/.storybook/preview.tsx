import type { Preview } from "@storybook/react-vite";
import "@garethkikilund-commits/tokens/tokens.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Colour theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      // The tokens switch themes on the data-theme attribute.
      document.documentElement.setAttribute("data-theme", String(context.globals["theme"] ?? "light"));
      return (
        <div
          style={{
            background: "var(--color-background-neutral-primary)",
            color: "var(--color-text-neutral-primary)",
            fontFamily: "var(--font-family-body)",
            padding: 24,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "centered",
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
