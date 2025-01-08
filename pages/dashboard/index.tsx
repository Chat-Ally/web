"use client"

import { BigChart } from "@/components/big-chart"
import { TypographyH1 } from "@/components/h1"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "./layout"

export default function Index() {
    return (
        <Layout>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Ganancias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TypographyH1>$23,499.42</TypographyH1>
                        <CardDescription>+12% desde el ultimo mes</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Chats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TypographyH1>34</TypographyH1>
                        <CardDescription>+12% desde el ultimo mes</CardDescription>
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>Ventas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TypographyH1>66</TypographyH1>
                        <CardDescription>+12% desde el ultimo mes</CardDescription>
                    </CardContent>
                </Card>
            </div>
            <BigChart />
        </Layout>
    )
}
