"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import Hero from "./hero";

export function SpotlightNewDemo() {
    return (
        <div className=" w-full p-4 lg:p-0 rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight />
            <Hero />
        </div>
    );
}
