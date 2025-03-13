import createClient from "@/lib/supabase/api";
import { getChats } from "enwhats-db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const supabase = createClient(req, res)

    const chats = await getChats(supabase)

    // let chats = await supabase.from("chats").select("*").limit(10);

    res.json({
        "chats": chats
    })
}