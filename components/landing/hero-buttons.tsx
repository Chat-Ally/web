import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroButtons() {
    return (
        <div className="flex w-full pt-2">
            <Button variant="shimer" size="lg" className="mr-4">
                <Link href="/auth">
                    Empieza a vender
                </Link>
            </Button>
            <Button size="lg">
                <Link href="#features-grid" >
                    Conoce más
                </Link>
            </Button>
        </div>
    )
}