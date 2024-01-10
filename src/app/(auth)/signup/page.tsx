"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import "../login/login.scss";
import BgSvg from "@/components/SVG/BgSvg";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import useToastify from "@/hooks/useToastify/useToastify";
type input = {
  userName: string;
};
export default function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<input>();
  const { mutate, isPending } = usePostApi();
  const { fireToast } = useToastify();
  const router = useRouter();
  const onSubmit: SubmitHandler<input> = (data) => {
    mutate(
      {
        data: {
          userName: data.userName,
        },
        path: "/api/signup",
      },
      {
        onSuccess: (res: any) => {
          fireToast("Signed up sucessfully", "success");
          router.push("/code");
        },
        onError: (err: any) => {
          console.log(err.response);
          fireToast(err?.response?.data?.message, "error");
        },
      }
    );
  };

  return (
    <>
      <div className="login-main">
        <BgSvg />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign up</h2>
          <div>
            <input
              placeholder="Username"
              autoComplete="false"
              type="text"
              {...register("userName", {
                required: "username is required!",
                validate: (val) => {
                  if (val.includes(" ")) {
                    return "Spaces are not allowed";
                  }
                  return true;
                },
              })}
            />
            {errors.userName && (
              <span className="error-auth">{errors.userName.message}</span>
            )}
          </div>

          <button>{isPending ? "Loading..." : "Sign up"}</button>
          <div className="no-accout">
            <p
              tabIndex={0}
              onClick={() => {
                router.push("/login");
              }}
            >
              Already Registered?
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
