// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import encodeToBase64 from "@/lib/encodeb64";
import createClient from "@/lib/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const supabase = createClient(req, res)
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        return res.status(200).json({
            name: "not logged in",
            data: error
        });
    }

    if (data.user && data.user.id) {
        let dockerfileRequest = await fetch('https://raw.githubusercontent.com/Chat-Ally/whatsapp-container/refs/heads/main/Dockerfile')
        let dockerfile = await dockerfileRequest.text()
        let encodedDockerfile = encodeToBase64(dockerfile)

        // Step 1: Create container with dockerfile
        let containerData = JSON.stringify({
            project_uuid: process.env.COOLIFY_PROJECT_ID,
            server_uuid: process.env.COOLIFY_SERVER_ID,
            environment_name: "production",
            dockerfile: encodedDockerfile,
            name: data.user.id
        })

        let response = await fetch(process.env.COOLIFY_SERVER + '/api/v1/applications/dockerfile', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + process.env.COOLIFY_API_KEY,
                'Content-Type': 'application/json'
            },
            body: containerData
        })

        let serverResponse = await response.json()
        let containerId = serverResponse.uuid

        const { data: businessData, error: businessError } = await supabase
            .from("business")
            .select("*")
            .eq('owner_id', data.user.id)
            .single()

        if (businessError) console.error(businessError)
        if (businessError || !businessData) {
            return res.status(400).send({
                error: businessError
            })
        }

        console.log(businessData)

        // Step 2: Set Env Variables to the previously created container
        const envRequest = await fetch(process.env.COOLIFY_SERVER + `/api/v1/applications/${containerId}/envs/bulk`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + process.env.COOLIFY_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        key: 'SUPABASE_URL',
                        value: '{{project.SUPABASE_URL}}'
                    },
                    {
                        key: 'SUPABASE_ADMIN_KEY',
                        value: '{{project.SUPABASE_ADMIN_KEY}}'
                    },
                    {
                        key: 'DIFY_URL',
                        value: '{{project.DIFY_URL}}'
                    },
                    {
                        key: 'DIFY_API_KEY',
                        value: '{{project.DIFY_API_KEY}}'
                    },
                    {
                        key: 'BUSINESS_ID',
                        value: String(businessData.id)
                    }
                ]
            })
        })

        console.log(envRequest)

        let envResponse = await envRequest.json()
        console.log(envResponse)

        // Step 3: Start container 
        const startContainerReq = await fetch(process.env.COOLIFY_SERVER + `/api/v1/applications/${containerId}/start`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + process.env.COOLIFY_API_KEY,
                'Content-Type': 'application/json'
            }
        })

        console.log(startContainerReq)

        let startContainrRes = await startContainerReq.json()
        console.log(startContainrRes)

        return res.send({
            ok: true
        })
    }
}