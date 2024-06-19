import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Checkbox, Divider, Switch } from "@nextui-org/react";
import React from "react";
import { MessagePreferenceOptionItem } from ".";
import {
  useChangeIsAcceptMessages,
  useGetIsAcceptMessages,
} from "../hooks/query.hooks";

interface MessagePreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessagePreferenceModal({
  isOpen,
  onClose,
}: MessagePreferenceModalProps) {
  const { data, refetch } = useGetIsAcceptMessages();
  const { mutateAsync: changeStatusIsAcceptingMessagesMutateAsync } =
    useChangeIsAcceptMessages();

  const handleChangeIsAcceptMessagesStatus = async (status: boolean) => {
    await changeStatusIsAcceptingMessagesMutateAsync(status);
    await refetch();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-black">
              Message Preferences
            </ModalHeader>
            <Divider />
            <ModalBody>
              {/* <Switch defaultSelected>Automatic updates</Switch> */}

              <MessagePreferenceOptionItem
                isEnable={!!data?.isAcceptMessages}
                title={"Your preference to accept messages"}
                onChange={handleChangeIsAcceptMessagesStatus}
              />
              <Checkbox defaultSelected>Option</Checkbox>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
