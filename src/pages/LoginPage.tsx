import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { useLogin } from "@/hooks/useLogin";
import toast from "react-hot-toast";
import leftLogo from "@/assets/leftlogo.png";
import hrms from "@/assets/wrkmen_hrms.svg";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { login } = useLogin();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    login(data);
  };

  const handleForget = () => {
    toast("Contact your administration!");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background3">
      <div className="flex w-[800px] h-[600px] rounded-md overflow-hidden shadow-lg">
        {/* Left Panel */}
        <div className="w-1/2 bg-background2 flex items-center justify-center">
          <img src={leftLogo} alt="left logo" className="h-[400px] object-contain" />
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <Card className="w-full px-6 py-4 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center">
                <img src={hrms} alt="HRMS logo" className="h-20 mx-auto" />
              </CardTitle>
              <CardDescription className="text-center">
                Please Login to Access Your Dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@sample.com"
                    {...register("email", {
                      required: "Email is required!",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 italic">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    {...register("password", { required: "Password is required!" })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 italic">{errors.password.message}</p>
                  )}
                  <span
                    onClick={handleForget}
                    className="ml-auto text-sm underline cursor-pointer text-right text-purple-700 hover:text-purple-900"
                  >
                    Forgot your password?
                  </span>
                </div>

                <Button type="submit" className="w-[100px] self-center mt-2">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
