import type { StorybookConfig } from "@storybook/nextjs";


webpackFinal: async (config) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
  });

  return config;
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["..\\public"],
};
export default config;
