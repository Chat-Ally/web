"use client"

import { type LucideIcon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
    items,
    groupName
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[],
    groupName?: string
}) {
    return (
        <SidebarGroup>
            {groupName ?
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                : <></>
            }
            <SidebarMenu>
                {items.map((item) => (
                    <Link href={item.url}>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Link>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
