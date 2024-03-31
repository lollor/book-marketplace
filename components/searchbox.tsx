"use client"

//import { ApiRicerche } from "@/typings"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BsSearch} from "react-icons/bs"
//import MyPopover from "./ui/mypopover"
import Link from "next/link"
import { cn } from "@/lib/utils"

//type Suggests = ApiRicerche["result"]

export default function SearchBox(){
   return null
   const router = useRouter()
   const [search, setSearch] = useState("")
   const [open, setOpen] = useState(false)
   const [suggest, setSuggest] = useState<Suggests>([])

   const searchFunc = (e:any) => {
      if (e) e.preventDefault()
      if (search.trim() == "") return
      router.push(`/search?q=${search.trim()}`)
   }

   const changeSearch = async (e:any)=>{
      const value = e.target.value.trim()
      
      setSearch(value)
      if (e.keyCode == 13){
         searchFunc(e)
      }

      if (value.length < 2) {
         setSuggest([])
         return
      }

      const res = await fetch(`/api/ricerche?query=${value}`)
      const json = await res.json() as ApiRicerche

      setSuggest(json.result)
   }

   useEffect(() => {
      if (suggest!.length > 0) setOpen(true)
      else setOpen(false)
   }, [search])

   return (
      <div className="relative w-full">
         <div className="flex items-center justify-between py-2 px-4 w-full rounded-3xl bg-white drop-shadow-my ">
            <input onKeyUp={changeSearch} type="text" className="outline-none w-11/12 text-black" placeholder="Cerca per libro, isbn, autore, profilo" />
            <button onClick={searchFunc}>
               <BsSearch className="" color="gray"/>
            </button>
         </div>
         <MyPopover open={open}>
            <div className="flex flex-col">
               {
                  suggest?.map((s) => {
                     /* const pos = s.query.toLowerCase().indexOf(search.toLowerCase())
                     const first = s.query.slice(0, pos)
                     const second = s.query.slice(pos + search.length)
                     const third = s.query.slice(pos, pos + search.length) */

                     const a = s.query.split(search).map(el=><>{el}</>).reduce((prev, curr, i) => {
                        if (!i) return [curr]
                        return [...prev, <b key={i}>{search}</b>, curr]
                     }, [] as any)

                     return (
                        <Link href={`/search?q=${s.query}`} key={s.query}>
                           {a}
                        </Link>
                     )

                  })
               }
            </div>
         </MyPopover>
      </div>
   )
}