import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@next-ui/modal";
import { Button } from "@next-ui/button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "full"],
    },
    backdrop: {
      control: "select",
      options: ["transparent", "opaque", "blur"],
    },
    scrollBehavior: {
      control: "select",
      options: ["inside", "outside"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalTrigger = ({
  children,
  size = "md",
  backdrop = "opaque",
  scrollBehavior = "inside",
}: {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  backdrop?: "transparent" | "opaque" | "blur";
  scrollBehavior?: "inside" | "outside";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{children}</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size={size}
        backdrop={backdrop}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>
              This is the modal body. You can put any content here. For scroll behavior &quot;inside&quot;,
              the content scrolls within the modal. For &quot;outside&quot;, the entire modal scrolls.
            </p>
            {scrollBehavior === "inside" && (
              <div className="h-64 space-y-2">
                <p>Scrollable content area:</p>
                {Array.from({ length: 10 }).map((_, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-400">
                    Line {i + 1} of scrollable content.
                  </p>
                ))}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalTrigger>Open Modal</ModalTrigger>,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalTrigger size="xs">Extra Small</ModalTrigger>
      <ModalTrigger size="sm">Small</ModalTrigger>
      <ModalTrigger size="md">Medium</ModalTrigger>
      <ModalTrigger size="lg">Large</ModalTrigger>
      <ModalTrigger size="xl">Extra Large</ModalTrigger>
      <ModalTrigger size="full">Full</ModalTrigger>
    </div>
  ),
};

export const Backdrops: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalTrigger backdrop="transparent">Transparent</ModalTrigger>
      <ModalTrigger backdrop="opaque">Opaque</ModalTrigger>
      <ModalTrigger backdrop="blur">Blur</ModalTrigger>
    </div>
  ),
};

export const ScrollBehavior: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalTrigger scrollBehavior="inside">Scroll Inside</ModalTrigger>
      <ModalTrigger scrollBehavior="outside">Scroll Outside</ModalTrigger>
    </div>
  ),
};
