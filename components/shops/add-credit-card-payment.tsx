"use client"

import { useState } from "react"
import { CreditCard, Calendar, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function CreditCardPayment({
    onClickNext
}: {
    onClickNext: () => void
}) {
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ""
        const parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(" ")
        } else {
            return value
        }
    }

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

        if (v.length >= 3) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`
        }

        return value
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: Record<string, string> = {}

        if (!cardNumber || cardNumber.replace(/\s+/g, "").length < 16) {
            newErrors.cardNumber = "Please enter a valid card number"
        }

        if (!cardName) {
            newErrors.cardName = "Please enter the cardholder name"
        }

        if (!expiry || !expiry.includes("/") || expiry.length !== 5) {
            newErrors.expiry = "Please enter a valid expiry date (MM/YY)"
        }

        if (!cvv || cvv.length < 3) {
            newErrors.cvv = "Please enter a valid security code"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            // Process payment here
            console.log("Payment processing", { cardNumber, cardName, expiry, cvv })
            // You would typically call a payment processing API here
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your credit card information to complete your purchase.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">
                            <span className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                Card Number
                            </span>
                        </Label>
                        <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            className={cn(errors.cardNumber && "border-destructive")}
                        />
                        {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cardName">
                            <span className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Cardholder Name
                            </span>
                        </Label>
                        <Input
                            id="cardName"
                            placeholder="John Smith"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className={cn(errors.cardName && "border-destructive")}
                        />
                        {errors.cardName && <p className="text-sm text-destructive">{errors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">
                                <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Expiry Date
                                </span>
                            </Label>
                            <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                maxLength={5}
                                className={cn(errors.expiry && "border-destructive")}
                            />
                            {errors.expiry && <p className="text-sm text-destructive">{errors.expiry}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cvv">
                                <span className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Security Code
                                </span>
                            </Label>
                            <Input
                                id="cvv"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                                maxLength={4}
                                className={cn(errors.cvv && "border-destructive")}
                            />
                            {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={onClickNext} type="submit" className="w-full">
                        Comprar
                    </Button>
                </CardFooter>
            </form>
        </div>
    )
}

