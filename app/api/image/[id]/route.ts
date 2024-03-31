export async function GET(req: Request, {params}:{params:{id:string}}){
   const {id} = params
   const image = await (await fetch(process.env.BACKEND_URL+"/image/"+id, {next: { revalidate: 10 }})).blob()
   if(image){
      return new Response(image, {
         status: 200,
         headers: {
            "Content-Type": "image/webp",
         },
      })
   } else {
      return new Response("Not found", {
         status: 404,
         headers: {
            "Content-Type": "text/plain",
         },
      })
   }
}
