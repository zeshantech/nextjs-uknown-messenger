import apiCaller from "@/common/apiCaller";
import { useToast } from "@/context/ToastProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useChangeIsAcceptMessages() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (isAcceptMessages: boolean) => {
      const response = await apiCaller("POST", `/accept-messages`, {
        isAcceptMessages,
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

export function useGetIsAcceptMessages() {
  return useQuery({
    queryKey: ["isAcceptMessages"],
    queryFn: async () => {
      const response = await apiCaller("GET", `/accept-messages`);
      return response;
    },
  });
}
