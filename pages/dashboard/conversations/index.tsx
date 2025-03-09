import { TypographyH1 } from "@/components/h1";
import Layout from "../layout";
import Conversation from "@/components/conversations/conversation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { getChats } from "enwhats-db";

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

    // let chats = await getChats(supabase)

    let { data: chats, error: chatError } = await supabase
        .from("chats")
        .select(`
            id,
            customer_name,
            phones(number)
        `)

    if (chatError) console.error(chatError)

    if (chats) console.log(chats)

    return {
        props: {
            data: chats ? chats : [],
            user: {
                email: data?.user?.email,
                name: 'test name',
                avatar: 'test avatar'
            }
        }
    }
}

export default function Conversations({ data, user }: { data: any, user: any }) {
    console.log(data)
    const [conversations, setConversations] = useState(data)
    return (
        <Layout user={user}>
            <>
                <TypographyH1>Conversations</TypographyH1>

                {
                    conversations && conversations.length > 0 ?
                        conversations.map((conversation: { id: string, phones: any, customer_name: string }) =>
                            <Conversation
                                key={conversation.id}
                                id={conversation.id}
                                name={conversation.customer_name}
                                phone={conversation.phones.number}
                            />)
                        :
                        <h2>No conversations</h2>
                }
                <p>10 de 530</p>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </>
        </Layout>
    )
}