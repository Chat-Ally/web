import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { HeroTitle } from "../background";

export function FeaturesGrid() {
  return (
    <div className="lg:max-w-screen-xl">
      <HeroTitle alignment="text-center">Un Ecommerce <br /> en tu WhatsApp</HeroTitle>
      <BentoGrid className="mx-auto md:auto-rows-[20rem] mt-4">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "Automatiza las ventas por chat.",
    description: "Chat Ally puede responder las dudas de tus clientes, ofrecerles tus productos y hacer cobros.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    title: "Administra tus ordenes y cobros.",
    description: "Cuando haya una venta, podras verla en una intuitiva interfaz web.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Pausa en cualquier momento.",
    description: "Si en algun momento quieres responder personalmente, puedes pausar Chat Ally.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Recuerda los detalles importantes.",
    description: "¿Hamburguesa sin mostaza? Chat Ally lo recordará la próxima vez que hable con este cliente.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
];
