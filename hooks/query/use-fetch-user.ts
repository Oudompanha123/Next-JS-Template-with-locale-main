import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user/user.service";

export const useFetchUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: userService.getUser,
  });

  return { data, isLoading, error };
};

export const useMutationFetchUser = (callback?: (data: any) => void) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: userService.getUser,
    onSuccess: (data) => {
      callback?.(data);
    },
    onError: (error) => {
      callback?.(error);
    },
  });
  return { mutate, isPending, error };
};

