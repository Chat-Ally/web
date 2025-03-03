import React, { ReactNode } from "react"

interface HeroTitleProps {
  children: ReactNode,
  alignment: "text-left" | "text-center" | "text-right"
}

export function HeroTitle({ children, alignment }: HeroTitleProps) {
  return (
    <h1 className={`text-5xl sm:text-7xl font-bold ${alignment}
      relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500`}>
      {children}
    </h1>
  )
}

export function HeroSubtitle() {
  return (
    <p className="text-lg text-white md:text-3xl">
      Dale superpoderes de venta a tu WhatsApp: <br />
      Automatiza mensajes, toma ordenes y resuelve dudas. </p>
  )
}

export function DotBackgroundDemo({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className="
        w-full 
      dark:bg-black bg-white  
        dark:bg-dot-white/[0.2] bg-dot-black/[0.2] 
        relative flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          className="absolute pointer-events-none inset-0 
          flex items-center justify-center 
        dark:bg-black bg-white 
          lg:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
          [mask-image:radial-gradient(ellipse_at_center,transparent_75%,black)]
          "></div>
        {children} {/* Render the passed children inside */}
      </div>
    </>
  )
}
