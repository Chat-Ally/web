import { DialogTitle } from "../ui/dialog"

export default function CartConfirm({
    onClickNext
}: {
    onClickNext: () => void
}) {
    return (
        <div>
            <DialogTitle>Tu compra fue confirmada.</DialogTitle>
        </div>
    )
}