"use client"

import * as React from "react"
import {
    House,
    MessageSquareText,
    Store,
    ShoppingBasket
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { ModeToggle } from "./toggle-theme"

const data = {
    projects: [
        {
            title: "Home",
            url: "/dashboard",
            icon: House,
        },
        {
            title: "Conversaciones",
            url: "/dashboard/conversations",
            icon: MessageSquareText,
        },
        {
            title: "Ordenes",
            url: "/dashboard/orders",
            icon: Store,
        },
        {
            title: "Productos",
            url: "/dashboard/products",
            icon: ShoppingBasket,
        },
    ],
}

export function AppSidebar({ user, ...props }: { user: { name: string, email: string, avatar: string } } & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavUser user={user} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <ModeToggle />
                </SidebarGroup>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
