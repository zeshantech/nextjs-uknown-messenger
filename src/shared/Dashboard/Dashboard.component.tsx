import React from "react";
import { MessagesContainer, UserContainerTabs } from "./components";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Stack } from "@/components";
import { Tabs } from "@nextui-org/tabs";

export default function DashboardComponent() {
  const isLargeScreen = useMediaQuery("(min-width: 890px)");

  return (
    <Stack direction={isLargeScreen ? "row" : "column"} gap={24} padding={32}>
      <Stack flex={1}>
        <UserContainerTabs />
      </Stack>
      <Stack flex={1}>
      <MessagesContainer />
        {/* <UserContainerTabs /> */}
      </Stack>
    </Stack>
  );
}
