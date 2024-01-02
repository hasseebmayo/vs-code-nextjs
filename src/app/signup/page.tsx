"use client";

import { SubmitHandler, useForm } from "react-hook-form";
type input = {
  userName: string;
};
export default function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<input>();
  const onSubmit: SubmitHandler<input> = (data) => console.log(data);
  return (
    <div className="login-main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <input
          placeholder="Username"
          {...register("userName", {
            required: "username is required!",
          })}
        />

        <button>Login</button>
        <div className="no-accout">
          <p tabIndex={0}>Don't have a account yet?</p>
        </div>
      </form>
    </div>
  );
}
