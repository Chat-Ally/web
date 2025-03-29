import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ProductDetailsDialog from "./product-dialog";

export default function HomeProducts({ productList }: { productList: any[] }) {
    const [product, setProduct] = useState()
    const [open, setOpen] = useState(true)

    function handleProductClick(el: any) {
        setProduct(el)
        setOpen(true)
    }

    return (
        <div className="container mx-auto grid grid-cols-4 gap-4 mt-4">
            {productList && productList.length > 0 ? productList.map((el: any) => (
                <Card onClick={() => handleProductClick(el)} key={el.id}>
                    <CardHeader>
                        <CardTitle>{el.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <img src={el.image_url} className="aspect-square object-cover" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button> Agregar al carrito </Button>
                    </CardFooter>
                </Card>
            )) : <></>}
            <ProductDetailsDialog open={open} productDetails={product} onOpenChange={setOpen} />
        </div>
    )
}