import { Heading } from "@/components/ui/heading"
import { base64loadingShimmer } from "@/lib/functions"
import { getBooks } from "@/lib/sfunc"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai"

type Props = {
   type: "CercatiRecentemente" | "VicinoATe" | "ITuoiLibri" | "MessiRecentementeInVendita" | "MessiLike" | "ParamsLibri" | "LibriCercatiRecentemente"
   topSpacing?: boolean
}

export default function Page({type}: Props) {
   switch (type) {
      /* case "CercatiRecentemente":
         return <CercatiRecentemente />
      case "VicinoATe":
         return <VicinoATe />
      case "ITuoiLibri":
         return <ITuoiLibri /> */
      case "MessiRecentementeInVendita":
         return <MessiRecentementeInVendita />
      /* case "MessiLike":
         return <MessiLike />
      case "ParamsLibri":
         return <ParamsLibri />
      case "LibriCercatiRecentemente":
         return <LibriCercatiRecentemente /> */
      default:
         return null
   }
}

async function Books({data, topSpacing, title}: Omit<Props & {data: Book[], title: string}, "type">) {
   return (
      <>
         {
            topSpacing && <div className="h-[20px]"></div>
         }
         <div>
            <Heading variant={"h2"} align={"left"}>{title}</Heading>
            <div className="flex gap-[20px] py-4 overflow-x-auto mx-[-20px] px-[20px]">
               {data.map((book:Book, index:any) => {
                  const imageUrl = !book.img_id?.startsWith("http") ? `/api/image/${book.img_id!}` : book.img_id;
                  return (
                     <Link href={`/book/${book.slug}`} key={index}>
                        <div className="w-[150px] max-h-[250px] transition-all duration-300 rounded-[10px] p-2">
                           <div className="h-[200px] w-full rounded-[5px] relative overflow-hidden">
                              <Image alt={book.title} style={{objectFit:'cover'}} fill src={imageUrl} quality={10} placeholder="blur" blurDataURL={base64loadingShimmer(134,200)}/>
                              <div className="z-10 absolute bottom-1 left-1 bg-primary text-white rounded-md px-2 shadow-md">
                                 <p className="text-sm font-semibold">€{book.price}</p>
                              </div>
                           </div>
                           <p className="text-sm pt-2 line-clamp-2 text-center leading-4">{`${book.title}${book.publisher ? ` - ${book.publisher}`:""}`}</p>
                        </div>
                     </Link>
                  )
               })}
            </div>
         </div>
      </>
   )
}

async function MessiRecentementeInVendita() {
   const data = await getBooks(10)
   return <Books data={data} title="Messi recentemente in vendita" />
}