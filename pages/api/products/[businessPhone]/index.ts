import type { NextApiRequest, NextApiResponse } from 'next'
import { getProducts, } from "enwhats-db"
import createClient from '@/lib/supabase/api'
import { EmailOtpType } from '@supabase/supabase-js'

function stringOrFirstString(item: string | string[] | undefined) {
    return Array.isArray(item) ? item[0] : item
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const queryParams = req.query
    const token_hash = stringOrFirstString(queryParams.token_hash)
    const type = stringOrFirstString(queryParams.type)

    let next = '/error'
    console.log(queryParams)

    const supabase = createClient(req, res)
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type: type as EmailOtpType,
            token_hash
        })

        if (error) {
            console.error(error)
        } else {
            next = stringOrFirstString(queryParams.next) || '/dashboard'
        }
    }
    let products = await getProducts(supabase, String(queryParams.businessPhone))
    res.send(products)
}