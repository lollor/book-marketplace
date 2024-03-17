import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function randomString(length:number) {
   var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
   var result = '';
   for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
   return result;
}

export function base64loadingShimmer(w:number, h:number) {
   return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
}

const shimmer = (w: number, h: number) => `
   <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <defs>
      <linearGradient id="g">
         <stop stop-color="#000030" offset="20%" />
         <stop stop-color="#fff" offset="50%" />
         <stop stop-color="#000030" offset="70%" />
      </linearGradient>
   </defs>
   <rect width="${w}" height="${h}" fill="#000030" />
   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
   </svg>`

const toBase64 = (str: string) => typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export function getLinkUserImage(img_id:string|null|undefined){
   if (img_id == null) return '/user.jpg'
   else if (img_id.startsWith('http')) return img_id
   else return `/api/image/${img_id}`
}

export function getErrorUrl(error: ErrorType){
   return `/error?error=${error}`
}  

export const Errors : {[key: string]: string | React.ReactNode }  = {
   "AccessDenied": "Non hai i permessi per accedere.",
   "EmailExists": "L'email inserita è già registrata.",
   "IdExists": "L'account google inserito è già registrato.",
   "RegisterError": "Si è verificato un errore durante la registrazione. Contatta l'amministratore per maggiori informazioni.",
   "default": "Si è verificato un errore. Riprova più tardi."
} as const

export type ErrorType = "AccessDenied" | "EmailExists" | "IdExists" | "RegisterError" | "default"

export function GetDifferenceBetweenTimes(date: Date) {
   const diff = new Date().getTime() - date.getTime();
      const diffMin = Math.round(diff / 60000);
      if (diffMin < 60) {
         if (diffMin < 2) {
            return "ora";
         } else {
            return diffMin + " minuti fa";
         }
      } else if (diffMin < 1440) {
         const hours = Math.round(diffMin / 60);
         if (hours < 2) {
            return "un'ora fa";
         } else {
            return hours + " ore fa";
         }
      } else if (diffMin < 10080) {
         const days = Math.round(diffMin / 1440);
         if (days < 2) {
            return "un giorno fa";
         } else {
            return days + " giorni fa";
         }
      } else {
         const weeks = Math.round(diffMin / 10080);
         if (weeks < 2) {
            return "una settimana fa";
         } else {
            return weeks + " settimane fa";
         }
      }
}

export function getIpFromHeaders(headers: ReadonlyHeaders){
   const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip')
   if (!ip) return null
   else if (ip.trim() == "") return null
   else return ip
}