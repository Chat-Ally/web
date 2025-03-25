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

    function checkWhatsappContainerRunning() { }
    function checkWhatsappContainerExists() { }
    function checkUserHasBusiness() { }

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

    if (businessError) console.error(businessError)

    // Container is also created here, if already exists, go to next step
    let containerExists
    if (businessData && businessData.id) {
        const { data: containerExists, error: noContainer } = await supabase
            .from("whatsapp-containers")
            .select("*")
            .eq("id", businessData.id)
            .single()

        if (containerExists) console.log(containerExists)
        if (noContainer) console.error(noContainer)
    }

    return {
        props: {
            businessData: businessData,
            containerCreated: containerExists ? containerExists : null
        }
    }
}

export default function SetupPage({
    businessData,
    containerCreated
}: {
    businessData: any,
    containerCreated: any
}) {
    return <Setup businessData={businessData} containerExists={containerCreated} />
}