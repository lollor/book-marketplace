"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { AiFillGoogleCircle, AiOutlineGoogle } from "react-icons/ai";

export default function GoogleButton() {

   const params = useSearchParams()
   const redirectUrl = params?.get("callbackUrl") || "/";

   async function login() {
      try {
         await signIn("google", {
            redirect: true,
            callbackUrl: redirectUrl,
         });
      } catch (error : any){
         console.log(error);
      }
   }
   return (
      <Button className="w-full flex items-center gap-1 font-semibold" variant="outline" onClick={login}>
         <AiFillGoogleCircle className="text-xl"/>
         Continua con Google
      </Button>
   )
}