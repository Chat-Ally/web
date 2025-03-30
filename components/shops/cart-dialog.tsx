import { ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useCart } from "./cart-context";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge"

export default function CartDialog() {
    const { cartItems, getSubtotal, removeItem } = useCart()

    return (
        <Dialog>
            <DialogTrigger>
                <div className="hover:bg-slate-100 rounded-full p-2">
                    <ShoppingCart />
                </div>
            </DialogTrigger>
            <DialogContent className="p-4 sm:p-6 lg:p-8 max-w-[95vw] sm:max-w-[700px] lg:max-w-[900px] overflow-y-auto max-h-[90vh]">
                {cartItems.length < 1 ?
                    <DialogTitle>Tu carrito está vacío</DialogTitle>
                    :
                    <div className="flex w-full">
                        <DialogHeader className="w-2/3">
                            <DialogTitle>Carrito </DialogTitle>
                            {cartItems.map((el) => (
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
                            ))}
                        </DialogHeader>
                        <div className="w-1/3">
                            <div>
                                <p>Productos:${getSubtotal()} </p>
                            </div>
                            <p>Envío: $29</p>
                            <p>Total: ${getSubtotal() + 29}</p>
                            <Button
                                variant={"secondary"}
                                className="w-full md:w-full"
                                size={"lg"}
                            >
                                Finalizar compra
                            </Button>
                        </div>
                    </div>
                }
            </DialogContent>
        </Dialog>

    )
}