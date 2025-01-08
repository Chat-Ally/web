import { createClient } from "@/lib/supabase/server-props";
import Layout from "../layout";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)

    const { id } = context.query
    const { data, error } = await supabase.from("products").select("*").eq("business_id", 1).eq("id", id)
    if(error) console.error(error)
    
    return {
        props: {
            data: data
        } 
    }
}

export default function Product(data: any){
    console.log(data)
    return(
        <Layout>
            <p>Product </p>
        </Layout>
    )
}