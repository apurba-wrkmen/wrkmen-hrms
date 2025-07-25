import { login as loginApi } from "@/services/login.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// 👈 Import actual login function

export const useLogin = () => {
    const navigate = useNavigate()
    
    const { mutate: login, isPending } = useMutation({


        mutationFn: (data) => loginApi(data),
        onSuccess: (res) => {
            toast.success("Account Verified");
            console.log(res);
            navigate("/dashboard")

            // Optionally navigate after success
        },

        onError: (err: any) => {
            toast.error(err.message || "Login failed");
            console.error("Login error:", err);
        }
    })

    return { login, isPending }
};
