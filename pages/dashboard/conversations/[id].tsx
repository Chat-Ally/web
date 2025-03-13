import { GetServerSidePropsContext } from "next";
import Layout from "../../../components/layout";
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Dify from "dify-js"
import { createClient } from "@/lib/supabase/server-props";

export default function Conversations() {
    return (<>Conversations</>)
}

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)
    let { data, error } = await supabase.auth.getUser()
    if (error || !data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const DIFY_URL = process.env.DIFY_URL
    const DIFY_API_KEY = process.env.DIFY_API_KEY
    if (!DIFY_URL || !DIFY_API_KEY) throw new Error("DIFY_URL or DIFY_API_KEY missing.")

    let dify = new Dify(DIFY_URL, DIFY_API_KEY)

    let conversationHistoryMessages = await dify.getConversationHistoryMessages(String(context.query.phone))
    conversationHistoryMessages = await conversationHistoryMessages.json()

    return {
        props: {
            messages: conversationHistoryMessages.data,
            user: data
        }
    }
}

export default function Conversation({ user, messages }: { user: any, messages: any }) {
    dayjs.extend(utc);
    dayjs.extend(timezone)

    return (
        <Layout user={user}>
            <div className="container ">
                <div className="mx-auto">
                    {messages.map((conversation: any) => (
                        <div key={conversation.id} className="flex flex-col">
                            <div className="w-fit max-w-[75%] bg-neutral-100 dark:bg-white rounded-xl p-2 my-2">
                                <p className="text-black">{conversation.query}</p>
                            </div>

                            <div className="w-[90%] md:w-[75%] bg-neutral-800 text-white rounded-xl p-2 ml-auto my-2">
                                <ReactMarkdown>{conversation.answer}</ReactMarkdown>
                                <p className="text-xs text-neutral-400">{dayjs.unix(conversation.created_at).tz("America/Mexico_City").format("h:mm a")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
} */