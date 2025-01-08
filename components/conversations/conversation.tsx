import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Conversation({ name, phone, id }: { name: string, phone: string, id: string }) {

    function getSimpleNumber() {
        let simpleNumber = name.replace('@c.us', '')
        let extra_characteres = simpleNumber.length - 10
        return simpleNumber.substring(3)
    }

    return (
        <Link href={"/dashboard/conversations/" + String(id)}>
            <Card>
                <CardHeader className="flex flex-row">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{getSimpleNumber().slice(-3)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="ml-2 transition-colors hover:text-neutral-600">{getSimpleNumber()}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}