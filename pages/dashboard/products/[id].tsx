import { createClient } from "@/lib/supabase/server-props";
import Layout from "../../../components/layout";
import { GetServerSidePropsContext } from "next";
import ProductForm from "@/components/products/product-form";

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

    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("*")
        .eq("owner_id", user.user.id)
        .single()

    if (businessError) console.error(businessError)
    if (businessData) console.log(businessData)

    const { id } = context.query
    const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessData.id)
        .eq("id", id)
        .single()

    if (productError) console.error(productError)

    return {
        props: {
            product: productData,
            business: businessData,
            user: {
                email: user.user.email,
                name: 'name',
                avatar: 'avatar'
            }
        }
    }
}

export default function Product({
    product,
    user,
    business
}: {
    product: any,
    business: any,
    user: any
}) {

    return (
        <Layout user={user}>
            <div className="grid md:grid-cols-2">
                <img className="rounded-lg max-w-96 aspect-square object-cover" src={product.image_url} />
                <ProductForm
                    businessId={business.id}
                    productData={product}
                />
            </div>
        </Layout>
    )
}