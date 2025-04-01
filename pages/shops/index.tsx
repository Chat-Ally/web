import { Card, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server-props"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const supabase = createClient(context)
    let { data, error } = await supabase.auth.getUser()

    const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select("*")
        .limit(25)

    if (businessError) console.error("businessError", businessError)
    if (businessData) console.log("businessData", businessData)

    return {
        props: {
            user: {
                email: data?.user?.email,
                name: 'test name',
                avatar: 'test avatar'
            },
            businessList: businessData
        }

    }
}

export default function Shops({ businessList }: { businessList: any }) {
    console.log(businessList)
    return (
        <div>
            <>Tiendas que venden enwhats </>
            {
                businessList.map((el: any) => (
                    <Card key={el.id}>
                        <CardTitle>
                            <Link href={'/shops/' + el.id}>
                                {el.name}
                            </Link>
                        </CardTitle>
                    </Card>
                ))
            }
        </div>

    )
}