import Footer from "@/components/footer";
import HeroBanner from "@/components/shops/hero-banner";
import HomeProducts from "@/components/shops/home-products";
import ShopNavbar from "@/components/shops/navbar";
import { createClient } from "@/lib/supabase/server-props"
import { GetServerSidePropsContext } from "next"
import { CartProvider } from "@/components/shops/cart-context";
import { Toaster } from "@/components/ui/toaster";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)
    let { data, error } = await supabase.auth.getUser() // Here user must be optional
    const { id } = context.params as { id: string }

    const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", id)
        .limit(20)
    if (productsError) console.error("productsError", productsError)
    if (productsData) console.log("businessData", productsData)

    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("*")
        .eq("id", id)
        .single()
    if (businessError) console.error("businessError", businessError)

    return {
        props: {
            user: {
                email: data?.user?.email || null,
                name: 'test name',
                avatar: 'test avatar'
            },
            businessData: businessData || null,
            productList: productsData || []
        }
    }
}

export default function Shop({
    productList,
    businessData,
    user
}: {
    productList: any[],
    user: any,
    businessData: any
}) {
    return (
        <div>
            <CartProvider>
                <ShopNavbar business={businessData} />
                <HeroBanner />
                <HomeProducts productList={productList} />
                <Toaster />
                <Footer />
            </CartProvider>
        </div>
    )
}