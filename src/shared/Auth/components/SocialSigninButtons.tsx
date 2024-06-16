import Stack from "@/components/Stack";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import React from "react";

export default function SocialSigninButtons() {
  return (
    <Card>
      <Stack direction="row" justifyContent="between">
        <Button variant="light">Google</Button>
        <Button variant="light">Github</Button>
        <Button variant="light">Facebook</Button>
      </Stack>
    </Card>
  );
}
