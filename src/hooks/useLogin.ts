import { login as loginApi } from "@/services/login.api";
import { logout } from "@/services/logout.api";
import { resetPassword } from "@/services/resetpassword.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data: LoginData) => loginApi(data),
    onSuccess: () => {
      toast.success("Account Verified");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Login failed");
      console.error("Login error:", err);
    },
  });

  return { login, isPending };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logouts, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    },
    onError: (error: Error) => {
      console.error("Logout failed:", error.message);
    },
  });

  return { logouts, isPending };
};

export const useUdatePassword = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: resetPass, isPending } = useMutation({
    mutationFn: (data: string) => resetPassword(data),
    onSuccess: () => {
      queryClient.removeQueries()
      toast.success("Password update Succesfull")
      // navigate("/", { replace: true });
    },
    onError: (error: Error) => {
      toast.error("Password failed")
      console.error("Password Reset failed", error.message);
    },
  });




  return { resetPass, isPending };
};
