import { Stack, Typography } from "@/components";
import { AvatarProps } from "@nextui-org/avatar";
import { ButtonProps } from "@nextui-org/button";
import { CardHeader } from "@nextui-org/card";
import React, { ReactElement, cloneElement } from "react";

interface ContainerHeaderProps {
  subTitle: string;
  title: string;
  avatar?: ReactElement<AvatarProps>;
  buttons?: ReactElement<ButtonProps>[];
}

export default function ContainerHeader({
  subTitle,
  title,
  avatar,
  buttons = [],
}: ContainerHeaderProps) {
  return (
    <CardHeader className="gap-2 justify-between">
      <Stack direction="row" alignItems="center" gap={12}>
        {avatar}
        <Stack>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{subTitle}</Typography>
        </Stack>
      </Stack>

      {buttons.length
        ? buttons.map((button, index) =>
            cloneElement(button, {
              radius: "full",
              size: "sm",
              key: index,
            })
          )
        : null}
    </CardHeader>
  );
}
