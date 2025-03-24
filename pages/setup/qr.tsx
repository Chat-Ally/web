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

    return {
        props: {
            user: data.user
        }
    }

}

export default function QRPage({ user }: { user: any }) {
    return <QR user={user} />
}