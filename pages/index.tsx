import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Navbar from "@/components/navbar";
import { TypographyH1 } from "@/components/h1";
import { LoginForm } from "@/components/login-form";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Navbar />
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <TypographyH1>Convierte tus chats <br /> en ventas</TypographyH1>
          <LoginForm />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        </footer>
      </div>
    </div>
  );
}
