import createClient from "@/lib/supabase/api";
import { createOrder, getBusinessIdByPhoneNumber, getChatId, getPhoneIdByNumber } from "enwhats-db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const queryParams = req.query

    if (req.method === 'POST') {
        const supabase = createClient(req, res)

        const businessId = await getBusinessIdByPhoneNumber(supabase, String(queryParams.businessPhone))
        const customerPhoneId = await getPhoneIdByNumber(supabase, String(queryParams.customerPhone))
        const chatId = await getChatId(supabase, businessId, customerPhoneId)
        const order = await createOrder(supabase, chatId, 100, 80, JSON.parse(String(queryParams.product_list)))

        if (order) {
            res.json({
                "status": "complete",
                "customer_phone": queryParams.businessPhone,
                "business_phone": queryParams.customerPhone,
                "order": order
            })
        }
    }
}