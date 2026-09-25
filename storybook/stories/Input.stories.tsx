import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@next-ui/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["flat", "bordered", "underlined", "faded"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input variant="flat" placeholder="Flat variant" />
      <Input variant="bordered" placeholder="Bordered variant" />
      <Input variant="underlined" placeholder="Underlined variant" />
      <Input variant="faded" placeholder="Faded variant" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isInvalid: true,
    errorMessage: "Please enter a valid email address",
  },
};

export const WithStartContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="Search"
        placeholder="Search..."
        startContent={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </div>
  ),
};

export const WithEndContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        endContent={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        }
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Cannot edit",
    isDisabled: true,
  },
};
