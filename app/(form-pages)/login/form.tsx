"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { Login as formSchema } from "@/lib/schemas";
import { memo, useState } from "react";
//import LoadingSpin from "@/components/loadingspin";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";


export default function Comp(){
   const [loading, setLoading] = useState(false)
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema)
   })
   const params = useSearchParams()

   let error = params?.get("error");
   switch (error) {
      case "CredentialsSignin":
         error = "Invalid username or password";
         break;
      case null:
         error = "";
         break;
      default:
         error = "Errore";
         break;
   }

   const redirectUrl = params?.get("callbackUrl") || "/";

   const onSubmit = async(data: z.infer<typeof formSchema>) => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1500));
      try {
         await signIn("credentials", {
            redirect: true,
            callbackUrl: redirectUrl,
            username: data.username,
            password: data.password,
         });
      } catch (error:any) {
         console.log(error);
         setLoading(false);
      }
   }
   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input placeholder="Username" className="focus-visible:ring-primary border-primary/50" {...field}/>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input placeholder="Password" className="focus-visible:ring-primary border-primary/50 text-base placeholder:text-sm" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <ButtonMemato disabled={loading} />
            </form>
         </Form>
         <p className="text-sm text-center font-light text-slate-500 pt-3">Continuando, accetti i nostri <Link href={"/termini-condizioni"} className="font-semibold max-sm:underline md:hover:underline">Termini e condizioni</Link> e la <Link href="/privacy" className="font-semibold max-sm:underline md:hover:underline">Politica sulla privacy</Link></p>
         {error!="" && <p className="mt-2 text-center px-4 py-2 font-bold text-red-500 bg-red-500 rounded-md bg-opacity-20 border border-red-500 focus:outline-none focus:shadow-outline">{error}</p>}
      </>
   )
}

const ButtonMemato = memo(function Zio({ disabled }: { disabled: boolean }) {
   return (
      <Button type="submit" disabled={disabled} className="w-full">
         Login
      </Button>
   );
});
