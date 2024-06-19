import React, { useEffect, useState } from "react";
import { useDeleteMessage, useGetMessages } from "../hooks/query.hooks";
import { Stack } from "@/components";
import { Card, CardBody } from "@nextui-org/card";
import ContainerHeader from "./ContainerHeader";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { cilReload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export default function MessagesContainer() {
  const {
    data: messagesData,
    fetchNextPage,
    isLoading: isGetMessagesLoading,
    hasNextPage,
    refetch,
  } = useGetMessages();
  const {
    mutateAsync: deleteMessageMutateAsync,
    isPending: isDeleteMessageLoading,
  } = useDeleteMessage();

  const handleDeleteMessage = async (_id: string) => {
    const result = await deleteMessageMutateAsync(_id);
    if (result.success) refetch();
  };

  const messages =
    messagesData?.pages.map((page) => page.messages).flat() || [];

  return (
    <Stack>
      <Card>
        <ContainerHeader
          subTitle={"Here is list of all messages thats other users send you"}
          title={"Messages list"}
          buttons={[
            <Button isIconOnly onClick={() => refetch()}>
              <CIcon icon={cilReload} height={16} />
            </Button>,
            <Button
              variant="light"
              color="primary"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
            >
              Fetch more
            </Button>,
          ]}
        />
        <CardBody>
          <Stack gap={4} direction="row" wrap="wrap">
            {messages.map((message) => (
              <Chip
                isDisabled={isDeleteMessageLoading || isGetMessagesLoading}
                key={message!._id}
                onClose={() => handleDeleteMessage(message!._id)}
                variant="bordered"
              >
                {message!.content}
              </Chip>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
