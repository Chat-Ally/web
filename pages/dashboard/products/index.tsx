import Layout from "../layout"
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
    
    let { data, error } = await supabase.from("products").select("*").eq("business_id", 1)
    
    return {
        props: {
            data: data
        }
    }
}

export default function Products(data: any) {
    console.log(data)
    const [products, setProducts] = useState(data.data)
    
    function updateProductList(newProduct: any){
        setProducts([...products, newProduct])
    }
    return (
        <Layout>
            <div className="flex justify-between">

            <CreateProductDialog onProductCreated={updateProductList} />
            <>Products</>
            </div>
            <DataTable columns={columns} data={products} />
        </Layout>
    )
}