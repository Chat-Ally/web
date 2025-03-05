import { BigChart } from "@/components/big-chart"
import { TypographyH1 } from "@/components/h1"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "./layout"
import { createClient } from "@/lib/supabase/server-props"
import { GetServerSidePropsContext } from "next"
import { m } from "motion/react"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)

    const { data, error } = await supabase.auth.getUser()

    if (error || !data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    console.log(data)

    return {
        props: {
            user: {
                email: data.user.email,
                name: 'test name',
                avatar: 'test avatar'
            }
        }
    }
}

export default function Index({ user }: { user: any }) {
    return (
        <Layout user={user}>
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
