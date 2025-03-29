import HeroBanner from "@/components/shops/hero-banner";
import HomeProducts from "@/components/shops/home-products";
import { createClient } from "@/lib/supabase/server-props"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // Here user must be optional
    const supabase = createClient(context)
    let { data, error } = await supabase.auth.getUser()

    const { id } = context.params as { id: string }

    const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", id)
        .limit(20)

    if (productsError) console.error("businessError", productsError)
    if (productsData) console.log("businessData", productsData)

    return {
        props: {
            user: {
                email: data?.user?.email,
                name: 'test name',
                avatar: 'test avatar'
            },
            productList: productsData || []
        }
    }
}

export default function Shop({ productList }: { productList: any[] }) {
    // console.log("productList", productList)
    return (
        <div>
            <HeroBanner />
            <HomeProducts productList={productList} />
        </div>
    )
}