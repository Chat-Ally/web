import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/component"
import { useRouter } from "next/router"
import { useState } from "react"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(e: any) {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error(error)
        } else {
            router.push('/dashboard')
        }
    }

    async function signUp() {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            console.error(error)
        }
        router.push('/dashboard')
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 ">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Crea una cuenta ahora</h1>
                                <p className="text-balance text-muted-foreground">Empieza en menos de 1 minuto</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ejemplo@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                variant="default"
                                className="w-full"
                                onClick={login}
                            >
                                Login
                            </Button>
                            <Button
                                variant="default"
                                className="w-full"
                                onClick={signUp}
                            >
                                Register
                            </Button>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}