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

    let { data: currentUser, error: userError } = await supabase.auth.getUser()
    if(userError) console.error(userError)

    let chats
    if(currentUser.user?.id){
        let { data: business, error: businessError } = await supabase.from('business').select("*").eq("owner_id", currentUser.user.id).single()
        if(business) console.log(business)
        if(businessError) console.error("businessError: ", businessError)
        if(business && business.id){
            let { data, error } = await supabase.from("chats").select("*").eq("id", business.id)
            if(data) console.log("chats: ", data)
            if(error) console.error(error)
            chats = data
        }
    }
    
    return {
        props: {
            data: chats ? chats : []
        }
    }
}

export default function Conversations(data: any) {
    const apiKey = 'app-2g5Yi7BOkP4JTgh1A1yF8lOH'
    const url = 'http://localhost:8128/v1'
    const [conversations, setConversations] = useState(data.data)

    console.log(data)

    return (
        <Layout>
            <TypographyH1>Conversations</TypographyH1>
            <p>10 de 530</p>

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
                    <TypographyH1>No conversations</TypographyH1>
            }


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
        </Layout>
    )
}