import createClient from "@/lib/supabase/api";
import { getProduct } from "enwhats-db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const supabase = createClient(req, res)
    const queryParams = req.query

    const product = await getProduct(
        supabase,
        String(queryParams.businessPhone),
        String(queryParams.name)
    )

    res.json({
        "product": product
    })
}