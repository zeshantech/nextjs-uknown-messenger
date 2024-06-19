import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Divider } from "@nextui-org/react";
import React from "react";

interface FeedbackModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModel({ isOpen, onClose }: FeedbackModelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-black">
              Please support our site to submit your Feedback
            </ModalHeader>
            <Divider />
            <ModalBody></ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
