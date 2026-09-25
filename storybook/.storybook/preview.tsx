import type { Preview } from "@storybook/react";
import React from "react";
import { NextUIProvider } from "@next-ui/core";
import "../styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextUIProvider theme={{ mode: "light", style: "minimal" }}>
        <div className="p-8">
          <Story />
        </div>
      </NextUIProvider>
    ),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
