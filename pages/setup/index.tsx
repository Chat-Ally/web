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

    // There is 4 states:
    // 1. New account: No business, no container, wapp not running
    // 2. Incomplete setup: Business, no container, wapp not running
    // 3. Incomplete setup: Business, container, Wapp not running
    // 4. Setup complete Business, container, wapp running

    // If business doesnt exist, stay here
    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("*")
        .eq('owner_id', data.user.id)
        .single()

    return {
        props: {
            businessData: businessData,
        }
    }
}

export default function SetupPage({
    businessData,
}: {
    businessData: any,
}) {
    return <Setup businessData={businessData} />
}