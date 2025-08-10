import { GetServerSidePropsContext } from "next";
import { createClient } from "@/lib/supabase/server-props"
import Setup from "@/components/setup/setup";

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

    const { data: profileData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single()

    // If business doesnt exist, stay here
    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("*")
        .eq('owner_id', data.user.id)
        .single()

    if (businessData === null) {
        return {
            props: {
                user: data,
                profile: profileData,
                businessData: businessData,
            }
        }
    } else {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
}

export default function SetupPage({
    user,
    profile,
    businessData,
}: {
    user: any,
    profile: any,
    businessData: any,
}) {
    return <Setup user={user} profile={profile} businessData={businessData} />
}