import React, { ReactNode } from "react";
import { Meteors } from "../ui/meteors";
import { IconNode, LucideProps } from "lucide-react";
import { HighLight } from "./do-not-make-an-app";

interface props {
    icon?: LucideProps | IconNode,
    channel?: string
}

export function MeteorsCard(props: props) {
    return (
        <div className=" w-full h-full relative mx-auto max-w-xs ">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.95] bg-red-500 rounded-md blur-lg " />
            <div className="relative shadow-xl bg-white dark:bg-gray-900 border border-gray-800  px-4 py-8 h-full w-full overflow-hidden rounded-2xl flex flex-col justify-center items-center">

                <div className="flex flex-col justify-center items-center text-base text-center text-slate-500 relative z-50">
                    {props.icon as ReactNode}
                    <p className="text-2xl">{props.channel}</p>
                </div>

                {/* Meaty part - Meteor effect */}
                <Meteors number={10} />
            </div>
        </div>
    );
}
