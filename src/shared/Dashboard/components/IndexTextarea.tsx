/* import { Textarea } from "@nextui-org/input";
import React from "react";
import { usePrediction, useSuggestMessages } from "../hooks/query.hooks";

interface IndexTextareaProps {
  onSend: (message: string) => void;
}

export default function IndexTextarea({}: IndexTextareaProps) {
  const { mutateAsync: predictionMutateAsync } = usePrediction();
  const { mutateAsync: suggestMessagesMutateAsync } = useSuggestMessages();

  return <Textarea placeholder="Description" label="Add message" />;
}
 */

import { Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import {
  usePrediction,
  useSendMessage,
  useSuggestMessages,
} from "../hooks/query.hooks";
import { Button } from "@nextui-org/button";
import { Stack } from "@/components";
import { Chip } from "@nextui-org/chip";
import IndexTextareaFooter from "./IndexTextareaFooter";

interface IndexTextareaProps {
  userId: string;
}

export default function IndexTextarea({ userId }: IndexTextareaProps) {
  const [message, setMessage] = useState("");

  const { mutateAsync: predictionMutateAsync } = usePrediction();

  return (
    <Stack>
      <Textarea
        placeholder="How are you doing?"
        label="Add message"
        variant="bordered"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IndexTextareaFooter
        message={message}
        setMessage={setMessage}
        userId={userId}
      />
    </Stack>
  );
}
