import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { signinSchema } from "@/schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ISigninForm } from "../types";
import SocialSigninButtons from "./SocialSigninButtons";
import { useSignin } from "../hooks/query.hooks";
import Link from "next/link";

export default function SigninForm() {
  const validationSchema = signinSchema.body!;
  const router = useRouter();

  const { mutateAsync, isPending } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: ISigninForm) => {
    await mutateAsync(data);
    router.replace("/dashboard");
  };

  return (
    <Stack>
      <Typography mb={16} variant="h2">
        Signin to your account
      </Typography>
      <Card onSubmit={handleSubmit(onSubmit)} className="w-96">
        <CardBody className="gap-2">
          <Input
            fullWidth
            size="sm"
            variant="bordered"
            label="Username"
            isInvalid={!!errors.identifier}
            errorMessage={errors.identifier?.message}
            {...register("identifier")}
          />
          <Input
            fullWidth
            size="sm"
            variant="bordered"
            label="Password"
            type="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register("password")}
          />
          <Spacer y={1} />
          <Button
            fullWidth
            onClick={handleSubmit(onSubmit)}
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Submit
          </Button>

          <Link href="/signup">
            Create new account
          </Link>
        </CardBody>
      </Card>
      <Spacer y={4} />
      <SocialSigninButtons />
    </Stack>
  );
}
