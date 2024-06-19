import React, { useState } from "react";
import {
  usePrediction,
  useSendMessage,
  useSuggestMessages,
} from "../hooks/query.hooks";
import { Stack } from "@/components";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";

interface IndexTextareaFooterProps {
  message: string;
  setMessage: (message: string) => void;
  userId: string;
}

export default function IndexTextareaFooter({
  message,
  userId,
  setMessage,
}: IndexTextareaFooterProps) {
  const {
    mutateAsync: sendMessageMutateAsync,
    isPending: isSendMessageLoading,
  } = useSendMessage();
  const {
    refetch: reSuggestMessages,
    data: suggestMessagesData,
    isLoading: isSuggestMessagesLoading,
  } = useSuggestMessages();

  const handleAutoSuggest = async () => {
    const result = await reSuggestMessages();
  };

  const handleSend = async () => {
    await sendMessageMutateAsync({ content: message, userId });
    setMessage("");
  };

  const suggestedMessages = suggestMessagesData?.message.split("| |") || [];
  return (
    <Stack padding={12} justifyContent="between" direction="row">
      <Stack gap={4} direction="row" wrap="wrap">
        {suggestedMessages.map((item) => (
          <Chip className="cursor-pointer" onClick={() => setMessage(item)}>
            {item}
          </Chip>
        ))}
      </Stack>
      <Stack direction="row" gap={4}>
        <Button
          variant="light"
          onClick={handleAutoSuggest}
          isLoading={isSuggestMessagesLoading}
          disabled={isSuggestMessagesLoading}
        >
          Auto Suggest
        </Button>
        <Button
          variant="bordered"
          isLoading={isSendMessageLoading}
          color="primary"
          disabled={!message || isSendMessageLoading}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );
}
