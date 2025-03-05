import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Navbar from "@/components/navbar";
import { LoginForm } from "@/components/auth/login-form";
import { FeaturesGrid } from "@/components/landing/features-grid";
import DoNotMakeAnApp from "../components/landing/do-not-make-an-app";
import Channels from "@/components/landing/channels";
import Footer from "@/components/footer";
import { DotBackgroundDemo } from "@/components/background";
import { SpotlightNewDemo } from "@/components/landing/spotlight-new-example";
import Pricing from "@/components/landing/pricing";

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
    <>
      <Navbar />
      <SpotlightNewDemo />
      <DotBackgroundDemo>
        <div >
          <div className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] grid grid-cols-1 md:gap-y-32 px-4 md:px-auto container mx-auto lg:max-w-screen-xl py-24 `}>
            <FeaturesGrid id="features-grid" />
            <Channels />
            <DoNotMakeAnApp />
            <Pricing />
            <LoginForm authType="register" />
          </div>
          <Footer />
        </div>
      </DotBackgroundDemo>
    </>
  )
}