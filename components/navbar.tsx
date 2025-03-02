import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})

export default function Navbar() {
    return (
        <nav className="absolute w-full z-20 ">
            <div className="lg:max-w-screen-xl flex justify-between items-center mx-auto p-2">
                <Link href="/">
                    <h2 className="text-lg sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-0" >enwhats</h2>
                </Link>
                <div className="flex">
                    <Link href="/auth" className="mr-2">
                        <Button variant="secondary">Entrar</Button>
                    </Link>
                    <Link href="/auth">
                        <Button>Registrarme</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}