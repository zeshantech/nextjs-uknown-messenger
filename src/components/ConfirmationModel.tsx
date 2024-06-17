import React, { ReactElement, cloneElement } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonProps,
  Divider,
} from "@nextui-org/react";
import Typography from "./Typography";
import { CIconProps } from "@coreui/icons-react/dist/CIcon";

interface ConfirmationModelProps {
  message?: string;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  icon: ReactElement<CIconProps>;
  action?: ReactElement<ButtonProps>;
  varient?: "default" | "warning" | "danger";
}

export default function ConfirmationModel({
  message,
  onClose,
  action,
  isOpen,
  title,
  icon,
  varient = "default",
}: ConfirmationModelProps) {
  console.log(isOpen, "—");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-black items-end gap-4">
              {cloneElement(icon, { width: 32 })}
              {title}
            </ModalHeader>
            <Divider />
            <ModalBody>
              <Typography color="#777">{message}</Typography>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
              {action
                ? cloneElement(action, {
                    color: varient,
                    variant: "ghost",
                  })
                : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
