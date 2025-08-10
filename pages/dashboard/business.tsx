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

    const { data: profileData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", data.user?.id)
        .single()

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
            businessData: businessData,
            profile: profileData
        }

    }
}

export default function Business({
    user,
    businessData,
    profileData
}: {
    user: any,
    profileData: any
    businessData: any
}) {
    return (
        <Layout user={user}>
            <Setup profile={profileData} user={user} businessData={businessData} />
        </Layout>
    )
}