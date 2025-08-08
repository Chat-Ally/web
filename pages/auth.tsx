import { LoginForm } from "@/components/auth/login-form";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function Auth() {
    const router = useRouter()
    const { query } = router
    const [authType, setAuthType] = useState<"login" | "register">("login")

    useEffect(() => {
        if (query.auth == "register") setAuthType("register")
    }, [query, router.isReady])

    if (!authType) {
        return "Cargando...";
    }

    if (authType) {
        return (
            <>
                <Navbar />
                <div className="h-screen flex flex-col justify-center ">
                    <LoginForm authType={authType} />
                </div>
                <Toaster position="bottom-center" className="capitalize" />
            </>
        )
    }
}