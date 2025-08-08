import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/component"
import { useRouter } from "next/router"
import { useState } from "react"
import PrivacyNotice from "./privacy-notice"
import LoadingSpin from "../ui/loading-spin"
import { toast } from "sonner"

interface LoginFormProps extends React.ComponentProps<"div"> {
    authType: "login" | "register";
}

export function LoginForm({
    className,
    authType,
    ...props
}: LoginFormProps) {

    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationEmailSent, setConfirmationEmailSent] = useState(false)
    const [loading, setLoading] = useState(false)

    async function login(e: any) {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            toast.error(error.message)
            setLoading(false)
            console.error(error)
        } else {
            router.push('/dashboard')
        }
    }

    async function signUp(e: any) {
        e.preventDefault()
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
            toast.error(error.message)
            setLoading(false)
            console.error(error)
        }
        if (data) setConfirmationEmailSent(true)
    }

    let strings = {
        register: {
            cta: "Crea una cuenta ahora",
            subtitle: "Empieza en menos de 1 minuto",
            action: signUp,
            buttonText: "Registrarte",
            alternativeButtonText: "¿Ya tienes una cuenta?",
            alternativeButtonLink: "Inicia Sesión",
            alternativeLink: "/auth?auth=login",
        },
        login: {
            cta: "Inicia sesión en tu cuenta",
            subtitle: "Accede a todas las funcionalidades",
            action: login,
            buttonText: "Iniciar sesión",
            alternativeButtonText: "¿No tienes una cuenta?",
            alternativeButtonLink: "Crear una",
            alternativeLink: "/auth?auth=register"
        },
    };

    return (
        <div className={cn("flex flex-col gap-6 max-w-96 mx-auto", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 ">
                    {
                        confirmationEmailSent ?
                            <div className="p-4">
                                <CardTitle>Revisa el correo que te envíamos.</CardTitle>
                                <p className="pt-4">Entra el enlace para confirmar tu cuenta.</p>
                            </div>
                            :
                            <form className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">{strings[authType].cta}</h1>
                                        <p className="text-balance text-muted-foreground">{strings[authType].subtitle}</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Correo electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="ejemplo@gmail.com"
                                            value={email}
                                            disabled={loading}
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
                                            disabled={loading}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button
                                        variant="default"
                                        disabled={loading}
                                        className={`w-full`}
                                        onClick={strings[authType].action}
                                    >   
                                        {
                                            loading ? <LoadingSpin />:
                                            strings[authType].buttonText
                                        }
                                    </Button>
                                    <div className="text-center text-sm">
                                        {strings[authType].alternativeButtonText}{" "}
                                        <a href={strings[authType].alternativeLink} className="underline underline-offset-4">{strings[authType].alternativeButtonLink}</a>
                                    </div>
                                </div>
                            </form>
                    }
                </CardContent>
            </Card>
            <PrivacyNotice />
        </div>
    )
}