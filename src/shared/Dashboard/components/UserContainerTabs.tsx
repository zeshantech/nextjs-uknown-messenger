import { Tab, Tabs } from "@nextui-org/tabs";
import React, { useState } from "react";
import Inbox from "./Inbox";
import UsersContainer from "./UsersContainer";
import { IUserForClient } from "@/types/ApiResponse";

export default function UserContainerTabs() {
  const [selectedUser, setSelectedUser] = useState<IUserForClient | null>(null);
  const [activeTab, setActiveTab] = useState("users");

  const handleClickUser = (user: IUserForClient) => {
    setSelectedUser(user);
    setActiveTab("inbox");
  };

  return (
    <Tabs
      selectedKey={activeTab!}
      onSelectionChange={(e) => setActiveTab(e as string)}
    >
      <Tab key="users" title="Users">
        <UsersContainer onClickUser={handleClickUser} />
      </Tab>
      <Tab key="inbox" title="Inbox" isDisabled={!selectedUser}>
        <Inbox
          userId={selectedUser?._id ?? ""}
          username={selectedUser?.username ?? ""}
        />
      </Tab>
    </Tabs>
  );
}
