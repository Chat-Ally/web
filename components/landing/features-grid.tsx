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
    header: <div className="rounded-md p-16 w-full h-full bg-[length:100%_auto] bg-[35%_20%]  md:bg-center bg-[url('https://i.blogs.es/7db77a/canales-en-todo-el-mundo-whatsapp-portada/840_560.jpeg')]"></div>,
    className: "md:col-span-2",
  },
  {
    title: "Administra tus ordenes y cobros.",
    description: "Cuando haya una venta, podras verla en una intuitiva interfaz web.",
    header: <div className="rounded-md p-16 w-full h-full bg-no-repeat bg-[length:175%_auto] bg-[50%_20%] md:bg-[length:200%_auto] md:bg-[center_top_1rem] bg-[url('https://fxyribxpczjutxfikcuw.supabase.co/storage/v1/object/public/landing//Galaxy%20Tab%20S8%20Ultra.png')]"></div>,
    className: "md:col-span-1",
  },
  {
    title: "Pausa en cualquier momento.",
    description: "Si en algun momento quieres responder personalmente, puedes pausar Chat Ally.",
    header: <div className="rounded-md p-16 w-full h-full bg-[length:235%_auto] bg-[35%_25%]  md:bg-[length:350%_auto] md:bg-[35%_20%] bg-[url('https://fxyribxpczjutxfikcuw.supabase.co/storage/v1/object/public/landing//iPhone%2015%20Ordenes.png')]"></div>,
    className: "md:col-span-1",
  },
  {
    title: "Recuerda los detalles importantes.",
    description: "¿Hamburguesa sin mostaza? Chat Ally lo recordará la próxima vez que hable con este cliente.",
    header: <div className="rounded-md p-16 w-full h-full bg-[length:250%_auto] bg-[45%_45%] bg-[url('https://fxyribxpczjutxfikcuw.supabase.co/storage/v1/object/public/landing//Realme%2010.png')]"></div>,
    className: "md:col-span-2",
  },
];
