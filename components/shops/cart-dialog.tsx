import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CartDetails from "./cart-details";
import CartShipping from "./cart-shipping";
import CartConfirm from "./cart-confirmation";
import { useState } from "react";
import CreditCardPayment from "./add-credit-card-payment";

export default function CartDialog() {
    const steps = ["details", "shipping", "payment", "confirmation"]
    const [currentStep, setCurrentStep] = useState("details")

    function handleNextStep() {
        // Find the index of the current step and increment it.
        const nextStepIndex = steps.indexOf(currentStep) + 1;

        if (nextStepIndex == steps.length) setCurrentStep(steps[0])

        // Check if the nextStepIndex is within the range of steps.
        if (nextStepIndex < steps.length) {
            setCurrentStep(steps[nextStepIndex]);
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <div className="hover:bg-slate-100 rounded-full p-2">
                        <ShoppingCartIcon />
                    </div>
                </DialogTrigger>

                <DialogContent
                    className="p-4 sm:p-6 lg:p-8 max-w-[95vw] sm:max-w-[700px] lg:max-w-[900px] overflow-y-auto max-h-[90vh]">
                    {
                        currentStep == "details" ?
                            <CartDetails onClickNext={handleNextStep} /> : null
                    }
                    {
                        currentStep == "shipping" ?
                            <CartShipping onClickNext={handleNextStep} /> : null
                    }
                    {
                        currentStep == "payment" ?
                            <CreditCardPayment onClickNext={handleNextStep} /> : null
                    }
                    {
                        currentStep == "confirmation" ?
                            <CartConfirm onClickNext={handleNextStep} /> : null
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}