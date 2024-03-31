"use server"

import { unstable_cache as cache } from "next/cache"
import { prisma } from "./database"
import type { Prisma } from "@prisma/client"

export const getBooks = cache(async (take?: number, where?: Prisma.bookWhereInput | undefined) => {
   return await prisma.book.findMany({
      select: {
         id: true,
         price: true,
         title: true,
         img_id: true,
         creation_date: true,
         slug: true,
         publisher: true
      },
      where: {
         status: 0,
         ...where
      },
      take: take || 10,
      orderBy: {
         creation_date: "desc"
      }
   })
}, ["getBooks"], { revalidate: 300 })