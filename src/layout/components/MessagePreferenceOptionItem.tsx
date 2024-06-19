import React from "react";
import { Stack, Typography } from "@/components";
import { Chip } from "@nextui-org/chip";
import { CheckIcon } from "@/assets";

interface MessagePreferenceOptionItemProps {
  isEnable: boolean;
  title: string;
  onChange: (isEnable: boolean) => void;
}

export default function MessagePreferenceOptionItem({
  isEnable,
  onChange,
  title,
}: MessagePreferenceOptionItemProps) {
  return (
    <Stack direction="row" justifyContent="between" padding={10}>
      <Typography color="#000">{title}</Typography>
      <label>
        <Chip
          color="primary"
          startContent={isEnable ? <CheckIcon /> : null}
          variant={isEnable ? "solid" : "faded"}
          onClick={onChange.bind(null, !isEnable)}
          className="cursor-pointer"
        >
          {isEnable ? "Enabled" : "Disabled"}
        </Chip>
      </label>
    </Stack>
  );
}
