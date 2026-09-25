import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, Tab } from "@next-ui/tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "bordered", "light", "underlined"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultSelectedKey="tab1">
      <Tab tabKey="tab1">Tab 1</Tab>
      <Tab tabKey="tab2">Tab 2</Tab>
      <Tab tabKey="tab3">Tab 3</Tab>
    </Tabs>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Solid</p>
        <Tabs variant="solid" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
          <Tab tabKey="c">Tab C</Tab>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Bordered</p>
        <Tabs variant="bordered" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
          <Tab tabKey="c">Tab C</Tab>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Light</p>
        <Tabs variant="light" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
          <Tab tabKey="c">Tab C</Tab>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Underlined</p>
        <Tabs variant="underlined" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
          <Tab tabKey="c">Tab C</Tab>
        </Tabs>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Primary</p>
        <Tabs variant="solid" color="primary" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Secondary</p>
        <Tabs variant="solid" color="secondary" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Success</p>
        <Tabs variant="solid" color="success" defaultSelectedKey="a">
          <Tab tabKey="a">Tab A</Tab>
          <Tab tabKey="b">Tab B</Tab>
        </Tabs>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs fullWidth defaultSelectedKey="tab1">
      <Tab tabKey="tab1">Overview</Tab>
      <Tab tabKey="tab2">Details</Tab>
      <Tab tabKey="tab3">Settings</Tab>
    </Tabs>
  ),
};
