import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { ISigninForm, ISignupForm, IVerifyEmailForm } from "../types";
import apiCaller from "@/common/apiCaller";
import { useToast } from "@/context/ToastProvider";

export function useSignin() {
  return useMutation({
    mutationFn: async (data: ISigninForm) => {
      return signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
    },
  });
}

export function useSignup() {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: async (data: ISignupForm) => {
      return apiCaller("POST", "/signup", data);
    },
    onSuccess: (data) => {
      showToast(data.message, "success");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });
}

export function useCheckUsername() {
  return useMutation({
    mutationFn: async (username: string) => {
      return apiCaller("GET", "/check-username", undefined, { username });
    },
  });
}

export function useVerifyEmail() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (data: IVerifyEmailForm) => {
      return apiCaller("POST", "/verify-email", data);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });
}

export function useSendVerificationEmail() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (email: string) => {
      return apiCaller("POST", "/send-verification-email", { email });
    },
    onSuccess: (data) => {
      showToast(data.message, "success");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });
}
