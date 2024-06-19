import { Card, CardBody } from "@nextui-org/card";
import React from "react";
import ContainerHeader from "./ContainerHeader";
import { Avatar } from "@nextui-org/avatar";
import IndexTextarea from "./IndexTextarea";

interface InboxProps {
  username: string;
  userId: string;
}

export default function Inbox({ userId, username }: InboxProps) {
  return (
    <Card>
      <ContainerHeader
        subTitle={"Your identity will not to user"}
        title={username}
        avatar={<Avatar name={username} />}
      />
      <CardBody>
        <IndexTextarea userId={userId} />
      </CardBody>
    </Card>
  );
}
