"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { month: "Chat Ally", desktop: 299 },
    { month: "Ecommerce o App", desktop: 100000 },
]

const chartConfig = {
    desktop: {
        label: "$",
        color: "#2563eb",
    },
} satisfies ChartConfig

export default function ChartComparison() {
    return (
        <ChartContainer config={chartConfig} className="pt-4 md:px-32 mt-4">
            <BarChart
                className="pt-1 md:pt-3"
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 20,
                }}
            >
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground text-black"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
