import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/global.scss";

const inter = Inter({ subsets: ["latin"] });
import Provider from "@/Provder/Provider";

export const metadata: Metadata = {
  title: "VS Code Copy",
  description: "VS CODE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
