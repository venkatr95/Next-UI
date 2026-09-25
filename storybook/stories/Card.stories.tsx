import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "@next-ui/card";
import { Button } from "@next-ui/button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    shadow: {
      control: "select",
      options: ["sm", "md", "lg", "none"],
    },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "none"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Card Title</h3>
      </CardHeader>
      <CardBody>
        <p className="text-gray-600 dark:text-gray-400">
          This is the card body with some content. You can put any content here.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderBodyFooter: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Complete Card</h3>
        <p className="text-sm text-gray-500">With header, body, and footer</p>
      </CardHeader>
      <CardBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </CardBody>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const GlassStyle: Story = {
  render: () => (
    <Card styleType="glass" className="max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Glass Card</h3>
      </CardHeader>
      <CardBody>
        <p>This card uses the glass style with backdrop blur.</p>
      </CardBody>
    </Card>
  ),
};

export const Gradient: Story = {
  render: () => (
    <Card gradient="ocean" className="max-w-md text-white">
      <CardHeader>
        <h3 className="text-lg font-semibold">Gradient Card</h3>
      </CardHeader>
      <CardBody>
        <p>This card has an ocean gradient background.</p>
      </CardBody>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card isHoverable className="max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Hoverable Card</h3>
      </CardHeader>
      <CardBody>
        <p>Hover over this card to see the lift effect.</p>
      </CardBody>
    </Card>
  ),
};

export const Pressable: Story = {
  render: () => (
    <Card isPressable className="max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Pressable Card</h3>
      </CardHeader>
      <CardBody>
        <p>Click this card to see the press effect.</p>
      </CardBody>
    </Card>
  ),
};
