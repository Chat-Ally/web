import { useState } from "react";
import ProductDetailsDialog from "./product-dialog";
import ProductPreview from "./product-preview";

export default function HomeProducts({ productList }: { productList: any[] }) {
    const [product, setProduct] = useState()
    const [open, setOpen] = useState(false)

    function handleProductClick(el: any) {
        setProduct(el)
        setOpen(true)
    }

    return (
        <div className="container mx-auto grid grid-cols-4 gap-4 mt-4 md:px-56">
            {productList && productList.length > 0 ? productList.map((el: any) => (
                <ProductPreview onClick={() => handleProductClick(el)} key={el.id} product={el} />
            )) : <></>}
            <ProductDetailsDialog open={open} productDetails={product} onOpenChange={setOpen} />
        </div>
    )
}