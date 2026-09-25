import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@next-ui/switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" />
      <Switch size="md" defaultSelected />
      <Switch size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Switch color="default" defaultSelected />
      <Switch color="primary" defaultSelected />
      <Switch color="secondary" defaultSelected />
      <Switch color="success" defaultSelected />
      <Switch color="warning" defaultSelected />
      <Switch color="danger" defaultSelected />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch startContent="Enable notifications" defaultSelected />
      <Switch endContent="Dark mode" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch isDisabled />
      <Switch isDisabled defaultSelected />
    </div>
  ),
};
