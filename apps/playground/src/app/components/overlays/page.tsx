"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@next-ui/modal";
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@next-ui/drawer";
import { Tooltip } from "@next-ui/tooltip";
import { ToastProvider, useToast } from "@next-ui/toast";
import { Button } from "@next-ui/button";

function OverlaysContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { addToast } = useToast();

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Modal</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Dialog overlay for focused content.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  This is the modal body. You can put any content here. Click outside or
                  press Escape to close.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Drawer</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Slide-out panel from the edge of the screen.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} placement="right">
            <DrawerHeader>
              <h3 className="text-lg font-semibold">Drawer Title</h3>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-gray-600 dark:text-gray-400">
                This is the drawer body. Use it for navigation, settings, or additional
                content that doesn&apos;t need the full screen.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setDrawerOpen(false)}>
                Save
              </Button>
            </DrawerFooter>
          </Drawer>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tooltip</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Hover to reveal contextual information.
        </p>
        <div className="flex flex-wrap gap-6">
          <Tooltip content="This is a tooltip" placement="top">
            <Button variant="outline">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" placement="bottom">
            <Button variant="outline">Hover me (bottom)</Button>
          </Tooltip>
          <Tooltip content="Primary tooltip" color="primary">
            <Button>Primary tooltip</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Toast</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Temporary notifications for user feedback.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() =>
              addToast({
                title: "Success!",
                description: "Your action was completed successfully.",
                type: "success",
              })
            }
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              addToast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                type: "error",
              })
            }
          >
            Error Toast
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              addToast({
                title: "Info",
                description: "Here's some helpful information.",
                type: "info",
              })
            }
          >
            Info Toast
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OverlaysPage() {
  return <OverlaysContent />;
}
