import { Badge } from "../ui/badge";
import { useCart } from "./cart-context";

export default function CartItem(el: any) {
    const { removeItem } = useCart()

    return (
        <div className="flex">
            <img src={el.image_url} className="aspect-square w-24 object-contain" />
            <div className="w-full mx-4">
                <div className="flex justify-between w-full">
                    <p className="text-lg font-semibold">
                        {el.name}
                    </p>
                    <div className="font-semibold">
                        ${el.price}
                    </div>
                </div>
                <Badge
                    onClick={() => removeItem(el.id)}
                    className="bg-white border-red-600 text-red-500 hover:text-white"
                    variant={"destructive"}
                >
                    Eliminar
                </Badge>

            </div>
        </div>
    )
}