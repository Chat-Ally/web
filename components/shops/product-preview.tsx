import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useCart } from "./cart-context";
import { ToastAction } from "../ui/toast";

function ProductPreview({
    product,
    onClick
}: {
    product: any,
    onClick: () => void
}) {
    const { addItem } = useCart()
    const { toast } = useToast()

    function handleAddtoCart() {
        addItem(product)
        toast({
            title: "Se agregó el producto a tu carrito.",
            action: (
                <ToastAction altText="Ver carrito">Ver</ToastAction>
            ),
        })
    }


    return (
        <Card className=" bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="cursor-pointer h-full">
                <div
                    onClick={() => onClick()}
                    className="relative aspect-square overflow-hidden rounded-t-lg"
                >
                    <img
                        src={product?.image_url}
                        alt={product?.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    {product?.salePrice > 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                            Sale
                        </span>
                    )}
                </div>

                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <CardTitle
                        onClick={() => onClick()}
                        className="text-lg line-clamp-1"
                    >
                        {product?.name}
                    </CardTitle>

                    <div className="">
                        <div className="flex justify-between items-center text-xs text-gray-600">
                            <span>{product?.category}</span>
                            <span>{product?.brand}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${product?.salePrice > 0 ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                ${product?.price}
                            </span>
                            {product?.salePrice > 0 && (
                                <span className="text-sm font-bold text-red-600">
                                    ${product?.salePrice}
                                </span>
                            )}
                        </div>

                        <Button
                            onClick={() => handleAddtoCart()}
                            size={"lg"}
                            className="w-full md:w-full py-1.5 px-3 text-sm bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition-colors duration-200"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ProductPreview