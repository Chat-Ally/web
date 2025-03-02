"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ReactNode } from "react";

interface MessageType {
    isUser: boolean;
    children: ReactNode
}

export function Message({ isUser, children }: MessageType) {
    return (
        <div className={`p-[8px] mb-2 text-white rounded-md max-w-96 ${isUser ? 'bg-[#144d37]' : 'bg-[#20272B]'}`}>
            {children}
        </div>
    )
}

export default function HeroMessageAnimation() {
    return (
        <div>
            <Message isUser={true} > buenos dias, me vende un arreglo de rosas? </Message>
            <Message isUser={false} > ¡Claro! Por favor paga en este link: https://bit.ly/8r0s </Message>
            <Message isUser={true} > ¡Gracias por tu compra! Tu pedido llegará a la dirección que nos diste la ultima vez. </Message>
        </div>
    )
}


export function ThreeDCardDemo() {
    return (
        <CardContainer className="inter-var py-0 w-full">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem translateZ="100" className="w-full mt-4">
                    <Message isUser={true} > buenos dias, me vende un arreglo de rosas? </Message>
                </CardItem>

                <CardItem translateZ="150" className="w-full mt-4">
                    <Message isUser={false} > ¡Claro! Por favor paga en este link: https://bit.ly/8r0s </Message>

                </CardItem>
                <CardItem translateZ="200" className="w-full mt-4">
                    <Message isUser={true} > ¡Gracias por tu compra! Tu pedido llegará a la dirección que nos diste la ultima vez. </Message>

                </CardItem>
            </CardBody>
        </CardContainer>
    );
}
