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
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { useLogin } from "@/hooks/useLogin";
import toast from "react-hot-toast";

// import { useProfile } from "@/features/profile/hooks/useProfile";

export default function LoginPage() {
  //   const navigate = useNavigate();
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

  return (
    <div className="flex gap-2">
      <div>image</div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm flex">
          <CardHeader>
            <CardTitle className="text-center">WELCOME BACK !</CardTitle>
            <CardDescription className="text-center">
              Please enter your details
            </CardDescription>
            {/* <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                </div>
                <p className="text-sm text-red-500 text-right font-semibold italic">
                  {errors?.email?.message as string}
                </p>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="pass123"
                    {...register("password", {
                      required: "password is required !",
                    })}
                  />
                  <p className="text-sm text-red-500 text-right font-semibold italic">
                    {errors?.password?.message as string}
                  </p>
                  <span
                    onClick={handleForget}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </span>
                </div>
                <Button type="submit" className="w-full">
                  login
                  {/* {login.isPending ? <Loader /> : "Login"} */}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
