import { ConfirmationModel, OtpInput, Stack, Typography } from "@/components";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useSendVerificationEmail, useVerifyEmail } from "../hooks/query.hooks";
import { useDisclosure } from "@nextui-org/react";
import CIcon from "@coreui/icons-react";
import { cilWarning } from "@coreui/icons";

export default function VerifyEmailForm() {
  let router = useRouter();
  let { email } = useParams<{ email: string }>();
  email = email.replace("%40", "@");
  const { isOpen, onClose, onOpen } = useDisclosure();
  
  const { mutateAsync, isPending } = useVerifyEmail();
  const {
    mutateAsync: sendVerificationEmailMutateAsync,
    isPending: isSendVerificationEmailPending,
  } = useSendVerificationEmail();

  const handleVerify = async (otp: string) => {
    const result = await mutateAsync({
      email: email.replace("%40", "@"),
      OTP: otp,
    });
    if (result.success) {
      router.push("/signin");
    }
  };

  const handleSkip = () => {
    router.push("/signin");
    onClose();
  };

  return (
    <>
      <Stack width="360px">
        <Typography mb={16} variant="h2">
          Verify By Otp
        </Typography>
        <Card>
          <CardBody className="gap-2">
            <OtpInput onComplete={handleVerify} />
          </CardBody>
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
              <Button fullWidth variant="light" onClick={onOpen}>
                Skip
              </Button>
            </Stack>
          </CardFooter>
        </Card>
      </Stack>

      <ConfirmationModel
        icon={<CIcon icon={cilWarning} />}
        onClose={onClose}
        isOpen={isOpen}
        varient="warning"
        title={"Attention"}
        action={<Button onClick={handleSkip}>Skip</Button>}
        message="If you do not verify your email, someone can take your username, and your account will be deleted automatically"
      />
    </>
  );
}
