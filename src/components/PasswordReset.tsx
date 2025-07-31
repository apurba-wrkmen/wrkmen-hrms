import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm, type SubmitHandler } from "react-hook-form";
// import { Label } from "@radix-ui/react-label";

// import { CardContent } from "./ui/card";
import { useUdatePassword } from "@/hooks/useLogin";

export default function PasswordReset() {
  type LoginFormValues = {
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const { resetPass } = useUdatePassword();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    resetPass(data.password);
    console.log(data);
    reset();
  };

  return (
    <>
      <h1 className="text-xl font-bold text-primary2 ">PasswordReset</h1>
      {/* <CardContent className="flex  "> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  gap-6 flex-wrap align-baseline"
        >
          {/* Email */}

          {/* Password */}
          <div className="grid gap-2">
            {/* <Label htmlFor="password">Password</Label> */}
            <Input
              id="password"
              type="text"
              placeholder="enter new password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="" size="lg">
            Reset
          </Button>
        </form>
      {/* </CardContent> */}
    </>
  );
}
