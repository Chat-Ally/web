import createClient from "@/lib/supabase/api";
import { getProduct } from "enwhats-db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const supabase = createClient(req, res)

    const queryParams = req.query
    console.log(queryParams)

    const product = await getProduct(supabase, String(queryParams.businessPhone), String(queryParams.productName))
    res.json({
        "product": product
    })
}