import apiCaller from "@/common/apiCaller";
import { useToast } from "@/context/ToastProvider";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { ISendMessage } from "../types";

export function useGetUsers() {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => {
      const response = await apiCaller("GET", "/get-users", undefined, {
        page: pageParam,
        limit: 10,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.message === "nomore" ? undefined : pages.length;
    },
  });
}

export function useGetMessages() {
  return useInfiniteQuery({
    queryKey: ["my-messages"],
    queryFn: async ({ pageParam }) => {
      const response = await apiCaller("GET", "/get-messages", undefined, {
        page: pageParam,
        limit: 10,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.message === "nomore" ? undefined : pages.length;
    },
  });
}

export function usePrediction() {
  // TODO: just for testing purpose will remove in production
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (message: string) => {
      const response = await apiCaller(
        "GET",
        "/ai/auto-prediction",
        undefined,
        { message }
      );
      return response;
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });
}

export function useSuggestMessages() {
  // TODO: just for testing purpose will remove in production
  return useQuery({
    queryKey: ["suggest"],
    queryFn: async () => {
      const response = await apiCaller("GET", "/ai/suggest");
      return response;
    },
  });
}

export function useSendMessage() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (input: ISendMessage) => {
      const response = await apiCaller("POST", "/send-message", input);
      return response;
    },
    onSuccess(data) {
      showToast(data.message, "success");
    },
  });
}

export function useDeleteMessage() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (_id: string) => {
      const response = await apiCaller("POST", `/delete-message`, undefined, {
        _id,
      });
      return response;
    },
    onSuccess(data) {
      showToast(data.message, "success");
    },
    onError(error) {
      showToast(error.message, "error");
    },
  });
}
