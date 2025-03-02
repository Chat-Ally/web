import { DotBackgroundDemo, HeroSubtitle, HeroTitle } from "../background";
import { Spotlight } from "../ui/spotlight-new";
import HeroButtons from "./hero-buttons";
import { ThreeDCardDemo } from "./hero-message-animation";

export default function Hero() {
    return (
        <div className="lg:grid mt-12 grid-cols-1 md:grid-cols-2 lg:max-w-screen-xl space-y-8 md:space-y-4 md:py-24 md:px-auto   ">
            <Spotlight />
            <HeroTitle alignment="text-left">Convierte tus<br /> chats en ventas</HeroTitle>
            <div className="row-span-2">
                <ThreeDCardDemo />
            </div>
            <HeroSubtitle />
            <HeroButtons />
        </div>
    )
}