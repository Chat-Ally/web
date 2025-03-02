import { LoginForm } from "@/components/login-form";
import Navbar from "@/components/navbar";

export default function Auth() {
    return (
        <>
            <Navbar />
            <div className="h-screen flex flex-col justify-center mt-[-100px] md:mt-[-200px]">
                <LoginForm />
            </div>
        </>
    )
}