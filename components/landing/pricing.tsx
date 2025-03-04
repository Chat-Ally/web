import React from "react";
import { HeroTitle } from "../background";
import { Button } from "../ui/button";

const Pricing = () => {
    return (
        <section className="relative z-10 overflow-hidden  pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 text-center">
                        <HeroTitle alignment="text-center">Accesible para todos los emprendedores.</HeroTitle>
                    </div>
                </div>

                <div className=" flex flex-wrap justify-center mt-8">
                    <div className="grid md:grid-cols-3 space-y-8 md:space-y-0 md:gap-16 w-full px-6 ">
                        <PricingCard
                            type="Gratuito"
                            price="Gratis"
                            description="Ideal para empezar a vender en línea."
                            buttonText="Probar gratis"
                            premium={false}
                        >
                            <List>Tienda en línea</List>
                            <List>Hasta 20 productos</List>
                        </PricingCard>
                        <PricingCard
                            type="Emprendedor"
                            price="$299"
                            subscription="mes"
                            description="Automatiza tu WhatsApp y agiliza tus ventas."
                            buttonText="Empieza a Vender"
                            premium={false}
                        >
                            <List>Tienda en línea personalizabale.</List>
                            <List>Hasta 50 chats al día</List>
                            <List>Mensajes ilimitados</List>
                            <List>Hasta 100 productos</List>
                            <List>Chat de Whatsapp</List>
                            <List>Chat SMS</List>
                        </PricingCard>
                        <PricingCard
                            type="Premium"
                            price="$999"
                            subscription="mes"
                            description="Vende a gran escala en multiples canales."
                            buttonText="Choose Professional"
                            premium={true}
                        >
                            <List>Tienda en línea personalizabale.</List>
                            <List>Chats ilimitados</List>
                            <List>Mensajes ilimitados</List>
                            <List>Productos ilimitados</List>
                            <List>Chat de Whatsapp</List>
                            <List>Chat SMS</List>
                            <List>3 líneas telefonicas automatizadas</List>
                        </PricingCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;

const PricingCard = ({
    children,
    description,
    price,
    type,
    subscription,
    buttonText,
    active,
    premium
}) => {
    return (
        <div className="">
            <div className="w-full relative h-full transition-transform group">
                <div className="-inset-0.5 absolute h-[100%] blur-md group-hover:scale-105  
                bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)] "></div>
                <div className="relative h-full z-10 mb-10 bg-white dark:bg-black overflow-hidden rounded-[10px] border-2 border-slate-800 px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[24px]">
                    <span className="mb-3 block text-lg font-semibold text-primary text-body-color dark:text-white dark:text-dark-6">{type}</span>
                    <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
                        {price}
                        <span className="text-base font-medium text-body-color dark:text-dark-6">
                            {subscription ? "/" + subscription : ""}
                        </span>
                    </h2>

                    <div className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
                        <p className="pb-4">
                            {description}
                        </p>

                        {
                            premium ?

                                <Button size={"lg"} variant="shimerFull" className="w-full">
                                    Empezar a vender
                                </Button>

                                :
                                <a
                                    href="/#"
                                    className={` ${active
                                        ? "block w-full rounded-md border border-slate-800 bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90 hover:bg-gray-50"
                                        : "block w-full rounded-md border border-slate-800 bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-black hover:text-white dark:border-dark-3"
                                        } `}
                                >
                                    {buttonText}
                                </a>
                        }
                    </div>
                    <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
                    <div></div>
                </div>
            </div >
        </div>
    );
};

const List = ({ children }) => {
    return (
        <p className="text-base text-body-color dark:text-dark-6">{children}</p>
    );
};
