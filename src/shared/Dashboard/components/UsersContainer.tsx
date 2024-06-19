import React from "react";
import { Card, Avatar, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useGetUsers } from "../hooks/query.hooks";
import ContainerHeader from "./ContainerHeader";
import { Stack } from "@/components";
import { User } from "next-auth";
import { IUser } from "@/model/user.model";
import { IUserForClient } from "@/types/ApiResponse";

interface AppProps {
  onClickUser: (user: IUserForClient) => void;
}

export default function App({ onClickUser }: AppProps) {
  const { data, fetchNextPage, hasNextPage } = useGetUsers();

  const users = data?.pages.map((page) => page?.users).flat().filter(e=>e) || [];

  return (
    <Card>
      <ContainerHeader
        subTitle="Click on any user that you want to send message"
        title="Users List"
        buttons={[
          <Button
            variant="light"
            key={1}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            color="primary"
          >
            Fetch more
          </Button>,
        ]}
      />
      <CardBody>
        <Stack direction="row" gap={16} wrap="wrap">
          {users.map((user) => (
            <Avatar
              key={user!._id}
              size="lg"
              name={user!.username}
              onClick={() => onClickUser(user!)}
            />
          ))}
        </Stack>
      </CardBody>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
}
