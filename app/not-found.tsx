import { Heading } from '@/components/ui/heading'
import Image from 'next/image'

export const metadata = {
   title: "Pagina non trovata",
   description: "Pagina non trovata",
   robots: "noindex, nofollow",
}


export default function NotFound() {
   return (
      <div>
         <div className='h-[100px]'/>
         <div className="w-full h-[150px]">
            <div className="w-full h-full relative overflow-hidden">
               <Image alt="not found" style={{objectFit:'contain'}} fill src={"/not-found.png"} />
            </div>
         </div>
         <div className='h-[80px]'/>
         <div className="flex flex-col items-center justify-center">
            <Heading className="my-2">404</Heading>
            <p className="text-xl text-center my-2 font-semibold">Pagina non trovata</p>
         </div>
         <div className='h-[50vh]'/>
      </div>
   )
}