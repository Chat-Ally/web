import type { NextApiRequest, NextApiResponse } from "next";
import createClient from "@/lib/supabase/api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const supabase = createClient(req, res)
    // TODO: This only works because we disabled Row Level Policy. We must enable it again and make the necessary adjustments.
    const { data, error } = await supabase.from("customers").select("*").eq("user_id", 1)

    if (data) {
        res.status(200).json(data)
    } else {
        res.status(400).json(error)
    }
}