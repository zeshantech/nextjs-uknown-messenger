"use client";
import { Avatar } from "@nextui-org/avatar";
import React from "react";

interface UserListItemProps {
  email: string;
  username: string;
}

export default function UserListItem({ username, email }: UserListItemProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar
        alt={username}
        className="flex-shrink-0"
        size="sm"
        src={"https://xinva.ai/wp-content/uploads/2023/12/120.jpg"}
      />
      <div className="flex flex-col">
        <span className="text-small">{username}</span>
        <span className="text-tiny text-default-400">{email}</span>
      </div>
    </div>
  );
}
