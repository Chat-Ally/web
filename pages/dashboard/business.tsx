import Layout from "@/components/layout"
import Setup from "@/components/setup/setup"
import { createClient } from "@/lib/supabase/server-props"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)
    let { data, error } = await supabase.auth.getUser()
    if (error || !data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("*")
        .eq("owner_id", data.user?.id)
        .single()

    if (businessError) console.error("businessError", businessError)
    if (businessData) console.log("businessData", businessData)




    return {
        props: {
            user: {
                email: data?.user?.email,
                name: 'test name',
                avatar: 'test avatar'
            },
            businessData: businessData
        }

    }
}

export default function Business({ user, businessData }: { user: any, businessData: any }) {
    console.log(user)
    return (
        <Layout user={user}>
            <Setup businessData={businessData} />
        </Layout>
    )
}