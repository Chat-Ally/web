import Layout from "../../../components/layout"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { CreateProductDialog } from "@/components/products/dialog"
import { GetServerSidePropsContext } from "next"
import { createClient } from "@/lib/supabase/server-props"
import { useState } from "react"
import Link from "next/link"

type Product = {
    id: number,
    name: string,
    description: string,
    imageURL: string,
    price: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => {
            return <Link href={`/dashboard/products/${row.getValue("id")}`} className="hover:underline">{row.getValue("name")}</Link>
        }
    },
    {
        accessorKey: "price",
        header: "Precio"
    }
]

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

    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("id")
        .eq("owner_id", data.user.id)
        .single()

    if (businessError) console.error("businessError", businessError)
    if (businessData) console.log("businessData", businessData)

    let { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessData?.id)

    if (productError) console.error('dashboard/products/index' + productError)

    return {
        props: {
            data: productData,
            user: {
                email: data.user.email,
                name: 'name',
                avatar: 'avatar'
            }
        }
    }
}

export default function Products({ data, user }: { data: any, user: any }) {
    console.log(data)
    const [products, setProducts] = useState(data)

    function updateProductList(newProduct: any) {
        setProducts([...products, newProduct])
    }

    return (
        <Layout user={user}>
            <div className="flex justify-between">
                <CreateProductDialog onProductCreated={updateProductList} />
            </div>
            <DataTable columns={columns} data={products} />
        </Layout>
    )
}