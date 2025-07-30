// hooks/useUser.ts
import { getUser } from "@/services/user.api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
     retry: false,
  });


  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated",
  };
}
