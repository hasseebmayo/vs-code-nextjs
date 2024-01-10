"use client";
import { ReactNode } from "react";
import Home from "../../assets/images/Home.svg";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <div className="header-main">
        <Home
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      {children}
    </>
  );
};

export default AuthLayout;
