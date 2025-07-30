import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { useLogin } from "@/hooks/useLogin";
import toast from "react-hot-toast";
import leftLogo from "@/assets/leftlogo.png";
import hrms from "@/assets/wrkmen_hrms.svg";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import { useProfile } from "@/features/profile/hooks/useProfile";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  // if (user) return navigate("/dashboard", { replace: true });

  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { login, isPending } = useLogin();

  const onSubmit = async (data) => {
    console.log(data);
    const res = login(data);
    console.log(res);
  };

  const handleForget = () => {
    toast("contact to your administation !");
  };
  //   const handleNavigateSignup = () => {
  //     navigate("/auth/signup");
  //   };

  // const handleNavigateforgotPassword = () => {
  //   navigate("/forgotpassword");
  // };
  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // },[user]);

  return (
    <div className="flex items-center justify-center h-screen bg-background3 sm:flex-row">
      <div className="flex 
      w-[800px] h-[600px] 
      rounded-md overflow-hidden shadow-lg ">
        {/* Left Panel */}
        <div className="w-1/2 bg-background2 flex items-center justify-center">
          <img
            src={leftLogo}
            alt="left logo"
            className="h-[400px] object-contain"
          />
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <Card className="w-full px-6 py-4 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <img src={hrms} alt="" className="h-30" />
              </CardTitle>
              <CardDescription className="text-center">
                Please Login to Access Your Dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@sample.com"
                      {...register("email", {
                        required: "Email is required !",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Please provide a valid email",
                        },
                      })}
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500 italic">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="pass123"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors?.password && (
                      <p className="text-sm text-red-500 italic">
                        {errors.password.message}
                      </p>
                    )}

                    <span
                      onClick={handleForget}
                      className="ml-auto text-sm underline cursor-pointer text-right text-purple-700 hover:text-purple-900"
                    >
                      Forgot your password?
                    </span>
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-[100px] self-center mt-2">
                    login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
