import { createClient } from "@/lib/supabase/server-props";
import Layout from "../../../components/layout";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)
    const { data: user, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const { id } = context.query
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", 1)
        .eq("id", id)
        .single()

    if (error) console.error(error)

    return {
        props: {
            data: data,
            user: {
                email: user.user.email,
                name: 'name',
                avatar: 'avatar'
            }
        }
    }
}

export default function Product({ data, user }: { data: any, user: any }) {
    console.log(data)
    return (
        <Layout user={user}>
            <p>Product </p>
        </Layout>
    )
}