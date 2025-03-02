import { ReactNode } from "react"
import ChartComparison from "./chart"

export function HighLight({ children }: { children: ReactNode }) {
    return (
        <p className="text-2xl sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8" >{children}</p>
    )
}

export default function DoNotMakeAnApp() {
    return (
        <div className="md:grid md:grid-cols-2">
            <div className="">
                <HighLight>Para el 79% de los negocios, crear una app es un error.</HighLight>
                <p className="text-xl">Desarrollar una aplicación o ecommerce puede ser muy caro, tomar mucho tiempo, y añáde fricción a potenciales clientes.</p>
            </div>
            <ChartComparison />
        </div>
    )
}

