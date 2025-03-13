import { AArrowDown, MessageCircle, MessageSquareText, Phone } from "lucide-react";
import { HeroTitle } from "../background";
import { HighLight } from "./do-not-make-an-app";
import { MeteorsCard } from "./meteors-card";

export default function Channels() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 w-full mt-8 items-center">
            <div className="col-span-3 mb-8">
                <HeroTitle alignment="text-left">En los canales que tus clientes usan.</HeroTitle>
            </div>
            <div className="grid w-full md:w-auto md:ml-8 grid-cols-2 grid-rows-2 gap-4 md:gap-8 aspect-square md:col-span-2">
                <MeteorsCard icon={<Phone size={42} />} channel="Voz" />
                <MeteorsCard icon={<MessageSquareText size={42} />} channel="SMS" />
                <MeteorsCard icon={<MessageCircle size={42} />} channel="Whatsapp" />
                <MeteorsCard channel="Pronto más..." />
            </div>
        </div>
    )
}