import QR from "@/components/setup/qr";
import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = await createClient(context)

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
        .eq('owner_id', data.user?.id)
        .single()

    if (businessError) console.error("businessError", businessError)

    return {
        props: {
            user: data.user,
            businessData: businessData
        }
    }

}

export default function QRPage(
    {
        user,
        businessData,
    }: {
        user: any,
        businessData: any,
    }
) {
    return <QR
        user={user}
        businessData={businessData}
    />
}