import Form from "./form";
import GoogleButton from "./googlebutton";
import Link from "next/link";

export const metadata = {
   title: "Login",
   description: "Login page",
}

export default function Page() {
   return (
      <div className="w-full">
         <h1 className="text-4xl font-bold text-center mb-8 text-colortext">Login</h1>
         <GoogleButton />
         <div className="h-[1px] w-full bg-primary my-4 rounded-full"/>
         <Form />
         <div className="h-[1px] w-full bg-primary my-4 rounded-full"/>
         <div className="text-center text-colortext">Oppure <Link className="underline" href={"/register"}>registrati</Link></div>
      </div>
   )
}