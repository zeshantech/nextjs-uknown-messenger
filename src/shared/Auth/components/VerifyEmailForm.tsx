import { OtpInput, Stack, Typography } from "@/components";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useSendVerificationEmail, useVerifyEmail } from "../hooks/query.hooks";
import { LoaderIcon } from "react-hot-toast";

export default function VerifyEmailForm() {
  let { email } = useParams<{ email: string }>();
  email = email.replace("%40", "@");

  const { mutateAsync, isPending } = useVerifyEmail();
  const {
    mutateAsync: sendVerificationEmailMutateAsync,
    isPending: isSendVerificationEmailPending,
  } = useSendVerificationEmail();

  const handleVerify = (otp: string) => {
    mutateAsync({ email: email.replace("%40", "@"), OTP: otp });
  };

  return (
    <Stack>
      <Typography mb={16} variant="h2">
        Verify By Otp
      </Typography>
      <Card className="w-96">
        <CardBody className="gap-2">
          <OtpInput onComplete={handleVerify} />
        </CardBody>
        {isPending ? <LoaderIcon /> : null}
        <CardFooter>
          <Stack direction="row" fullWidth gap={32}>
            <Button
              fullWidth
              variant="light"
              isLoading={isSendVerificationEmailPending}
              onClick={() => sendVerificationEmailMutateAsync(email)}
            >
              Resend Email
            </Button>
            <Button fullWidth variant="light">
              Skip
            </Button>
          </Stack>
        </CardFooter>
      </Card>
    </Stack>
  );
}
