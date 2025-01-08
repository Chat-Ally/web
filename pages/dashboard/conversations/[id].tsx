import { GetServerSidePropsContext } from "next";
import dify from "../../../../dify-js/index"
import Layout from "../layout";
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'


export async function getServerSideProps(contex: GetServerSidePropsContext) {
    const DIFY_URL = process.env.NEXT_PUBLIC_DIFY_URL
    const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY

    let { getConversationHistoryMessages } = dify(DIFY_URL, DIFY_API_KEY)

    let data = await getConversationHistoryMessages(contex.query.id)
    console.log(data)

    return {
        props: {
            data: data.data
        }
    }
}

export default function Conversation(props: any) {

    dayjs.extend(utc);
    dayjs.extend(timezone)

    return (
        <Layout>
            <div className="container ">
                <div className="mx-auto">
                    {props.data.map((conversation: any) => (
                        <div className="flex flex-col">
                            <div className="w-fit max-w-[75%] bg-neutral-100 dark:bg-white rounded-xl p-2 my-2">
                                <p className="text-black">{conversation.query}</p>
                            </div>

                            <div className="w-[90%] md:w-[75%] bg-neutral-800 text-white rounded-xl p-2 ml-auto my-2">
                                {/* <p>{conversation.answer}</p> */}
                                <ReactMarkdown>{conversation.answer}</ReactMarkdown>
                                <p className="text-xs text-neutral-400">{dayjs.unix(conversation.created_at).tz("America/Mexico_City").format("h:mm a")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}