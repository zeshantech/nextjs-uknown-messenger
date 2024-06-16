import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ISignupForm } from "../types";
import { useCheckUsername, useSignup } from "../hooks/query.hooks";
import Link from "next/link";
import { signupSchema } from "@/schemas/signup.schema";
import debounce from "lodash/debounce";

export default function SignupForm() {
  const validationSchema = signupSchema.body!;
  const router = useRouter();

  const { mutateAsync, isPending } = useSignup();
  const {
    mutateAsync: checkUsernameMutateAsync,
    error: checkUsernameError,
    isError,
  } = useCheckUsername();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const debouncedCheckUsername = useCallback(
    debounce(async (username: string) => {
      await checkUsernameMutateAsync(username);
    }, 700),
    []
  );

  const onSubmit = async (data: ISignupForm) => {
    await mutateAsync(data);
    router.push(`/verify/${data.email}`);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedCheckUsername(event.target.value);
  };

  return (
    <Stack>
      <Typography mb={16} variant="h2">
        Create new account
      </Typography>
      <Card onSubmit={handleSubmit(onSubmit)} className="w-96">
        <CardBody className="gap-2">
          <Input
            fullWidth
            size="sm"
            variant="bordered"
            label="Email"
            type="email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          <Input
            fullWidth
            size="sm"
            variant="bordered"
            label="Username"
            isInvalid={!!errors.username || isError}
            errorMessage={
              errors.username?.message ?? checkUsernameError?.message
            }
            {...register("username")}
            onChange={handleUsernameChange} // Add onChange handler
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

          <Link href="/signin">Back to signin</Link>
        </CardBody>
      </Card>
    </Stack>
  );
}
