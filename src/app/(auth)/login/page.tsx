"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import "./login.scss";
import { useRouter } from "next/navigation";
import BgSvg from "@/components/SVG/BgSvg";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import useToastify from "@/hooks/useToastify/useToastify";
type input = {
  userName: string;
};
export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<input>();
  const { isPending, mutate } = usePostApi();
  const { fireToast } = useToastify();
  const onSubmit: SubmitHandler<input> = (data) => {
    mutate(
      {
        data: {
          userName: data.userName.toLowerCase(),
        },
        path: "/api/login",
      },
      {
        onSuccess: () => {
          fireToast("Logged in sucessfully", "success");
          window.location.reload();
        },
        onError: (ERR: any) => {
          fireToast(ERR?.response.data.message, "error");
        },
      }
    );
  };

  return (
    <div className="login-main">
      <BgSvg />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div>
          <input
            placeholder="Username"
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

        <button disabled={isPending}>
          {isPending ? "Loading.." : "Login"}
        </button>
        <div className="no-accout">
          <p
            tabIndex={0}
            onClick={() => {
              router.push("/signup");
            }}
          >
            Dont have a account yet?
          </p>
        </div>
      </form>
    </div>
  );
}
