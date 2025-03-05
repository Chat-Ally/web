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

    let chats
    // We changed tables, which broke this

    /* if (currentUser.user?.id) {
        let { data: business, error: businessError } = await supabase.from('business').select("*").eq("owner_id", currentUser.user.id).single()
        if (business) console.log(business)
        if (businessError) console.error("businessError: ", businessError)
        if (business && business.id) {
            let { data, error } = await supabase.from("chats").select("*").eq("id", business.id)
            if (data) console.log("chats: ", data)
            if (error) console.error(error)
            chats = data
        }
    } */

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
    const [conversations, setConversations] = useState(data.data)
    return (
        <Layout user={user}>
            <>
                <TypographyH1>Conversations</TypographyH1>

                {
                    conversations && conversations.length > 0 ?
                        conversations.map((conversation: { id: number, phone: string, name: string }) =>
                            <Conversation
                                key={conversation.id}
                                id={conversation.phone}
                                name={conversation.phone}
                                phone={conversation.phone}
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