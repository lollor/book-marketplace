import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   keywords: ['Book', 'Marketplace', 'BookMarketplace', "Libri usati", "Libri in vendita", "Libri di scuola"],
   robots: "index, follow",
   title: {
      template: "%s | BookMarketplace",
      default: "BookMarketplace",
   }
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="it">
         <body className={cn(inter.className, "bg-background")}>
            <div className="py-3 px-[20px]">
               {children}
            </div>       
         </body>
      </html>
   );
}
