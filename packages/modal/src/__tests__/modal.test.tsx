import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "../../../../test/test-utils";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from "../modal";

describe("Modal", () => {
  it("does not render when closed", () => {
    render(
      <Modal isOpen={false}>
        <ModalContent>
          <ModalBody>Hidden</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Modal isOpen={true}>
        <ModalContent>
          <ModalBody>Visible</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("has aria-modal attribute", () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalBody>Content</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("closes on Escape key", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalBody>Content</ModalBody>
        </ModalContent>
      </Modal>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on Escape when not dismissable", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} isDismissable={false}>
        <ModalContent>
          <ModalBody>Content</ModalBody>
        </ModalContent>
      </Modal>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("ModalHeader", () => {
  it("renders close button by default", () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalBody>Body</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("hides close button when hideCloseButton", () => {
    render(
      <Modal isOpen hideCloseButton>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalBody>Body</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    const { user } = render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalBody>Body</ModalBody>
        </ModalContent>
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe("ModalBody", () => {
  it("renders body content", () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalBody>Body content here</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText("Body content here")).toBeInTheDocument();
  });
});

describe("ModalFooter", () => {
  it("renders footer content", () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalBody>Body</ModalBody>
          <ModalFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
