import { Button } from "../ui/button"
import { useCart } from "./cart-context"

export default function OrderSummary({
    onClickNext
}: {
    onClickNext: () => void
}) {
    const { getSubtotal } = useCart()

    return (
        <div className="w-1/3">
            <div>
                <p>Productos:${getSubtotal()} </p>
            </div>
            <p>Envío: $29</p>
            <p>Total: ${getSubtotal() + 29}</p>
            <Button
                onClick={() => onClickNext()}
                variant={"secondary"}
                className="w-full md:w-full"
                size={"lg"}
            >
                Finalizar compra
            </Button>
        </div>
    )
}