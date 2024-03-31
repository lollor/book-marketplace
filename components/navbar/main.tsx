"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import iconPng from "@/public/icon.png";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import {
   BsBook,
   BsBookmarks,
   BsChatDots,
   BsChatSquareQuote,
   BsPersonCircle,
} from "react-icons/bs";
import { usePathname } from "next/navigation";
//import LoadingSpin from "./loadingspin";
import SearchBox from "@/components/searchbox";
import { useIsMobile } from "@/hooks";
import { Loader2 } from "lucide-react";

export default function Page() {
   const fullSession = useSession();
   const session = fullSession.data;
   const pathname = usePathname();
   const isMobile = useIsMobile(768);

   function getCurrentPath() {
      if (typeof window === "undefined") return "";
      return window.location.pathname;
   }

   return (
      <>
         <div className="flex justify-between w-full bg-transparent text-white p-[15px] items-center">
            <Link href="/" prefetch={false}>
               <div className="flex items-center gap-[15px]">
                  <div className="rounded-full w-[40px] h-[40px] relative overflow-hidden">
                     <Image
                        alt="BookMarketplace"
                        placeholder="blur"
                        src={iconPng}
                        style={{ objectFit: "cover" }}
                        fill
                        quality={100}
                     ></Image>
                  </div>
                  <h1 className="text-lg font-bold text-colortext drop-shadow-mytext">
                     <span className="text-accent">Book</span>Marketplace
                  </h1>
               </div>
            </Link>
            <div className="flex justify-end items-center gap-6 md:w-2/3 xl:w-1/2">
               {session ? (
                  <div className="sm:flex items-center gap-4 justify-end w-full hidden">
                     <Link
                        href={"/crea-annuncio"}
                        className="flex gap-1 items-center text-black px-3 py-1 transition-all duration-300 hover:bg-secondary/50 rounded-lg"
                     >
                        <BsBook className="-mb-[2px]" />
                        Crea annuncio
                     </Link>
                     <Link
                        href={"/crea-richiesta"}
                        className="flex gap-1 items-center text-black px-3 py-1 transition-all duration-300 hover:bg-secondary/50 rounded-lg"
                     >
                        <BsChatSquareQuote className="-mb-[2px]" />
                        Crea richiesta
                     </Link>
                     <SearchBox />
                  </div>
               ) : (
                  <div className="sm:flex items-center gap-4 justify-end w-full hidden">
                     <SearchBox />
                  </div>
               )}
               {fullSession.status == "authenticated" ? (
                  session ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Avatar className="drop-shadow-my">
                              <AvatarImage src={session?.user?.image || undefined} />
                              <AvatarFallback>
                                 {session?.user?.name?.at(0) || "U"}
                              </AvatarFallback>
                           </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           collisionPadding={15}
                           className="text-base"
                        >
                           <DropdownMenuItem asChild className="sm:hidden">
                              <Link
                                 href={"/crea-annuncio"}
                                 className="flex gap-2"
                              >
                                 <BsBook className="mb-[2px]" />
                                 Crea annuncio
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild className="sm:hidden">
                              <Link
                                 href={"/crea-richiesta"}
                                 className="flex gap-2"
                              >
                                 <BsChatSquareQuote className="mb-[2px]" />
                                 Crea richiesta
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuSeparator className="sm:hidden" />
                           <DropdownMenuItem asChild>
                              <Link
                                 href={"/lista-desideri"}
                                 className="flex gap-2"
                              >
                                 <BsBookmarks className="mb-[2px]" />
                                 Lista desideri
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                              <Link href={"/chat"} className="flex gap-2">
                                 <BsChatDots className="mb-[2px]" />
                                 Messaggi
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                              <Link href={"/profilo"} className="flex gap-2">
                                 <BsPersonCircle className="mb-[2px]" />
                                 Profilo
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onSelect={(e:any) => signOut({ callbackUrl: "/" })}
                              className="gap-2"
                           >
                              <LuLogOut className="mb-[2px]" />
                              Esci
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  ) : (
                     <Link
                        href={"/login?callbackUrl=" + pathname}
                        className="bg-primary px-3 py-[6px] font-medium rounded-[10px]"
                     >
                        Login
                     </Link>
                  )
               ) : fullSession.status == "loading" ? (
                  <Loader2 className="w-5 h-5 text-primary mr-2 animate-spin" />
               ) : (
                  <Link
                     href={"/login?callbackUrl=" + pathname}
                     className="bg-primary px-3 py-[6px] font-medium rounded-[10px]"
                  >
                     Login
                  </Link>
               )}
            </div>
         </div>
      </>
   );
}
