import Books from "@/components/books/books"
import { getServerSession } from "next-auth"

export const dynamic = "force-dynamic"

export default async function Home() {
   const session = await getServerSession()
   return (
      <div>
         <Books type="MessiRecentementeInVendita" />
      </div>
   )
}
