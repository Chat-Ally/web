// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/lib/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  data: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const supabase = createClient(req, res)
  const { data, error } = await supabase.auth.getUser()

  if (data) {
    res.status(200).json({
      name: "user logged in",
      data: data
    })
  }

  if (error) {
    res.status(200).json({
      name: "not logged in",
      data: error
    });
  }
}
