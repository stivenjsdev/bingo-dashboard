import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["player"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};
