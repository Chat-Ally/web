import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useCart } from "./cart-context";
import CartItem from "./cart-item";
import OrderSummary from "./order-summary";

export default function CartDialog() {
    const { cartItems } = useCart()

    return (
        <Dialog>
            <DialogTrigger>
                <div className="hover:bg-slate-100 rounded-full p-2">
                    <ShoppingCartIcon />
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
                                <CartItem product={el} key={el.id} />
                            ))}
                        </DialogHeader>
                        <OrderSummary />
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}