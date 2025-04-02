import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/component"
import { useState } from "react"

export default function ProductForm({
    productData,
    businessId
}: {
    productData: any,
    businessId: number
}) {
    const supabase = createClient()

    const [productName, setProductName] = useState(productData.name || '')
    const [imageURL, setImageURL] = useState(productData.image_url || '')
    const [productPrice, setProductPrice] = useState(productData.price || '')

    async function updateProduct() {
        const { data, error } = await supabase
            .from('products')
            .update([{
                name: productName,
                image_url: imageURL,
                price: productPrice,
                business_id: businessId
            }])
            .eq("id", productData.id)
            .select()
        if (data) console.log(data)
        if (error) console.error(error)
    }

    return (
        <div>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right ">
                        Name
                    </Label>
                    <Input
                        id="name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Nombra tu producto"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Imagen URL
                    </Label>
                    <Input
                        id="username"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        placeholder="Imagen de tu producto"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Precio
                    </Label>
                    <Input
                        id="price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        type="number"
                        placeholder=""
                        className="col-span-3"
                    />
                </div>
            </div>
            <Button onClick={() => updateProduct()} >Guardar Producto</Button>
        </div>
    )
}