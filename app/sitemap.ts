import { prisma } from "@/lib/database";
import { MetadataRoute } from "next";

export default async function sitemap() {
   return [
      {
         url: "https://www.bookmarketplace.it/",
         lastModified: new Date(),
      },
      {
         url: "https://www.bookmarketplace.it/termini-condizioni",
         lastModified: new Date(2023, 6, 13),
      },
      {
         url: "https://www.bookmarketplace.it/privacy",
         lastModified: new Date(2023, 6, 13),
      },
      {
         url: "https://www.bookmarketplace.it/chat",
         lastModified: new Date(2023, 7, 31),
      },
      {
         url: "https://www.bookmarketplace.it/crea-annuncio",
         lastModified: new Date(2023, 7, 14),
      },
      {
         url: "https://www.bookmarketplace.it/crea-richiesta",
         lastModified: new Date(2023, 7, 15),
      },
      {
         url: "https://www.bookmarketplace.it/impostazioni",
         lastModified: new Date(2023, 7, 15),
      },
      {
         url: "https://www.bookmarketplace.it/profilo",
         lastModified: new Date(2023, 7, 29),
      },
      ...(await prisma.user.findMany({
         select: {
            username: true,
         }
      })).map((user) => ({
         url: `https://www.bookmarketplace.it/profilo/${user.username}`,
         lastModified: new Date(2023, 7, 29),
      })),
      {
         url: "https://www.bookmarketplace.it/lista-desideri",
         lastModified: new Date(2023, 7, 29),
      },
      {
         url: "https://www.bookmarketplace.it/login",
         lastModified: new Date(2023, 7, 29),
      },
      {
         url: "https://www.bookmarketplace.it/register",
         lastModified: new Date(2023, 7, 29),
      },
      {
         url: "https://www.bookmarketplace.it/search",
         lastModified: new Date(2023, 7, 29),
      },
      ...(await prisma.book.findMany({
         select: {
            slug: true,
            update_date: true,
         }
         })).map((book) => ({
            url: `https://www.bookmarketplace.it/book/${book.slug}`,
            lastModified: new Date(book.update_date),
         })),
      ...(await prisma.request_book.findMany({
         select: {
            slug: true,
            creation_date: true,
         }
         })).map((request) => ({
            url: `https://www.bookmarketplace.it/richiesta/${request.slug}`,
            lastModified: new Date(request.creation_date),
         })),
   ];
}
